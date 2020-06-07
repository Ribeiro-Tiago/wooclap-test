import { toggleFetching, updateFetchErr } from "../store/actions/async";

export const buildWithFetch = (apiFunction: Function, args: any) => (
  dispatchable?: Function,
) => {
  return async (dispatch: Function) => {
    dispatch(toggleFetching());

    try {
      const result = await apiFunction(args);

      if (dispatchable) {
        dispatch(dispatchable(result));
      }

      dispatch(toggleFetching());
      return result;
    } catch (err) {
      console.error("request err", err);
      dispatch(updateFetchErr(err));
      dispatch(toggleFetching());
    }
  };
};
