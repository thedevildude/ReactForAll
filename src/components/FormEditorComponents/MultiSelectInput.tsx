import React, { useState } from "react";
import { fieldOption } from "../../types/formTypes";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  id: number;
  index: number;
  value: string;
  options: fieldOption[];
  kind: string;
  handleChangeCB: (value: string, id: number) => void;
  handleOptionChangeCB: (value: string, id: number, optionId: number) => void;
  removeFieldCB: (id: number) => void;
  addOptionCB: (id: number) => void;
  removeOptionCB: (id: number, index: number) => void;
}

const MultiSelectInput = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided) => (
        <div
          className="relative flex flex-col text-left"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
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
            <div className="flex flex-col w-full mt-2 rounded-lg shadow-lg bg-white">
              <button
                className="p-2 text-white bg-gray-500 hover:bg-gray-700 font-semibold"
                onClick={(e) => props.addOptionCB(props.id)}
              >
                New Option
              </button>
              {props.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    value={option.option}
                    type="text"
                    className="border border-gray-200 p-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-gray-200 hover:bg-gray-200"
                    onChange={(e) =>
                      props.handleOptionChangeCB(
                        e.target.value,
                        props.id,
                        option.id
                      )
                    }
                  />
                  <button
                    className="relative w-3 h-3 mx-2 fill-gray-500 hover:fill-gray-700"
                    onClick={() => props.removeOptionCB(props.id, option.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default MultiSelectInput;
