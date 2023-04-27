import React, { useState } from "react";

interface Props {
  id: number;
  value: string | string[];
  options: string[];
  multiple: boolean;
  handleChangeCB: (value: string, id: number) => void;
}

const LabelledDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    props.handleChangeCB(selectedOptions.join(", "), props.id);
  };

  return (
    <div className="w-full">
      {!props.multiple ? (
        <select
          value={props.value}
          className="border-2 border-gray-200 w-full rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => props.handleChangeCB(e.target.value, props.id)}
        >
          <option value="">Select an option</option>
          {props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
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
                  onClick={() => {
                    handleOptionSelect(option);
                  }}
                >
                  <input
                    value={option}
                    className="h-5 w-5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-gray-200 hover:bg-gray-200"
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                  />
                  <p className="flex-1">{option}</p>
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
