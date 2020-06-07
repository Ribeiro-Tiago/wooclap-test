import { MOVIES } from "./endpoints";

const API_URL = process.env.REACT_APP_API_URL;

const requestWithFile = async (endpoint: string, body: FormData) => {
  const result = await fetch(`${API_URL}/${endpoint}`, {
    method: "post",
    body,
  });

  // when body comes back empty
  try {
    return await result.json();
  } catch (err) {
    return result;
  }
};

const request = async (endpoint: string, method = "get", body?: any) => {
  const result = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body }),
  });

  // when body comes back empty
  try {
    return await result.json();
  } catch (err) {
    return result;
  }
};

export const searchMovies = async (query: string) => {
  return await request(`${MOVIES.BASE}?search=${query}`);
};

export const getDetails = async (id: string) => {
  return await request(MOVIES.DETAILS.replace(":id", id));
};

export const removeMovie = async (id: string) => {
  return await request(MOVIES.DETAILS.replace(":id", id), "delete");
};

export const createMovie = async (data: FormData) => {
  return await requestWithFile(MOVIES.BASE, data);
};
