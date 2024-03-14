import { FieldArray } from "./fields/FieldArray";
import { CheckboxField } from "./fields/CheckboxField";
import { DatePickerInput } from "./fields/DatePickerInput";
import { HiddenField } from "./fields/HiddenField";
import { FileUploadField } from "./fields/FileUploadField";
import { InputField } from "./fields/InputField";
import { MultiSelectCheckboxes } from "./fields/MultiSelectCheckboxesField";

import { RadioGroupField } from "./fields/RadioGroupField";
import { RichTextEditorField } from "./fields/RichTextEditorField";
import { ColorPickerField } from "./fields/selects/ColorPickerField";
import { MultiSelect } from "./fields/selects/MultiSelect";
import { RadiusSelect } from "./fields/selects/RadiusSelect";
import { SearchableSelectField } from "./fields/selects/SearchableSelectField";
import { SelectField } from "./fields/selects/SelectField";
import { SwitchField } from "./fields/SwitchField";
import { TextAreaField } from "./fields/TextAreaField";
import { DelegateField } from "./fields/DelegateField";
import { QuestionsField } from "./fields/QuestionsField";
import { TextField } from "./fields/TextField";

export const fieldComponents = {
  input: InputField,
  checkbox: CheckboxField,
  radio_item: RadioGroupField,
  textarea: TextAreaField,
  date: DatePickerInput,
  datetime: DatePickerInput,
  file: FileUploadField,
  switch: SwitchField,
  select: SelectField,
  multi_select: MultiSelect,
  field_array: FieldArray,
  hidden: HiddenField,
  questions: QuestionsField,
  wysiwyg: RichTextEditorField,
  multi_select_checkbox: MultiSelectCheckboxes,
  color_picker: ColorPickerField,
  searchable_select: SearchableSelectField,
  radius_select: RadiusSelect,
  delegate: DelegateField,
  text: TextField,
} as const;

export * from "./buildForm";
