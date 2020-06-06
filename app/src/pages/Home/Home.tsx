import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./Home.scss";
import { MovieDetails, SearchBar, MovieList } from "../../components";

export default function Home() {
  const customHistory = createBrowserHistory();

  return (
    <div className="home">
      <Router history={customHistory}>
        <Switch>
          <Route path="/">
            <h1>Movie Catalog</h1>

            <SearchBar />

            <MovieList />
          </Route>
          <Route path="/movie">
            <MovieDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
