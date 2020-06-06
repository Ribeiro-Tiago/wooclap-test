import { MOVIES } from "./endpoints";

const API_URL = process.env.REACT_APP_API_URL;

const _get = async (endpoint: string, method = "get", body?: any) => {
  return (
    await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers: {
        contentType: "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    })
  ).json();
};

export const searchMovies = async (query: string) => {
  return await _get(`${MOVIES.getAll}?search=${query}`);
};
