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
      <div className="flex font-semibold items-center">
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
        <button
          className="p-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
      {isOpen && (
        <div className="flex w-full mt-2 rounded-lg shadow-lg bg-white">
          <div className="flex flex-col items-center border border-gray-200">
            <p className="p-2 bg-gray-200">Rows</p>
            <input className="p-2" type="number" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
