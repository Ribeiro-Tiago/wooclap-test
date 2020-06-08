import { MOVIES } from "./endpoints";

const API_URL = process.env.REACT_APP_API_URL;

interface UpdateMovieParams {
  id: string;
  data: FormData;
}

const requestWithFile = async (
  endpoint: string,
  body: FormData,
  method: "post" | "put",
) => {
  const result = await fetch(`${API_URL}/${endpoint}`, { method, body });

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
  return await requestWithFile(MOVIES.BASE, data, "post");
};

export const updateMovie = async ({ id, data }: UpdateMovieParams) => {
  return await requestWithFile(MOVIES.DETAILS.replace(":id", id), data, "put");
};
