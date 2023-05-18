import { ReactNode, useReducer } from "react";
import { Link } from "raviger";
import { getForm } from "../utils/helpers";
import { formData, formField } from "../types/formTypes";
import LabelledDropdown from "./InputComponents/LabelledDropdown";
import LabelledTextArea from "./InputComponents/LabelledTextArea";

interface Props {
  formId: number;
}

type UpdateFormField = {
  type: "UPDATE_FORM_FIELD";
  id: number;
  value: string;
};

type Next = {
  type: "NEXT";
};

type Previous = {
  type: "PREVIOUS";
};

type Submit = {
  type: "SUBMIT";
};

type formAction = UpdateFormField;
type inputAction = Next | Previous | Submit;

const formReducer = (state: formData, action: formAction) => {
  switch (action.type) {
    case "UPDATE_FORM_FIELD":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === action.id) {
            if (field.kind === "multiselect") {
              return { ...field, value: action.value.split(",") };
            }
            return { ...field, value: action.value };
          } else {
            return field;
          }
        }),
      };
    default:
      return state;
  }
};

const reducer = (state: number, action: inputAction) => {
  switch (action.type) {
    case "NEXT":
      return state + 1;
    case "PREVIOUS":
      return state - 1;
    case "SUBMIT":
      return -1;
    default:
      return state;
  }
};

const PreviewForm = (props: Props) => {
  const [form, dispatch] = useReducer(formReducer, props.formId, getForm);
  const [inputIndex, inputDispatch] = useReducer(reducer, 0);

  const renderField: (field: formField) => ReactNode = (field) => {
    switch (field.kind) {
      case "text":
        return (
          <input
            className="border-2 border-gray-200 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            type={field.type}
            value={field.value}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FORM_FIELD",
                id: field.id,
                value: e.target.value,
              })
            }
          />
        );
      case "dropdown":
        return (
          <LabelledDropdown
            id={field.id}
            value={field.value}
            options={field.options}
            handleChangeCB={(value, id) =>
              dispatch({ type: "UPDATE_FORM_FIELD", id, value })
            }
            multiple={false}
          />
        );
      case "multiselect":
        return (
          <LabelledDropdown
            id={field.id}
            value={field.value}
            options={field.options}
            handleChangeCB={(value, id) =>
              dispatch({ type: "UPDATE_FORM_FIELD", id, value })
            }
            multiple={true}
          />
        );
      case "textarea":
        return (
          <LabelledTextArea
            id={field.id}
            value={field.value}
            rows={field.rows}
            columns={field.columns}
            handleChangeCB={(value, id) =>
              dispatch({ type: "UPDATE_FORM_FIELD", id, value })
            }
          />
        );
    }
  };

  return (
    <div>
      {form === undefined ? (
        <div className="flex flex-col items-center gap-5">
          <p className="text-xl font-semibold">Form Not Found</p>
          <Link
            className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
            href="/"
          >
            Close Form
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="text-xl font-semibold">{form.title}</h1>
          {inputIndex !== -1 ? (
            <div className="flex flex-col items-center w-full gap-5">
              <div className="flex flex-col w-full gap-2">
                {form.formFields[inputIndex].label}
                {renderField(form.formFields[inputIndex])}
              </div>
              <div className="flex flex-col gap-2 w-full">
                {inputIndex === 0 ? (
                  ""
                ) : (
                  <button
                    className="w-full p-2 bg-gray-200 hover:scale-110 hover:bg-gray-300 transition-all duration-100"
                    onClick={() => inputDispatch({ type: "PREVIOUS" })}
                  >
                    Previous Question
                  </button>
                )}
                {inputIndex === form.formFields.length - 1 ? (
                  <button
                    className="w-full p-2 bg-gray-200 hover:scale-110 hover:bg-gray-300 transition-all duration-100"
                    onClick={() => inputDispatch({ type: "SUBMIT" })}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="w-full p-2 bg-gray-200 hover:scale-110 hover:bg-gray-300 transition-all duration-100"
                    onClick={() => inputDispatch({ type: "NEXT" })}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p>Form Submitted</p>
              <Link
                className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
                href="/"
              >
                Close Form
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewForm;
