import { ReactNode, useReducer, useEffect } from "react";
import { Link } from "raviger";
import { getForm, getFormFields, submitForm } from "../utils/apiUtls";
import { Form, answers, formData, formField } from "../types/formTypes";
import LabelledDropdown from "./InputComponents/LabelledDropdown";
import LabelledTextArea from "./InputComponents/LabelledTextArea";
import { Pagination } from "../types/common";
import LabelledRadio from "./InputComponents/LabelledRadio";

interface Props {
  formId: number;
}

type InitializeForm = {
  type: "INITIALIZE_FORM";
  id: number;
  title: string;
  formFields: formField[];
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

type InitializeResponse = {
  type: "INITIALIZE_RESPONSE";
  answers: answers[];
};

type UpdateResponse = {
  type: "UPDATE_RESPONSE";
  fieldId: number;
  value: string;
};

type formAction = InitializeForm;
type inputAction = Next | Previous | Submit;
type responseAction = InitializeResponse | UpdateResponse;

const formReducer = (state: formData, action: formAction) => {
  switch (action.type) {
    case "INITIALIZE_FORM":
      return {
        ...state,
        id: action.id,
        title: action.title,
        formFields: action.formFields,
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

const responseReducer = (state: answers[], action: responseAction) => {
  switch (action.type) {
    case "INITIALIZE_RESPONSE":
      return action.answers;
    case "UPDATE_RESPONSE":
      console.log(action.fieldId, action.value);
      return state.map((response) => {
        if (response.form_field === action.fieldId) {
          return { ...response, value: action.value };
        }
        return response;
      });
    default:
      return state;
  }
};

const PreviewForm = (props: Props) => {
  const [form, dispatch] = useReducer(formReducer, {
    id: props.formId,
    title: "",
    formFields: [],
  });
  const [inputIndex, inputDispatch] = useReducer(reducer, 0);
  const [response, responseDispatch] = useReducer(responseReducer, []);

  useEffect(() => {
    const fetchForm = async () => {
      const form: Form = await getForm(props.formId);
      const data: Pagination<formField> = await getFormFields(props.formId);
      if (form && data.results) {
        dispatch({
          type: "INITIALIZE_FORM",
          id: props.formId,
          title: form.title,
          formFields: data.results,
        });
        responseDispatch({
          type: "INITIALIZE_RESPONSE",
          answers: data.results.map((field) => {
            return { form_field: field.id, value: "" };
          }),
        });
      }
    };
    fetchForm();
  }, [props.formId]);

  const handleFormSubmit = async () => {
    const data = {
      answers: response,
      form: {
        title: form.title,
      },
    };
    submitForm(form.id, data).then((res) => {
      console.log(res);
      inputDispatch({ type: "SUBMIT" });
    });
  };

  const renderField: (field: formField) => ReactNode = (field) => {
    switch (field.kind) {
      case "TEXT":
        if (field.meta.description.fieldType !== "textarea") {
          return (
            <input
              className="border-2 border-gray-200 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              type={field.meta.description.fieldType}
              value={
                response.find((answer) => answer.form_field === field.id)
                  ?.value || ""
              }
              onChange={(e) =>
                responseDispatch({
                  type: "UPDATE_RESPONSE",
                  fieldId: field.id,
                  value: e.target.value,
                })
              }
            />
          );
        } else {
          return (
            <LabelledTextArea
              id={field.id}
              value={
                response.find((answer) => answer.form_field === field.id)
                  ?.value || ""
              }
              rows={4}
              columns={5}
              handleChangeCB={(value, id) =>
                responseDispatch({
                  type: "UPDATE_RESPONSE",
                  fieldId: id,
                  value,
                })
              }
            />
          );
        }
      case "DROPDOWN":
        return (
          <LabelledDropdown
            id={field.id}
            value={
              response.find((answer) => answer.form_field === field.id)
                ?.value || ""
            }
            options={field.options}
            handleChangeCB={(value, id) =>
              responseDispatch({
                type: "UPDATE_RESPONSE",
                fieldId: id,
                value,
              })
            }
            multiple={false}
          />
        );
      case "GENERIC":
        return (
          <LabelledDropdown
            id={field.id}
            value={
              response.find((answer) => answer.form_field === field.id)
                ?.value || ""
            }
            options={field.options}
            handleChangeCB={(value, id) =>
              responseDispatch({
                type: "UPDATE_RESPONSE",
                fieldId: id,
                value,
              })
            }
            multiple={true}
          />
        );
      case "RADIO":
        return (
          <LabelledRadio
            id={field.id}
            value={
              response.find((answer) => answer.form_field === field.id)
                ?.value || ""
            }
            options={field.options}
            handleChangeCB={(value, id) =>
              responseDispatch({
                type: "UPDATE_RESPONSE",
                fieldId: id,
                value,
              })
            }
          />
        );
    }
  };

  return (
    <div>
      {form.formFields.length === 0 ? (
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
                    onClick={handleFormSubmit}
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
