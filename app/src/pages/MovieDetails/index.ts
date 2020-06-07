import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import MovieDetails from "./MovieDetails";
import { State } from "../../types/store";

import { updateCurrent, deleteMovie } from "../../store/actions/movies";
import { buildWithFetch } from "../../utils/thunk";
import { getDetails, removeMovie } from "../../services/api";

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
  unselectCurrent: () => dispatch(updateCurrent()),
  removeMovie: (id: string) => {
    const withFetch = buildWithFetch(removeMovie, id);

    return dispatch(withFetch(() => deleteMovie(id)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
