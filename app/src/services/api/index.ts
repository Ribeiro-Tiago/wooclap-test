import { MOVIES } from "./endpoints";

const API_URL = process.env.REACT_APP_API_URL;

const _get = async (endpoint: string, method = "get", body?: any) => {
  const result = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      contentType: "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // when body comes back empty
  try {
    return await result.json();
  } catch (err) {
    return result;
  }
};

export const searchMovies = async (query: string) => {
  return await _get(`${MOVIES.GET_ALL}?search=${query}`);
};

export const getDetails = async (id: string) => {
  return await _get(MOVIES.DETAILS.replace(":id", id));
};

export const removeMovie = async (id: string) => {
  return await _get(MOVIES.DETAILS.replace(":id", id), "delete");
};
