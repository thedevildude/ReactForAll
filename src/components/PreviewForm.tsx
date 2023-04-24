import { useState, useEffect } from "react";
import { Link, navigate } from "raviger";
import { getForm } from "../utils/helpers";
import { formData, formField } from "../types";

interface Props {
  formId: number;
}

const PreviewForm = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<formData>(getForm(props.formId));
  const [fieldValue, setFieldValue] = useState<formField[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [inputIndex, setInputIndex] = useState(-1);

  useEffect(() => {
    if (form === null || form === undefined) {
      return navigate("/");
    }
    setFieldValue(form.formFields);
    setInputIndex(form.formFields.length > 0? 0: -1);
    setLoading(false);
    console.log("use effect ran");
  }, [form]);

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
          return { ...field, value };
        }
        return field;
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
    <div className="flex flex-col items-center gap-5 w-auto">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold">{form.title}</h1>
          {submitted === false ? (
            <div>
              <div className="flex flex-col items-center">
                {form.formFields[inputIndex].label}
                <input
                  className="border-2 border-gray-200 rounded-lg p-2 m-2 w-60 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  type={form.formFields[inputIndex]?.type}
                  value={fieldValue[inputIndex]?.value}
                  onChange={(e) =>
                    handleChange(e.target.value, form.formFields[inputIndex].id)
                  }
                />
              </div>
              <div className="flex w-full justify-between">
                {inputIndex === 0 ? (
                  ""
                ) : (
                  <button
                    className="text-red-600 fill-blue-500 hover:scale-110 hover:fill-blue-800"
                    onClick={(e) => subtractInputIndex(e)}
                  >
                    Previous Question
                  </button>
                )}
                {inputIndex === form.formFields.length - 1 &&
                inputIndex !== -1 ? (
                  <button
                    className="text-red-600 fill-blue-500 hover:scale-110 hover:fill-blue-800"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="text-red-600 fill-blue-500 hover:scale-110 hover:fill-blue-800"
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
