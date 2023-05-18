import React, { useEffect, useState, useRef, useReducer } from "react";
import LabelledInput from "./InputComponents/LabelledInput";
import { Link } from "raviger";
import { getForm, getLocalForms, saveLocalForms } from "../utils/helpers";
import { formData, formField, textFieldTypes } from "../types";
import DropdownInput from "./FormEditorComponents/DropdownInput";
import MultiSelectInput from "./FormEditorComponents/MultiSelectInput";
import TextAreaInput from "./FormEditorComponents/TextAreaInput";

interface Props {
  id: number;
}

const saveformData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

const getNewField: (fieldType: string, fieldLabel: string) => formField = (
  fieldType: string,
  fieldLabel: string
) => {
  if (fieldType === "dropdown") {
    return {
      id: Number(new Date()),
      kind: "dropdown",
      label: fieldLabel,
      options: ["Option 1", "Option 2"],
      value: "",
    };
  } else if (fieldType === "multiselect") {
    return {
      id: Number(new Date()),
      kind: "multiselect",
      label: fieldLabel,
      options: ["Option 1", "Option 2"],
      value: [],
    };
  } else if (fieldType === "textarea") {
    return {
      id: Number(new Date()),
      kind: "textarea",
      label: fieldLabel,
      rows: 4,
      columns: 20,
      value: "",
    };
  } else {
    return {
      id: Number(new Date()),
      kind: "text",
      type: fieldType as textFieldTypes,
      label: fieldLabel,
      value: "",
    };
  }
};

type RemoveAction = {
  type: "REMOVE_FIELD";
  id: number;
};

type AddAction = {
  type: "ADD_FIELD";
  kind: string;
  label: string;
  callback: () => void;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  title: string;
};

type AddOption = {
  type: "ADD_OPTION";
  id: number;
};

type RemoveOption = {
  type: "REMOVE_OPTION";
  id: number;
  index: number;
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
    case "ADD_FIELD":
      const newField = getNewField(action.kind, action.label);
      action.callback();
      if (newField.label.length > 0) {
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      }
      return state;
    case "REMOVE_FIELD":
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.title,
      };
    case "ADD_OPTION":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            (field.kind === "dropdown" || field.kind === "multiselect") &&
            field.id === action.id
          ) {
            return {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`],
            };
          }
          return field;
        }),
      };
    case "REMOVE_OPTION":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            (field.kind === "dropdown" || field.kind === "multiselect") &&
            field.id === action.id
          ) {
            const newOptions = field.options.filter(
              (_, index) => index !== action.index
            );
            return { ...field, options: newOptions };
          }
          return field;
        }),
      };
    case "UPDATE_LABEL":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === action.id) {
            return { ...field, label: action.value };
          }
          return field;
        }),
      };
    case "UPDATE_OPTION":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            (field.kind === "dropdown" || field.kind === "multiselect") &&
            field.id === action.id
          ) {
            field.options[action.index] = action.value;
            return { ...field, options: field.options };
          } else if (field.kind === "textarea" && field.id === action.id) {
            if (action.index === 0) {
              return { ...field, rows: Number(action.value) };
            } else {
              return { ...field, columns: Number(action.value) };
            }
          }
          return field;
        }),
      };
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

const fieldReducer = (state: { kind: string; label: string }, action: FieldAction) => {
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
  const initialState: () => formData = () => {
    const form = getForm(props.id);
    return form;
  };
  const [state, dispatch] = useReducer(reducer, null, () => initialState());
  const [newField, fieldDispatch] = useReducer(fieldReducer, { kind: "", label: ""});

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    if (state === null || state === undefined) {
      return;
    }
    setLoading(false);
    let timeout = setTimeout(() => {
      saveformData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

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
              if (field.kind === "text") {
                return (
                  <LabelledInput
                    key={field.id}
                    id={field.id}
                    value={field.label}
                    type={field.type}
                    handleChangeCB={(value, id) =>
                      dispatch({ type: "UPDATE_LABEL", id, value })
                    }
                    removeFieldCB={(id) =>
                      dispatch({ type: "REMOVE_FIELD", id: id })
                    }
                  />
                );
              } else if (field.kind === "dropdown") {
                return (
                  <DropdownInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    options={field.options}
                    handleChangeCB={(value, id) =>
                      dispatch({ type: "UPDATE_LABEL", id, value })
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={(id) =>
                      dispatch({ type: "REMOVE_FIELD", id: id })
                    }
                    addOptionCB={() =>
                      dispatch({ type: "ADD_OPTION", id: field.id })
                    }
                    removeOptionCB={(id, index) =>
                      dispatch({
                        type: "REMOVE_OPTION",
                        id: id,
                        index: index,
                      })
                    }
                  />
                );
              } else if (field.kind === "multiselect") {
                return (
                  <MultiSelectInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    options={field.options}
                    handleChangeCB={(value, id) =>
                      dispatch({ type: "UPDATE_LABEL", id, value })
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={() =>
                      dispatch({ type: "REMOVE_FIELD", id: field.id })
                    }
                    addOptionCB={() =>
                      dispatch({ type: "ADD_OPTION", id: field.id })
                    }
                    removeOptionCB={(id, index) =>
                      dispatch({
                        type: "REMOVE_OPTION",
                        id: id,
                        index: index,
                      })
                    }
                  />
                );
              } else if (field.kind === "textarea") {
                return (
                  <TextAreaInput
                    id={field.id}
                    key={field.id}
                    kind={field.kind}
                    value={field.label}
                    rows={field.rows}
                    columns={field.columns}
                    handleChangeCB={(value, id) =>
                      dispatch({ type: "UPDATE_LABEL", id, value })
                    }
                    handleOptionChangeCB={(value, id, index) =>
                      dispatch({ type: "UPDATE_OPTION", id, index, value })
                    }
                    removeFieldCB={(id) =>
                      dispatch({ type: "REMOVE_FIELD", id: id })
                    }
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
              onClick={(_) =>
                dispatch({
                  type: "ADD_FIELD",
                  kind: newField.kind,
                  label: newField.label,
                  callback: () => fieldDispatch({ type: "UPDATE_FIELD", label: "" }),
                })
              }
            >
              Add Field
            </button>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
              onClick={(_) => saveformData(state)}
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
