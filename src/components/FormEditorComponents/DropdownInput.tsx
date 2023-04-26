import React, { useState } from "react";

interface Props {
  id: number;
  value: string;
  options: string[];
  kind: string;
  handleChangeCB: (value: string, id: number) => void;
  handleOptionChangeCB: (value: string, id: number, index: number) => void;
  removeFieldCB: (id: number) => void;
}

const DropdownInput = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  /*   const handleInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.stopPropagation();
  }; */

  return (
    <div className="relative flex flex-col text-left">
      <div className="flex font-semibold items-center">
        <input
          type="text"
          className="flex w-full border-2 shadow-sm border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={props.value}
          onChange={(e) => {props.handleChangeCB(e.target.value, props.id)}}
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
        <div className="flex flex-col w-full mt-2 rounded-md shadow-lg bg-white">
          {props.options.map((option, index) => (
            <input
              key={index}
              value={option}
              type="text"
              className="border border-gray-200 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:bg-gray-200"
              onChange={(e) => props.handleOptionChangeCB(e.target.value, props.id, index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
