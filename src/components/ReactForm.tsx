import React, { useEffect, useState, useRef } from "react";
import LabelledInput from "./LabelledInput";
import { Link, navigate } from "raviger";
import { getForm, getLocalForms, saveLocalForms } from "../utils/helpers";

interface Props {
  id: number;
}

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const saveformData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

const ReactForm = (props: Props) => {
  const initialState: () => formData = () => {
    const form = getForm(props.id);
    return form;
  };
  const titleRef = useRef<HTMLInputElement>(null);
  const handleChange = (value: string, id: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, label: value };
        }
        return field;
      }),
    });
  };
  const [state, setState] = useState(() => initialState());
  const [newField, setNewField] = useState({ label: "", type: "" });

  useEffect(() => {
    state.id !== props.id && navigate(`/form/${state.id}`);
  }, [state.id, props.id]);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveformData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField.label,
          type: newField.type,
          value: "",
        },
      ],
    });
    setNewField({ label: "", type: "" });
  };
  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

/*   const clearForm = () => {
    const newState = state.formFields.map((obj) => {
      return { ...obj, value: "" };
    });
    setState({
      ...state,
      formFields: [...newState],
    });
  }; */

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted max-h-96 overflow-y-auto">
      <input
        type="text"
        value={state.title}
        className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
        }}
        ref={titleRef}
      />
      <div className="flex flex-col gap-4 pt-4">
        {state.formFields.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            value={field.label}
            removeFieldCB={removeField}
            handleChangeCB={handleChange}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <input
          type="text"
          value={newField.label}
          placeholder="New Field Label"
          className="border-2 border-gray-200 rounded-lg p-2 mt-4 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => {
            setNewField({ ...newField, label: e.target.value });
          }}
        />
        <select
          className="w-full border-2 border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
        <button
          className="p-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          onClick={addField}
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
        {/* <button
          className="py-2 px-5 mt-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded-lg"
          onClick={clearForm}
        >
          Clear
        </button> */}
      </div>
    </div>
  );
};

export default ReactForm;
