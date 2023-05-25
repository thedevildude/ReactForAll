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

export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type textFieldTypes = "text" | "email" | "number" | "date" | "tel" | "time" | "textarea";

type TextField = {
  id: number;
  kind: "TEXT";
  label: string;
  meta: {
    description: {
      fieldType: textFieldTypes;
    }
  };
  value: string;
};

type DropdownField = {
  id: number;
  kind: "DROPDOWN";
  label: string;
  options: fieldOption[];
  value: string;
};

type MultiSelect = {
  id: number;
  kind: "GENERIC";
  label: string;
  options: fieldOption[];
  value: string;
};

type TextArea = {
  id: number;
  kind: "TEXT";
  label: string;
  meta: {
    description: {
      fieldType: "textarea";
    }
  };
  value: string;
};

export type fieldOption = {
  id: number;
  option: string;
}

export type formField = TextField | DropdownField | MultiSelect | TextArea;