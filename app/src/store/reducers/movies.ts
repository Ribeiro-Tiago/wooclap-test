import { UPDATE_MOVIES } from "../types";
import { ReducerAction } from "../../types/store";
import { Movie } from "../../types";

type Action = ReducerAction<Movie[]>;

const initState = {
  movies: [],
};

export default (state = initState, { payload, type }: Action) => {
  switch (type) {
    case UPDATE_MOVIES: {
      return { ...payload };
    }

    default:
      return state;
  }
};
