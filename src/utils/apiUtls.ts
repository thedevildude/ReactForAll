import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const auth = "Basic " + window.btoa("devdeep:DDss..@#1234");
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: payload,
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
}
export const me = async () => {
  return await request("users/me/", "GET", {});
}
export const createForm = async (form: Form) => {
  return await request("forms/", "POST", form);
};

