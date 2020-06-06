import { UPDATE_MOVIES } from "../types";

export const updateMovies = (query: string) => ({
  type: UPDATE_MOVIES,
  payload: query,
});
