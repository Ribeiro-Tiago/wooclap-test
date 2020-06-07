import { Route, Server } from "../types/server";
import {
  getAll,
  movieDetails,
  removeMovie,
} from "../controllers/movies.controller";

const routes: Route[] = [
  (server: Server) => server.get("/movies", getAll),
  (server: Server) => server.get("/movies/:id", movieDetails),
  (server: Server) => server.del("/movies/:id", removeMovie),
];

export default routes;
