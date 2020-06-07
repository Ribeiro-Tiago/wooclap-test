import { UPDATE_MOVIES, UPDATE_CURRENT_MOVIE } from "../types";
import { ReducerAction } from "../../types/store";
import { Movie } from "../../types";

type Action = ReducerAction<Movie[] | Movie>;

const initState = {
  movies: [],
  current: undefined,
};

export default (state = initState, { payload, type }: Action) => {
  switch (type) {
    case UPDATE_MOVIES: {
      return { movies: payload ? [...payload] : [] };
    }

    case UPDATE_CURRENT_MOVIE: {
      return { ...state, current: payload };
    }

    default:
      return state;
  }
};
