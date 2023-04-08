import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

interface Props {
  closeFormCB: () => void;
}

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "John" },
  { id: 2, label: "Last Name", type: "text", value: "Doe" },
  { id: 3, label: "Email", type: "email", value: "johndoe@email.com" },
  { id: 4, label: "Date of Birth", type: "date", value: "1999-10-12" },
  { id: 5, label: "Phone number", type: "tel", value: "3232332" },
];

const ReactForm = (props: Props) => {
  const handleChange = (value: string, id: number) => {
    const newState = state.map(field => {
      let newState = {...field}
      if (field.id === id) {
        newState.value = value
      }
      return newState
    })
    setState([...newState])
  };
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };
  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    console.log("form clearing");

    const newState = state.map((obj) => {
      return { ...obj, value: "" };
    });
    setState([...newState]);
    console.log("form cleared");
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
      <div>
        {state.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            value={field.value}
            type={field.type}
            removeFieldCB={removeField}
            handleChangeCB={handleChange}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newField}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-4">
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
          className="py-2 px-5 mt-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded-lg"
          onClick={clearForm}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ReactForm;
