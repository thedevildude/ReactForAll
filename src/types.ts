type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type textFieldTypes = "text" | "email" | "number" | "date" | "tel" | "time";

type TextField = {
  id: number;
  kind: "text";
  label: string;
  type: textFieldTypes;
  value: string;
};

type DropdownField = {
  id: number;
  kind: "dropdown";
  label: string;
  options: string[];
  value: string;
};

type MultiSelect = {
  id: number;
  kind: "multiselect";
  label: string;
  options: string[];
  value: string[];
};

type TextArea = {
  id: number;
  kind: "textarea";
  label: string;
  rows: number;
  columns: number;
  value: string;
};

export type formField = TextField | DropdownField | MultiSelect | TextArea;
export type { formData };
