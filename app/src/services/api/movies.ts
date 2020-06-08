import { request, requestWithFile } from ".";
import { MOVIES } from "../../selectors/api";

interface UpdateMovieParams {
  id: string;
  data: FormData;
}

export const searchMovies = async (query: string) => {
  return await request(`${MOVIES.BASE}?search=${query}`);
};

export const getDetails = async (id: string) => {
  return await request(MOVIES.DETAILS(id));
};

export const removeMovie = async (id: string) => {
  return await request(MOVIES.DETAILS(id), "delete");
};

export const createMovie = async (data: FormData) => {
  return await requestWithFile(MOVIES.BASE, data, "post");
};

export const updateMovie = async ({ id, data }: UpdateMovieParams) => {
  return await requestWithFile(MOVIES.DETAILS(id), data, "put");
};
