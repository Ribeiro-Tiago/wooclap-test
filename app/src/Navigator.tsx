import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { MovieDetails, Home } from "./pages";
import { Loader } from "./components";

export default function Navigator() {
  return (
    <>
      <Loader />
      <BrowserRouter>
        <Switch>
          <Route path="/details/:id" component={MovieDetails} />

          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
