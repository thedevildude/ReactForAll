import React, { useEffect, useState, useRef, useReducer } from "react";
import LabelledInput from "./InputComponents/LabelledInput";
import { Link } from "raviger";
import { fieldOption, formData, formField } from "../types/formTypes";
import DropdownInput from "./FormEditorComponents/DropdownInput";
import MultiSelectInput from "./FormEditorComponents/MultiSelectInput";
import TextAreaInput from "./FormEditorComponents/TextAreaInput";
import {
  addFormField,
  deleteFormField,
  getForm,
  getFormFields,
  updateFormField,
} from "../utils/apiUtls";
import { Pagination } from "../types/common";
import { getNewField } from "../utils/helpers";

interface Props {
  id: number;
}

// Action Types

type InitializeForm = {
  type: "INITIALIZE_FORM";
  id: number;
  title: string;
  formFields: formField[];
};

type RemoveAction = {
  type: "REMOVE_FIELD";
  id: number;
};

type AddAction = {
  type: "ADD_FIELD";
  newField: formField;
  callback: () => void;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  title: string;
};

type AddOption = {
  type: "ADD_OPTION";
  id: number;
  options: fieldOption[];
};

type RemoveOption = {
  type: "REMOVE_OPTION";
  id: number;
  options: fieldOption[];
};

type UpdateLabel = {
  type: "UPDATE_LABEL";
  id: number;
  value: string;
};

type UpdateOption = {
  type: "UPDATE_OPTION";
  id: number;
  index: number;
  value: string;
};

type FormAction =
  | InitializeForm
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | AddOption
  | RemoveOption
  | UpdateLabel
  | UpdateOption;

// Action Reducer
const reducer = (state: formData, action: FormAction) => {
  switch (action.type) {
    case "INITIALIZE_FORM":
      return {
        ...state,
        id: action.id,
        title: action.title,
        formFields: action.formFields,
      };
    case "ADD_FIELD":
      action.callback();
      return {
        ...state,
        formFields: [...state.formFields, action.newField],
      };
    case "REMOVE_FIELD":
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    case "ADD_OPTION":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === action.id && field.kind !== "TEXT") {
            return {
              ...field,
              options: [...action.options],
            };
          }
          return field;
        }),
      };
    case "REMOVE_OPTION":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === action.id && field.kind !== "TEXT") {
            return {
              ...field,
              options: [...action.options],
            };
          }
          return field;
        }),
      };
    case "UPDATE_LABEL":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              label: action.value,
            };
          }
          return field;
        }),
      };
    default:
      return state;
  }
};

type UpdateField = {
  type: "UPDATE_FIELD";
  label: string;
};

type UpdateKind = {
  type: "UPDATE_KIND";
  kind: string;
};

type FieldAction = UpdateField | UpdateKind;

const fieldReducer = (
  state: { kind: string; label: string },
  action: FieldAction
) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        label: action.label,
      };
    case "UPDATE_KIND":
      return {
        ...state,
        kind: action.kind,
      };
  }
};

const ReactForm = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    id: props.id,
    title: "",
    formFields: [],
  });
  const [newField, fieldDispatch] = useReducer(fieldReducer, {
    kind: "",
    label: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchForm = async () => {
      const form = await getForm(props.id);
      const data: Pagination<formField> = await getFormFields(props.id);
      if (form && data.results) {
        dispatch({
          type: "INITIALIZE_FORM",
          id: form.id,
          title: form.title,
          formFields: data.results,
        });
        setLoading(false);
      }
    };
    fetchForm();
    titleRef.current?.focus();
  }, [props.id]);

  const handleAddField = () => {
    if (newField.label === "" || newField.kind === "") {
      return;
    }
    const field = getNewField(newField.kind, newField.label);
    addFormField(props.id, field).then((data) => {
      if (data) {
        dispatch({
          type: "ADD_FIELD",
          newField: data,
          callback: () => fieldDispatch({ type: "UPDATE_FIELD", label: "" }),
        });
      }
    });
  };

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLabelChange = (value: string, id: number) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    dispatch({ type: "UPDATE_LABEL", id, value });
    updateTimeoutRef.current = setTimeout(() => {
      updateFormField(props.id, id, { label: value });
    }, 5000);
  };

  return (
    <div>
      {loading === true ? (
        <div>Form Not Found</div>
      ) : (
        <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted max-h-96 overflow-y-auto">
          <input
            type="text"
            value={state.title}
            className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            onChange={(e) => {
              dispatch({ type: "UPDATE_TITLE", title: e.target.value });
            }}
            ref={titleRef}
          />
          <div className="flex flex-col gap-4 pt-4">
            {state.formFields.map((field) => {
              if (
                field.kind === "TEXT" &&
                field.meta.description.fieldType !== "textarea"
              ) {
                return (
                  <LabelledInput
                    key={field.id}
                    id={field.id}
                    value={field.label}
                    type={field.meta.description.fieldType}
                    handleChangeCB={(value, id) =>
                      handleLabelChange(value, id)
                    }
                    removeFieldCB={(id) => {
                      deleteFormField(state.id, field.id);
                      dispatch({ type: "REMOVE_FIELD", id: id });
                    }}
                  />
                );
              } else if (field.kind === "DROPDOWN") {
                return (
                  <DropdownInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    options={field.options}
                    handleChangeCB={(value, id) =>
                      handleLabelChange(value, id)
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={(id) => {
                      deleteFormField(state.id, field.id);
                      dispatch({ type: "REMOVE_FIELD", id: id });
                    }}
                    addOptionCB={() => {
                      const data = {
                        options: [
                          ...field.options,
                          {
                            id: Number(new Date()),
                            option: `Option ${field.options.length + 1}`,
                          },
                        ],
                      };
                      updateFormField(state.id, field.id, data).then(
                        (field) => {
                          dispatch({
                            type: "ADD_OPTION",
                            id: field.id,
                            options: field.options,
                          });
                        }
                      );
                    }}
                    removeOptionCB={(id, optionId) => {
                      const data = {
                        options: field.options.filter(
                          (option) => option.id !== optionId
                        ),
                      };
                      updateFormField(state.id, field.id, data).then(
                        (field) => {
                          dispatch({
                            type: "REMOVE_OPTION",
                            id,
                            options: field.options,
                          });
                        }
                      );
                    }}
                  />
                );
              } else if (field.kind === "GENERIC") {
                return (
                  <MultiSelectInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    options={field.options}
                    handleChangeCB={(value, id) =>
                      handleLabelChange(value, id)
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={(id) => {
                      deleteFormField(state.id, field.id);
                      dispatch({ type: "REMOVE_FIELD", id: id });
                    }}
                    addOptionCB={() => {
                      const data = {
                        options: [
                          ...field.options,
                          {
                            id: Number(new Date()),
                            option: `Option ${field.options.length + 1}`,
                          },
                        ],
                      };
                      updateFormField(state.id, field.id, data).then(
                        (field) => {
                          dispatch({
                            type: "ADD_OPTION",
                            id: field.id,
                            options: JSON.parse(field.options),
                          });
                        }
                      );
                    }}
                    removeOptionCB={(id, optionId) => {
                      const data = {
                        options: field.options.filter(
                          (option) => option.id !== optionId
                        ),
                      };
                      updateFormField(state.id, field.id, data).then(
                        (field) => {
                          dispatch({
                            type: "REMOVE_OPTION",
                            id,
                            options: field.options,
                          });
                        }
                      );
                    }}
                  />
                );
              } else if (
                field.kind === "TEXT" &&
                field.meta.description.fieldType === "textarea"
              ) {
                return (
                  <TextAreaInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    rows={4}
                    columns={5}
                    handleChangeCB={(value, id) =>
                      handleLabelChange(value, id)
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={(id) => {
                      deleteFormField(state.id, field.id);
                      dispatch({ type: "REMOVE_FIELD", id: id });
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              value={newField.label}
              placeholder="New Field Label"
              className="border-2 border-gray-200 rounded-lg p-2 mt-4 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              onChange={(e) => {
                fieldDispatch({ type: "UPDATE_FIELD", label: e.target.value });
              }}
            />
            <select
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              onChange={(e) =>
                fieldDispatch({ type: "UPDATE_KIND", kind: e.target.value })
              }
            >
              <option value="">Select Field Type</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="dropdown">Dropdown</option>
              <option value="multiselect">Multi Select</option>
              <option value="textarea">Text Area</option>
            </select>
            <button
              className="p-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
              onClick={handleAddField}
            >
              Add Field
            </button>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
              onClick={(_) => console.log("Save")}
            >
              Save
            </button>
            <Link
              className="py-2 px-5 mt-2 text-white bg-amber-500 hover:bg-amber-700 font-semibold rounded-lg"
              href="/"
            >
              Close Form
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactForm;
