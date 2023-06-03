import React, { useEffect, useState } from "react";
import { formField, submittedResult } from "../types/formTypes";
import { getFormFields, getSubmissions } from "../utils/apiUtls";
import { Pagination } from "../types/common";

const fetchSubmissions = async (
  setSubmissions: (submissions: submittedResult[]) => void,
  setForm: (form: formField[]) => void,
  id: number
) => {
  const submission: Pagination<submittedResult> = await getSubmissions(id);
  const form: Pagination<formField> = await getFormFields(id);
  submission.results.sort((a, b) => {
    return (
      new Date(b.created_date || "").getTime() -
      new Date(a.created_date || "").getTime()
    );
  });
  setSubmissions(submission.results);
  setForm(form.results);
};

const Submissions = (props: { id: number }) => {
  const [submissions, setSubmissions] = useState<submittedResult[]>([]);
  const [form, setForm] = useState<formField[]>([]);
  useEffect(() => {
    fetchSubmissions(setSubmissions, setForm, props.id);
  }, [props.id]);

  return (
    <div className="flex flex-col p-4 overflow-y-auto max-h-96">
      {submissions.map((submission) => {
        return (
          <div
            key={submission.id}
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 mb-4 gap-2 divide-y-2"
          >
            <div className="flex flex-col">
              <p className="text-lg font-semibold">
                Submission ID: {submission.id}
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <p className="font-bold">Created date: </p>
                <p>{submission.created_date?.split("T")[0]}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col mt-2">
                {submission.answers.map((answer, index) => {
                  return (
                    <div key={index} className="flex flex-col text-gray-500">
                      <div className="flex gap-2">
                        <p className="font-bold">Question {index + 1}: </p>
                        <p>
                          {form.find((field) => field.id === answer.form_field)
                            ?.label || `Deleted field: ${answer.form_field}`}
                        </p>
                      </div>
                      <div className="flex gap-2 text-gray-500">
                        <p className="font-bold">Answer:</p>
                        <p>{answer.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Submissions;
