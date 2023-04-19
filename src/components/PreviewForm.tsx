import { useState } from "react";
import { Link } from "raviger";
import { getForm } from "../utils/helpers";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

interface Props {
  formId: number;
}

const PreviewForm = (props: Props) => {
  const [form, setForm] = useState(getForm(props.formId));
  const [inputIndex, setInputIndex] = useState(
    form.formFields.length >= 1 ? 0 : -1
  );

  const addInputIndex: (e: React.MouseEvent<SVGElement, MouseEvent>) => void = (
    e
  ) => {
    if (inputIndex !== form.formFields.length - 1 && inputIndex !== -1) {
      setInputIndex(inputIndex + 1);
    }
  };
  const subtractInputIndex: (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => void = (e) => {
    if (inputIndex !== 0 && inputIndex !== -1) {
      setInputIndex(inputIndex - 1);
    }
  };

  const handleChange: (value: string, id: number) => void = (value, id) => {
    setForm({
      ...form,
      formFields: form.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, value };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-semibold">{form.title}</h1>
      <div className="flex items-center justify-between gap-5">
        <BsFillArrowLeftCircleFill
          className="w-6 h-6 fill-blue-500 hover:scale-110 hover:fill-blue-800"
          onClick={(e) => subtractInputIndex(e)}
        />
        <div className="flex flex-col items-center">
          {form.formFields[inputIndex].label}
          <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            type={form.formFields[inputIndex].type}
            value={form.formFields[inputIndex].value}
            onChange={(e) =>
              handleChange(e.target.value, form.formFields[inputIndex].id)
            }
          />
        </div>
        <BsFillArrowRightCircleFill
          className="w-6 h-6 fill-blue-500 hover:scale-110 hover:fill-blue-800"
          onClick={(e) => addInputIndex(e)}
        />
      </div>
      <div className="flex gap-5">
        <Link
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          href="/"
        >
          Close Form List
        </Link>
      </div>
    </div>
  );
};

export default PreviewForm;
