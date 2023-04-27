import React, { useState } from "react";

interface Props {
  id: number;
  value: string;
  rows: number;
  columns: number;
  kind: string;
  handleChangeCB: (value: string, id: number) => void;
  handleOptionChangeCB: (value: string, id: number, index: number) => void;
  removeFieldCB: (id: number) => void;
}

const TextAreaInput = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative flex flex-col text-left">
      <div className="flex font-semibold items-center justify-between">
        <div className="flex items-center">
          <input
            type="text"
            className="flex w-full border-2 shadow-sm border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={props.value}
            onChange={(e) => {
              props.handleChangeCB(e.target.value, props.id);
            }}
            onClick={toggleDropdown}
          />
          <p className="mx-2 text-gray-500 text-sm">{props.kind}</p>
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
      {isOpen && (
        <div className="flex w-full mt-2 rounded-lg shadow-lg bg-white">
          <div className="flex flex-col items-center border border-gray-200">
            <p className="p-2 w-full bg-gray-200">Rows</p>
            <input
              className="p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              value={props.rows}
              type="number"
              onChange={(e) => {
                props.handleOptionChangeCB(e.target.value, props.id, 0);
              }}
            />
          </div>
          <div className="flex flex-col items-center border border-gray-200">
            <p className="p-2 w-full bg-gray-200">Columns</p>
            <input
              className="p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              value={props.columns}
              type="number"
              onChange={(e) => {
                props.handleOptionChangeCB(e.target.value, props.id, 1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
