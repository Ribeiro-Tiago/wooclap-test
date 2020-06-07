import { Movie } from "./";

export interface State {
  async: {
    isFetching: boolean;
    fetchErr: string;
  };
  movies: {
    movies: Movie[];
    current: Movie;
  };
}

export interface ReducerAction<T> {
  payload: T;
  type: string;
}
