import React from "react";

import "./MovieList.scss";
import { Movie } from "../../types";
import MovieItem from "../MovieItem/MovieItem";

interface Props {
  movies: Movie[];
  updateCurrent: (movie: Movie) => void;
}

export default function MovieList({ movies, updateCurrent }: Props) {
  const renderMovies = () => {
    return (
      <div className="container">
        {movies.map((movie) => (
          <MovieItem movie={movie} onClick={updateCurrent} />
        ))}
      </div>
    );
  };

  const renderEmptyList = () => {
    return (
      <div className="emptyWrapper">
        <p>No movies available</p>
      </div>
    );
  };

  const render = () => (movies.length ? renderMovies() : renderEmptyList());

  return <div className="movies">{render()}</div>;
}
