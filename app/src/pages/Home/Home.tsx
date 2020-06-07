import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import "./Home.scss";
import { MovieDetails, SearchBar, MovieList } from "../../components";

export default function Home() {
  return (
    <div className="home">
      <BrowserRouter>
        <Switch>
          <Route path="/details/:id">
            <MovieDetails />
          </Route>

          <Route path="/">
            <h1>Movie Catalog</h1>

            <SearchBar />

            <MovieList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
