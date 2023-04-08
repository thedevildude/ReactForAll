import React from "react";

interface Props {
  formFields: Field[];
  closeFormCB: () => void
}

interface Field {
  id: number;
  label: string;
  type: string;
}

const ReactForm = (props: Props) => {
  return (
    <div className="p-4">
      {props.formFields.map((field: Field) => (
        <div className="font-semibold" key={field.id}>
          <label>{field.label}</label>
          <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            type={field.type}
          />
        </div>
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
      </div>
    </div>
  );
};

export default ReactForm;
