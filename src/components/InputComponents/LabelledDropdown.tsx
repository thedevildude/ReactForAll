import React, { useState } from "react";
import { fieldOption } from "../../types/formTypes";

interface Props {
  id: number;
  value: string;
  options: fieldOption[];
  multiple: boolean;
  handleChangeCB: (value: string, id: number) => void;
}

const LabelledDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionSelect = (option: string) => {
    if (option.length === 0) return;
    let selectedOptions = props.value.length === 0 ? [] : props.value.split(",");
    if (selectedOptions.includes(option)) {
      selectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      selectedOptions.push(option);
    }
    props.handleChangeCB(selectedOptions.toString(), props.id);
  };

  const handleSingleSelect = (value: string) => {
    if (value === "") return;
    props.handleChangeCB(value, props.id);
  };

  return (
    <div className="w-full">
      {!props.multiple ? (
        <select
          value={props.value}
          className="border-2 border-gray-200 w-full rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => handleSingleSelect(e.target.value)}
        >
          <option value="">Select an option</option>
          {props.options.map((option) => (
            <option key={option.id} value={option.option}>
              {option.option}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <button
            className="border-2 border-gray-200 w-full rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onClick={toggleDropdown}
          >
            Select Options
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
                    type="checkbox"
                    checked={props.value.includes(option.option)}
                    onChange={(e) => handleOptionSelect(e.target.value)}
                  />
                  <p className="flex-1">{option.option}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LabelledDropdown;
