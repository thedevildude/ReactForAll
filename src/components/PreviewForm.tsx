import { useState, useEffect, ReactNode } from "react";
import { Link, navigate } from "raviger";
import { getForm } from "../utils/helpers";
import { formData, formField } from "../types";
import LabelledDropdown from "./InputComponents/LabelledDropdown";
import LabelledTextArea from "./InputComponents/LabelledTextArea";

interface Props {
  formId: number;
}

const PreviewForm = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("Loading...");
  const [form, setForm] = useState<formData>(getForm(props.formId));
  const [fieldValue, setFieldValue] = useState<formField[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [inputIndex, setInputIndex] = useState(-1);

  useEffect(() => {
    if (form === null || form === undefined) {
      return navigate("/");
    }
    if (form.formFields.length === 0) {
      return setText("No fields in form");
    }
    setFieldValue(form.formFields);
    setInputIndex(0);
    setLoading(false);
  }, [form]);

  const renderField: (field: formField) => ReactNode = (field) => {
    switch (field.kind) {
      case "text":
        return (
          <input
            className="border-2 border-gray-200 rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            type={field.type}
            value={fieldValue[inputIndex].value}
            onChange={(e) => handleChange(e.target.value, field.id)}
          />
        );
      case "dropdown":
        return (
          <LabelledDropdown
            id={field.id}
            value={fieldValue[inputIndex].value}
            options={field.options}
            handleChangeCB={handleChange}
            multiple={false}
          />
        );
      case "multiselect":
        return (
          <LabelledDropdown
            id={field.id}
            value={fieldValue[inputIndex].value}
            options={field.options}
            handleChangeCB={handleChange}
            multiple={true}
          />
        );
      case "textarea":
        return (
          <LabelledTextArea
            id={field.id}
            value={fieldValue[inputIndex].value}
            rows={field.rows}
            columns={field.columns}
            handleChangeCB={handleChange}
          />
        );
    }
  };
  const addInputIndex = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputIndex !== form.formFields.length - 1 && inputIndex !== -1) {
      setInputIndex(inputIndex + 1);
    }
  };
  const subtractInputIndex = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputIndex !== 0 && inputIndex !== -1) {
      setInputIndex(inputIndex - 1);
    }
  };
  const handleChange: (value: string, id: number) => void = (value, id) => {
    setFieldValue(
      fieldValue.map((field) => {
        if (field.id === id) {
          if (field.kind === "multiselect") {
            return { ...field, value: value.split(",") };
          }
          return { ...field, value: value };
        } else {
          return field;
        }
      })
    );
  };

  const handleSubmit = () => {
    setForm({
      ...form,
      formFields: fieldValue,
    });
    setSubmitted(true);
    console.log(form);
  };
  return (
    <div>
      {loading === true ? (
        <div>{text}</div>
      ) : (
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="text-xl font-semibold">{form.title}</h1>
          {submitted === false ? (
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
                    onClick={(e) => subtractInputIndex(e)}
                  >
                    Previous Question
                  </button>
                )}
                {inputIndex === form.formFields.length - 1 ? (
                  <button
                    className="w-full p-2 bg-gray-200 hover:scale-110 hover:bg-gray-300 transition-all duration-100"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="w-full p-2 bg-gray-200 hover:scale-110 hover:bg-gray-300 transition-all duration-100"
                    onClick={(e) => addInputIndex(e)}
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
