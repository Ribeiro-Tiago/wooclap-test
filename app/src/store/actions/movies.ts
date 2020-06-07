import { UPDATE_MOVIES, UPDATE_CURRENT_MOVIE, DELETE_MOVIE } from "../types";
import { Movie } from "../../types";

export const updateMovies = (query: string) => ({
  type: UPDATE_MOVIES,
  payload: query,
});

export const updateCurrent = (movie?: Movie) => ({
  type: UPDATE_CURRENT_MOVIE,
  payload: movie,
});

export const deleteMovie = (id: string) => ({
  type: DELETE_MOVIE,
  payload: id,
});
