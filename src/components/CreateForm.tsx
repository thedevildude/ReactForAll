import React, { useState } from "react";
import { Errors, Form, validateForm } from "../types/formTypes";
import { navigate } from "raviger";
import { createForm } from "../utils/apiUtls";

const CreateForm = () => {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Errors<Form>>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateErrors = validateForm(form);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create form</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`${errors.title ? "text-red-500" : ""}`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={`border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full ${
              errors.title ? "border-red-500" : ""
            }`}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className={`border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            value={form.is_public ? "true" : "false"}
            className={`border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full ${
              errors.is_public ? "border-red-500" : ""
            }`}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
          />
          <label
            htmlFor="is_public"
            className={`${errors.is_public ? "text-red-500" : ""}`}
          >
            Public
          </label>
          {errors.is_public && (
            <p className="text-red-500 text-sm">{errors.is_public}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
