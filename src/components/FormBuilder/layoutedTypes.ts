import { UseFormReturn, FieldValues } from "react-hook-form";
import { ReactNode } from "react";
import { BaseField, FieldComponentType } from "./types";
import { Conditions } from "./evaluateConditions";

export interface FieldPosition {
  col: number;
  row: number;
  span: number;
}

export interface LayoutedField extends BaseField {
  position?: FieldPosition; // Optional for hidden fields
}

export interface GroupLayout {
  border: "none" | "light" | "medium" | "strong";
  collapsible?: boolean;
  columns: number;
  gap: "small" | "medium" | "large" | "none";
  headerBackground?: "none" | "muted";
}

export interface FormGroup {
  category?: string;
  conditions?: Conditions;
  description?: string;
  fields: LayoutedField[];
  fieldsToAdd?: Record<string, any>;
  group: string;
  icon?: string;
  layout: GroupLayout;
  title?: string;
}

export interface LayoutedFormBuilderProps {
  customComponents?: { [key: string]: FieldComponentType };
  form: UseFormReturn<FieldValues>;
  groups: FormGroup[];
  headerComponent?: ReactNode;
  icons?: { [key: string]: ReactNode };
  index?: number;
  innerLayoutClassName?: string;
}
