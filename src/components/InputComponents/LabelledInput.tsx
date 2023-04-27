import React from "react";

const LabelledInput = (props: {
  id: number;
  value: string;
  type: string;
  handleChangeCB: (value: string, id: number) => void;
  removeFieldCB: (id: number) => void;
}) => {
  return (
    <div className="font-semibold">
      <div className="flex gap-5 items-center justify-between">
        <div className="flex items-center">
          <input
            value={props.value}
            type="text"
            className="border-2 border-gray-200 rounded-lg p-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => {
              props.handleChangeCB(e.target.value, props.id);
            }}
          />
          <p className="ml-2 text-gray-500 text-sm">{props.type}</p>
        </div>
        <button
          className="relative w-3 h-3 mx-2 fill-gray-500 hover:fill-gray-700"
          onClick={() => props.removeFieldCB(props.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LabelledInput;
