import { toggleFetching, updateFetchErr } from "../store/actions/async";

export const buildWithFetch = (apiFunction: Function, ...args: string[]) => (
  dispatchable: Function,
) => {
  return async (dispatch: Function) => {
    dispatch(toggleFetching());

    try {
      const result = await apiFunction(args);

      dispatch(dispatchable(result));
      return result;
    } catch (err) {
      dispatch(updateFetchErr(err));
    }

    dispatch(toggleFetching());
  };
};
