import React from "react";

import "./MovieItem.scss";
import { Movie } from "../../types";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieItem({ movie, onClick }: Props) {
  const onItemClick = () => onClick(movie);

  return (
    <div className="item" onClick={onItemClick}>
      <img src={movie.img} alt={movie.name} />

      <p>{movie.name}</p>
    </div>
  );
}
