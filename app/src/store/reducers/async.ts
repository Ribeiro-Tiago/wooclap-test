import { TOGGLE_FETCHING, UPDATE_FETCH_ERR } from "../types";
import { ReducerAction } from "../../types/store";

type Action = ReducerAction<boolean | string>;

const initState = {
  fetchErr: "",
  isFetching: false,
};

export default (state = initState, { payload, type }: Action) => {
  switch (type) {
    case TOGGLE_FETCHING: {
      return { ...state, isFetching: !state.isFetching };
    }

    case UPDATE_FETCH_ERR: {
      return { ...state, UPDATE_FETCH_ERR: payload };
    }

    default:
      return state;
  }
};
