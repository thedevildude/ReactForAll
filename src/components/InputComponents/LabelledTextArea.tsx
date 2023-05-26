import React from "react";

interface Props {
  id: number;
  value: string;
  rows: number;
  columns: number;
  handleChangeCB: (value: string, id: number) => void;
}
const LabelledTextArea = (props: Props) => {
  return (
    <div className="flex gap-5 items-center justify-between">
      <textarea
        value={props.value}
        rows={props.rows}
        cols={props.columns}
        className="border-2 border-gray-200 rounded-lg p-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => {
          props.handleChangeCB(e.target.value, props.id);
        }}
      />
    </div>
  );
};

export default LabelledTextArea;
