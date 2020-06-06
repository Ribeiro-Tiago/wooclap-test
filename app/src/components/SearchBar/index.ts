import { connect } from "react-redux";

import SearchBar from "./SearchBar";
import { toggleFetching, updateFetchErr } from "../../store/actions/async";
import { updateMovies } from "../../store/actions/movies";
import { searchMovies as apiSearchMovies } from "../../services/api";
import { State } from "../../types/store";

const searchMoviesThunk = (search: string) => {
  return (dispatch: Function) => {
    return apiSearchMovies(search)
      .then((movies) => dispatch(updateMovies(movies)))
      .catch((error) => dispatch(updateFetchErr(error)))
      .finally(() => dispatch(toggleFetching()));
  };
};

const mapStateToProps = ({ async }: State) => ({
  isFetching: async.isFetching,
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    searchMovies: (search: string) => {
      dispatch(toggleFetching());
      dispatch(searchMoviesThunk(search));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
