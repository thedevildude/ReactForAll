import { formField, textFieldTypes, formData } from "../types/formTypes";

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
  | InitializeForm
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | AddOption
  | RemoveOption
  | UpdateLabel
  | UpdateOption;

// Action Reducer
export const reducer = (state: formData, action: FormAction) => {
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