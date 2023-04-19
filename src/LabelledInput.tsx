import React from "react";

const LabelledInput = (props: {
  id: number;
  value: string;
  removeFieldCB: (id: number) => void;
  handleChangeCB: (value: string, id: number) => void;
}) => {
  return (
    <div className="font-semibold">
      <div className="flex gap-5 items-center justify-between">
        <input
          value={props.value}
          type="text"
          className="border-2 border-gray-200 rounded-lg p-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => {
            props.handleChangeCB(e.target.value, props.id);
          }}
        />
        <button
          className="p-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default LabelledInput;
