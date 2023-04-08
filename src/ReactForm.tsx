import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

interface Props {
  closeFormCB: () => void;
}

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone number", type: "number" },
];

const ReactForm = (props: Props) => {
  const [state, setState] = useState(formFields);
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: "New Field",
        type: "text",
      },
    ]);
  };
  const removeField = (id:number) => {
    setState(
      state.filter(field => field.id !== id)
    )
  }

  return (
    <div className="p-4">
      {state.map((field) => (
        <LabelledInput
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          removeFieldCB={removeField}
        />
      ))}
      <div className="flex gap-2">
        <button className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg">
          Submit
        </button>
        <button
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
    </div>
  );
};

export default ReactForm;
