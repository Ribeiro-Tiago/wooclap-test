import { connect } from "react-redux";

import MovieList from "./MovieList";
import { updateCurrent } from "../../store/actions/movies";
import { State } from "../../types/store";
import { Movie } from "../../types";

const mapStateToProps = ({ movies }: State) => ({
  movies: movies.movies,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrent: (movie: Movie) => dispatch(updateCurrent(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
