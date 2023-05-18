import { formData } from "../types/formTypes";

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

export { getLocalForms, saveLocalForms, getForm };
