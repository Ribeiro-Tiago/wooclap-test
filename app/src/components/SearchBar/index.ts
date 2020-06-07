import { connect } from "react-redux";

import SearchBar from "./SearchBar";
import { updateMovies } from "../../store/actions/movies";
import { searchMovies } from "../../services/api";
import { State } from "../../types/store";
import { buildWithFetch } from "../../utils/thunk";

const mapStateToProps = ({ async }: State) => ({
  isFetching: async.isFetching,
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    searchMovies: (search: string) => {
      const withFetch = buildWithFetch(searchMovies, search);

      dispatch(withFetch(updateMovies));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
