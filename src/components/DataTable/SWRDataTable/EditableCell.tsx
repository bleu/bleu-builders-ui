// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useRef, useEffect } from "react";
import { CheckIcon, Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Input } from "#/components/ui/Input";
import { Button } from "#/components/ui/Button";
import { cn } from "#/lib/utils";
import { Checkbox } from "#/components/ui/Checkbox";

interface EditableCellProps {
  column: any;
  isUpdating?: boolean;
  onUpdate: (arg: { field: string; id: string; value: any }) => Promise<void>;
  row: any;
  type?: "text" | "number" | "boolean";
  value: any;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  row,
  column,
  onUpdate,
  isUpdating = false,
  type = "text",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current && type !== "boolean") {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing, type]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate({
        id: row.original.id,
        field: column.columnDef.accessorKey,
        value: editValue,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update cell:", error);
      // Reset to original value on error
      setEditValue(value);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBooleanToggle = async (checked: boolean) => {
    setIsSubmitting(true);
    try {
      await onUpdate({
        id: row.original.id,
        field: column.columnDef.accessorKey,
        value: checked,
      });
    } catch (error) {
      console.error("Failed to update cell:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // boolean type uses checkbox directly without edit mode
  if (type === "boolean") {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={!!value}
          onCheckedChange={handleBooleanToggle}
          disabled={isSubmitting || isUpdating}
        />
        {(isSubmitting || isUpdating) && (
          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div
        className={cn(
          "group flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded",
          "max-w-[400px]"
        )}
        onClick={() => setIsEditing(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsEditing(true);
          }
        }}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="button"
        tabIndex={0}
        aria-label="Click to edit cell"
      >
        <div className="truncate flex-1">
          {type === "number" ? (
            <span>{typeof value === "number" ? value : ""}</span>
          ) : (
            <span>{value || ""}</span>
          )}
        </div>
        <Pencil1Icon className="size-3 opacity-0 group-hover:opacity-50 transition-opacity" />
        {(isSubmitting || isUpdating) && (
          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 max-w-[400px]">
      <Input
        ref={inputRef}
        type={type === "number" ? "number" : "text"}
        value={editValue || ""}
        onChange={(e) => {
          const newValue =
            type === "number"
              ? e.target.value === ""
                ? ""
                : Number(e.target.value)
              : e.target.value;
          setEditValue(newValue);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        disabled={isSubmitting}
        className="h-8 text-sm"
      />
      <div className="flex space-x-1">
        <Button
          size="icon"
          variant="ghost"
          className="size-6"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          <CheckIcon className="size-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="size-6"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <Cross2Icon className="size-3" />
        </Button>
      </div>
    </div>
  );
};
