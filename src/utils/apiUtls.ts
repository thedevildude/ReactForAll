import { Pagination, PaginationParams } from "../types/common";
import {
  Form,
  formField,
  submissionData,
  submittedResult,
} from "../types/formTypes";
const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type DataParams =
  | {
      username: string;
      password: string;
    }
  | Partial<Form>
  | Partial<formField>
  | submissionData
  | PaginationParams
  | {};

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: DataParams = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof DataParams]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  // Basic authentication
  // const auth = "Basic " + window.btoa("devdeep:DDss..@#1234");

  // Token authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
};

export const login = async (username: string, password: string) => {
  return await request("auth-token/", "POST", { username, password });
};
export const me = async () => {
  return await request("users/me/", "GET");
};
export const createForm = async (form: Form) => {
  return await request("forms/", "POST", form);
};

export const listForm = async (pageParams: PaginationParams) => {
  return await request("forms/", "GET", pageParams);
};

export const getForm = async (id: number) => {
  return await request(`forms/${id}/`, "GET");
};

export const getFormFields = async (id: number) => {
  return await request(`forms/${id}/fields/`, "GET");
};

export const addFormField = async (id: number, newField: formField) => {
  return await request(`forms/${id}/fields/`, "POST", newField);
};

export const deleteFormField = async (id: number, fieldId: number) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "DELETE");
};

export const updateForm = async (id: number, data: Partial<Form>) => {
  return await request(`forms/${id}/`, "PATCH", data);
};

export const deleteForm = async (id: number) => {
  return await request(`forms/${id}/`, "DELETE");
};

export const updateFormField = async (
  id: number,
  fieldId: number,
  data: Partial<formField>
) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "PATCH", data);
};

export const fullUpdateFormField = async (
  id: number,
  fieldId: number,
  data: formField
) => {
  return await request(`forms/${id}/fields/${fieldId}/`, "PUT", data)
}

export const submitForm: (
  id: number,
  data: submissionData
) => Promise<submittedResult> = async (id: number, data: submissionData) => {
  return await request(`forms/${id}/submission/`, "POST", data);
};

export const getSubmissions: (
  id: number
) => Promise<Pagination<submittedResult>> = async (id: number) => {
  return await request(`forms/${id}/submission/`, "GET");
};
