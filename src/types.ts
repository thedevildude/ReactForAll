type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
}

export type Errors<T> = Partial<Record<keyof T, string>>

export const validateForm = (form: Form) => {
  const errors: Errors<Form>  = {};
  if(form.title.length < 1) {
    errors.title = "Title is required";
  }
  if(form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
}

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