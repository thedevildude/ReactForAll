import React, { useState, useEffect, useRef } from "react";
import { Link, navigate, useQueryParams } from "raviger";
import { Form, formList } from "../types/formTypes";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForm } from "../utils/apiUtls";
import { Pagination } from "../types/common";
import FormPagination from "./FormPagination";

const fetchForms = async (
  setFormListCB: (value: formList) => void,
  offset: number
) => {
  try {
    if (localStorage.getItem("token") === null) {
      throw new Error("Not logged in");
    }
    const data: Pagination<Form> = await listForm({ offset, limit: 3 });
    setFormListCB({
      count: data.count,
      forms: data.results,
    });
  } catch (error) {
    navigate("/login");
  }
};

const FormList = () => {
  const [offset, setOffset] = useState(0);
  const [formList, setFormList] = useState<formList>({ count: 0, forms: [] });

  const [newForm, setNewForm] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchForms(setFormList, offset);
    searchInputRef.current?.focus();
  }, [offset]);

  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-5 p-4 max-h-96 overflow-y-auto">
        <form
          aria-labelledby="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString });
          }}
        >
          <label id="search">Search</label>
          <input
            ref={searchInputRef}
            value={searchString}
            name="search"
            className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full"
            type="text"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </form>
        {formList.forms
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => {
            return (
              <div
                key={form.id}
                role="listitem"
                aria-label={form.title}
                className="flex gap-2 border-2 p-2 rounded-lg items-center justify-between"
              >
                <div className="flex flex-col gap-2">
                  <p>{form.title}</p>
                  {/* <p className="text-sm text-gray-500">
                    {form.formFields.length} questions
                  </p> */}
                </div>
                <div>
                  <div className="flex gap-2">
                    <Link
                      href={`/forms/${form.id}`}
                      className="bg-blue-500 hover:bg-blue-700 flex items-center p-3 fill-white rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    </Link>
                    <Link
                      href={`/preview/${form.id}`}
                      className="bg-amber-500 hover:bg-amber-700 flex items-center p-3 fill-white rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                      </svg>
                    </Link>
                    <button
                      className="bg-amber-500 hover:bg-amber-700 flex items-center p-3 fill-white rounded-lg"
                      onClick={() => {
                        if (form.id) {
                          deleteForm(form.id).then(() => {
                            fetchForms(setFormList, offset);
                          });
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <FormPagination
        count={formList.count}
        limit={3}
        offset={offset}
        setOffsetCB={setOffset}
      />
      <div className="p-4">
        <button
          className="py-2 px-5 mt-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded-lg"
          onClick={(_) => setNewForm(true)}
        >
          New Form
        </button>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
};
export default FormList;
