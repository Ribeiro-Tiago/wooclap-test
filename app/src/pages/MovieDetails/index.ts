import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import MovieDetails from "./MovieDetails";
import { State } from "../../types/store";

import { updateCurrent } from "../../store/actions/movies";
import { buildWithFetch } from "../../utils/thunk";
import { getDetails } from "../../services/api";

const mapStateToProps = (
  { movies, async }: State,
  { match }: RouteComponentProps,
) => {
  const id = (match.params as any).id;
  return {
    movie: movies.current,
    isFetching: async.isFetching,
    isNew: id === "-1",
    id,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getDetails: (id: string) => {
    const withFetch = buildWithFetch(getDetails, id);

    return dispatch(withFetch(updateCurrent));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
