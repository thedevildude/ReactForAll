import React, { useState } from "react";
import { Link, navigate, useQueryParams } from "raviger";

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

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone number", type: "tel", value: "" },
];

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const FormList = () => {
  const [forms, setForms] = useState(getLocalForms());

  const newForm: () => void = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setForms(getLocalForms());
    navigate(`/forms/${newForm.id}`)
  };

  const deleteForm: (id: number) => void = (id) => {
    const localForms = getLocalForms();
    const newFormList = localForms.filter((form) => form.id !== id);
    saveLocalForms([...newFormList]);
    setForms(getLocalForms());
  };

  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-5 p-4 max-h-96 overflow-y-auto">
        <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({search: searchString})
        }}
        >
          <label>Search</label>
          <input
            value={searchString}
            name="search"
            className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full"
            type="text"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </form>
        {forms
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => {
            return (
              <div
                key={form.id}
                className="flex gap-2 items-center justify-between border-2 p-2 rounded-lg"
              >
                <p>{form.title}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/forms/${form.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    className="hover:text-red-900 text-red-500"
                    onClick={() => deleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex gap-5">
        <Link
          className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
          href="/"
        >
          Close Form List
        </Link>
        <button
          className="py-2 px-5 mt-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded-lg"
          onClick={newForm}
        >
          New
        </button>
      </div>
    </div>
  );
};
export default FormList;
