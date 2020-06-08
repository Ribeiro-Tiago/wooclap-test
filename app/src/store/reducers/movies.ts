import {
  UPDATE_MOVIES,
  UPDATE_CURRENT_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE,
  EDIT_MOVIE,
} from "../types";
import { ReducerAction } from "../../types/store";
import { Movie } from "../../types";

type Action = ReducerAction<Movie[] | Movie | string>;

interface State {
  current?: Movie;
  movies: Movie[];
}
const initState = {
  movies: [],
  current: undefined,
};

export default (state: State = initState, { payload, type }: Action) => {
  switch (type) {
    case UPDATE_MOVIES: {
      return { movies: payload ? [...payload] : [] };
    }

    case UPDATE_CURRENT_MOVIE: {
      return { ...state, current: payload };
    }

    case DELETE_MOVIE: {
      return {
        current: state.current,
        movies: state.movies.filter(({ id }) => id !== payload),
      };
    }

    case ADD_MOVIE: {
      return {
        movies: [...state.movies, payload],
      };
    }

    case EDIT_MOVIE: {
      return {
        current: state.current,
        movies: state.movies.map((movie) => {
          return movie.id === (payload as Movie).id ? movie : payload;
        }),
      };
    }

    default:
      return state;
  }
};
