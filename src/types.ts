type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

type textFieldTypes = "text" | "email" | "number" | "date" | "tel";

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

export type formField = TextField | DropdownField;
export type {formData};