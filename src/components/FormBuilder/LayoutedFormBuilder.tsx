import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { evaluateConditions } from "./evaluateConditions";
import { fieldComponents } from "./builder";
import { FieldComponentType } from "./types";
import {
  LayoutedFormBuilderProps,
  FormGroup,
  LayoutedField,
} from "./layoutedTypes";

const gapClasses = {
  none: "gap-0",
  small: "gap-2",
  medium: "gap-4",
  large: "gap-6",
};

const borderClasses = {
  none: "",
  light: "border border-gray-200",
  medium: "border-2 border-gray-300",
  strong: "border-2 border-gray-500",
};

function FormGroupComponent({
  group,
  form,
  customComponents = {},
  icons,
  headerComponent = <div />,
}: {
  customComponents?: { [key: string]: FieldComponentType };
  form: LayoutedFormBuilderProps["form"];
  group: FormGroup;
  headerComponent: React.ReactNode;
  icons: { [key: string]: React.ReactNode };
}) {
  const [isFolded, setIsFolded] = useState(false);
  const { layout, fields, title, description } = group;

  // Create a grid with the specified number of columns
  const getGridCols = (cols: number) => {
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };
    return gridClasses[cols] || `grid-cols-${cols}`;
  };
  const gridCols = getGridCols(layout.columns);

  const ContainerIcon = icons[group.icon || ""] as React.ReactNode;

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  // Filter fields that should render based on conditions
  const visibleFields = fields.filter((field) =>
    evaluateConditions(form, field.conditions)
  );

  // Separate hidden fields from positioned fields
  const hiddenFields = visibleFields.filter(
    (field) => field.type === "hidden" || !field.position
  );
  const positionedFields = visibleFields.filter(
    (field) => field.type !== "hidden" && field.position
  );

  // Create a grid map to place non-hidden fields
  const gridMap: (LayoutedField | null)[][] = [];
  const maxRow =
    positionedFields.length > 0
      ? Math.max(...positionedFields.map((f) => f.position!.row))
      : 1;

  // Initialize grid
  for (let row = 1; row <= maxRow; row++) {
    gridMap[row] = new Array(layout.columns).fill(null);
  }

  // Place only positioned fields in grid
  positionedFields.forEach((field) => {
    const { row, col, span } = field.position!; // Safe to use ! here since we filtered
    if (gridMap[row]) {
      // Place field and mark spanned cells
      for (let i = 0; i < span && col - 1 + i < layout.columns; i++) {
        // @ts-ignore-next-line
        gridMap[row][col - 1 + i] = i === 0 ? field : "spanned";
      }
    }
  });

  const renderField = (field: LayoutedField, span: number) => {
    // @ts-ignore-next-line
    const FieldComponent: FieldComponentType | undefined =
      field?.component ||
      { ...fieldComponents, ...customComponents }[field.type];

    if (!FieldComponent) {
      throw new Error(`Invalid field type: ${field.type}`);
    }

    const getSpanClass = (spanValue: number) => {
      const spanClasses = {
        1: "",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
      };
      return spanClasses[spanValue] || `col-span-${spanValue}`;
    };
    const spanClass = getSpanClass(span);

    return (
      <div key={field.name} className={cn(spanClass)}>
        <FieldComponent
          field={field}
          form={form}
          customComponents={customComponents}
        />
      </div>
    );
  };
  const renderHiddenField = (field: LayoutedField) => {
    const FieldComponent =
      field?.component ||
      { ...fieldComponents, ...customComponents }[field.type];

    if (!FieldComponent) {
      throw new Error(`Invalid field type: ${field.type}`);
    }

    return (
      <FieldComponent
        key={field.name}
        // @ts-ignore-next-line
        field={field}
        form={form}
        customComponents={customComponents}
      />
    );
  };

  return (
    <div
      className={cn("rounded-lg", borderClasses[layout.border], {
        "p-4": layout.border !== "none",
      })}
    >
      {(title || description) && (
        <div
          className={cn(
            "flex items-center justify-start gap-2 rounded-t-md bg-muted px-4 py-2 pb-2",
            {
              "bg-muted": layout.headerBackground === "muted",
              "rounded-b-md": layout.collapsible && isFolded,
            }
          )}
          onClick={toggleFold}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleFold();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {ContainerIcon && (
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              {/* @ts-ignore-next-line */}
              <ContainerIcon className="h-5 w-5 text-primary" />
            </div>
          )}
          <div className="">
            {title && (
              <div className="flex items-center gap-2">
                <h3 className="text-md font-semibold">{title}</h3>
                <div id="title-sidediv">{headerComponent}</div>
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      )}

      {/* Render hidden fields (they don't appear visually but are part of the form) */}
      {hiddenFields.map(renderHiddenField)}

      {/* Render positioned fields in grid */}
      <div
        className={cn("grid my-4 px-4", gridCols, gapClasses[layout.gap], {
          hidden: layout.collapsible && isFolded,
        })}
      >
        {gridMap.map((row, rowIndex) => {
          if (!row) return null;

          return row.map((cell, colIndex) => {
            if (cell === null) {
              // eslint-disable-next-line react/no-array-index-key
              return <div key={`empty-${rowIndex}-${colIndex}`} />;
            }

            if (typeof cell === "string" && cell === "spanned") {
              return null;
            }

            const field = cell as LayoutedField;
            return renderField(field, field.position!.span);
          });
        })}
      </div>
    </div>
  );
}

export function LayoutedFormBuilder({
  groups,
  form,
  customComponents = {},
  index = 0,
  headerComponent = <div />,
  icons = {},
}: LayoutedFormBuilderProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const shouldRenderGroup = evaluateConditions(
          form,
          group.conditions,
          index
        );

        if (!shouldRenderGroup) return null;

        return (
          <FormGroupComponent
            key={group.group}
            headerComponent={headerComponent}
            group={group}
            form={form}
            customComponents={customComponents}
            icons={icons}
          />
        );
      })}
    </div>
  );
}
