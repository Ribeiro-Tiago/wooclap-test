import { connect } from "react-redux";

import MovieDetails from "./MovieDetails";
import { State } from "../../types/store";

const mapStateToProps = ({ movies, async }: State) => {
  return {
    movie: movies.current,
    isFetching: async.isFetching,
  };
};

export default connect(mapStateToProps)(MovieDetails);
