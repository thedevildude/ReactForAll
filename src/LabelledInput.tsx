import React from "react";

const LabelledInput = (props: {
  id: number;
  label: string;
  type: string;
  removeFieldCB: (id: number) => void;
}) => {
  return (
    <div className="font-semibold">
      <label>{props.label}</label>
      <div className="flex gap-2">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          type={props.type}
        />
        <button
          className="py-2 px-5 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default LabelledInput;
