import React from "react";

interface Props {
  id: number;
  value: string;
  options: string[];
  handleChangeCB: (value: string, id: number) => void;
}

const LabelledDropdown = (props: Props) => {
  return (
    <select
      value={props.value}
      className="border-2 border-gray-200 rounded-lg p-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      onChange={(e) => props.handleChangeCB(e.target.value, props.id)}
    >
      <option value="">Select an option</option>
      {props.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default LabelledDropdown;
