import { connect } from "react-redux";

import MovieDetails from "./MovieDetails";
import { State } from "../../types/store";

import { updateCurrent } from "../../store/actions/movies";
import { buildWithFetch } from "../../utils/thunk";
import { getDetails } from "../../services/api";

const mapStateToProps = ({ movies, async }: State) => {
  return {
    movie: movies.current,
    isFetching: async.isFetching,
  };
};

/* const mapDispatchToProps = (dispatch: Function) => ({
  getDetails: (id: string) => {
    const withFetch = buildWithFetch(getDetails, id);

    dispatch(withFetch(updateCurrent));
  },
}); */

export default connect(mapStateToProps)(MovieDetails);
