import React from "react";

import "./MovieList.scss";
import { Movie } from "../../types";
import MovieItem from "../MovieItem/MovieItem";
import { useHistory } from "react-router-dom";

interface Props {
  movies: Movie[];
  updateCurrent: (movie: Movie) => void;
}

export default function MovieList({ movies, updateCurrent }: Props) {
  const history = useHistory();

  const onMovieClick = (movie: Movie) => {
    updateCurrent(movie);
    history.push(`/details/${movie.id}`);
  };

  const renderMovies = () => {
    return (
      <div className="container">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    );
  };

  const renderEmptyList = () => {
    return <h3>Didn't find any movies that match that search</h3>;
  };

  const render = () => (movies.length ? renderMovies() : renderEmptyList());

  return <div className="movies">{render()}</div>;
}
