import { formData, formField, textFieldTypes } from "../types/formTypes";

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const getForm: (id: number) => formData = (id) => {
  const localForms = getLocalForms();
  const form = localForms.filter((form) => form.id === id);
  return form[0];
};

export const getNewField: (fieldType: string, fieldLabel: string) => formField = (
  fieldType: string,
  fieldLabel: string
) => {
  if (fieldType === "dropdown") {
    return {
      id: Number(new Date()),
      kind: "DROPDOWN",
      label: fieldLabel,
      options: [{ id: 1, option: "Option 1" }, { id: 2, option: "Option 2" }],
      value: "",
    };
  } else if (fieldType === "multiselect") {
    return {
      id: Number(new Date()),
      kind: "GENERIC",
      label: fieldLabel,
      options: [{ id: 1, option: "Option 1" }, { id: 2, option: "Option 2" }],
      value: "",
    };
  } else if (fieldType === "textarea") {
    return {
      id: Number(new Date()),
      kind: "TEXT",
      label: fieldLabel,
      meta: {
        description: {
          fieldType: "textarea",
        },
      },
      value: "",
    };
  } else {
    return {
      id: Number(new Date()),
      kind: "TEXT",
      meta: {
        description: {
          fieldType: fieldType as textFieldTypes,
        },
      },
      label: fieldLabel,
      value: "",
    };
  }
};

export { getLocalForms, saveLocalForms, getForm };
