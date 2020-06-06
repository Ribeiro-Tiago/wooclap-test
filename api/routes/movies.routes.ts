import { Route, Server } from "../types/server";
import { getAll, movieDetails } from "../controllers/movies.controller";

const routes: Route[] = [
  (server: Server) => server.get("/movies", getAll),
  (server: Server) => server.get("/movies/:id", movieDetails),
];

export default routes;
