import React, { useState } from "react";
import { fieldOption } from "../../types/formTypes";

interface Props {
  id: number;
  value: string;
  options: fieldOption[];
  handleChangeCB: (value: string, id: number) => void;
}

const LabelledRadio = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSingleSelect = (value: string) => {
    if (value === "") return;
    props.handleChangeCB(value, props.id);
  };

  return (
    <div className="w-full">
      <div>
        <button
          className="border-2 border-gray-200 w-full rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onClick={toggleDropdown}
        >
          Select Option
        </button>
        {isOpen && (
          <div className="w-full mt-2 rounded-lg shadow-lg bg-white">
            {props.options.map((option, index) => (
              <div
                key={index}
                className="flex gap-5 items-center p-2 border border-gray-200 hover:bg-gray-200"
              >
                <input
                  value={option.option}
                  className="h-5 w-5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-gray-200 hover:bg-gray-200"
                  type="radio"
                  checked={props.value.includes(option.option)}
                  onChange={(e) => handleSingleSelect(e.target.value)}
                />
                <p className="flex-1">{option.option}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelledRadio;
