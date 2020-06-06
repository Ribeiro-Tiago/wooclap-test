import React from "react";

import "./MovieItem.scss";
import { Movie } from "../../types";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieItem({ movie, onClick }: Props) {
  return (
    <div key={movie._id} className="item" onClick={() => onClick(movie)}>
      <img src={movie.img} alt="" />

      <p>{movie.name}</p>
    </div>
  );
}
