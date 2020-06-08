import React from "react";

import "./Home.scss";
import { SearchBar, MovieList } from "../../components";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../selectors/routes";

interface Props {
  clearCurrentMovie: () => void;
}

export default function Home({ clearCurrentMovie }: Props) {
  const history = useHistory();
  const onCreateClick = () => {
    clearCurrentMovie();
    history.push(ROUTES.NEW_MOVIE);
  };

  return (
    <div className="home">
      <header>
        <h1>Movie Catalog</h1>
        <span onClick={onCreateClick}>Create</span>
      </header>

      <SearchBar />

      <MovieList />
    </div>
  );
}
