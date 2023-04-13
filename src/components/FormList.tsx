import React, { useState } from "react";
import ReactForm from "../ReactForm";

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone number", type: "tel", value: "" },
];

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const FormList = (props: { closeFormCB: () => void }) => {
  const [state, setState] = useState("FORMLIST");
  const [formId, setFormId] = useState(Number);
  const openForm = (id: number) => {
    setFormId(id);
    setState("FORM");
  };
  const closeForm = () => {
    setForms(getLocalForms());
    setState("FORMLIST");
  };
  const [forms, setForms] = useState(getLocalForms());

  const newForm: () => void = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setForms(getLocalForms());
    openForm(newForm.id);
  };

  const deleteForm: (id: number) => void = (id) => {
    const localForms = getLocalForms();
    const newFormList = localForms.filter((form) => form.id !== id);
    saveLocalForms([...newFormList]);
    setForms(getLocalForms());
  };

  return state === "FORMLIST" ? (
    <div className="flex flex-col gap-5 p-4">
      {forms.map((form) => {
        return (
          <div
            key={form.id}
            className="flex gap-2 items-center justify-between border-2 p-2 rounded-lg"
          >
            <p>{form.title}</p>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-lg"
                onClick={() => openForm(form.id)}
              >
                Edit
              </button>
              <button
                className="hover:text-red-900 text-red-500"
                onClick={() => deleteForm(form.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <div className="flex gap-5">
        <button
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form List
        </button>
        <button
          className="py-2 px-5 mt-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded-lg"
          onClick={newForm}
        >
          New
        </button>
      </div>
    </div>
  ) : (
    <ReactForm closeFormCB={closeForm} id={formId ? formId : 0} />
  );
};
export default FormList;