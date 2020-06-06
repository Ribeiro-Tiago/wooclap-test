import { TOGGLE_FETCHING, UPDATE_FETCH_ERR } from "../types";

export const toggleFetching = () => ({ type: TOGGLE_FETCHING });

export const updateFetchErr = (err: string) => ({
  type: UPDATE_FETCH_ERR,
  payload: err,
});
