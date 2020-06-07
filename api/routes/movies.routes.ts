import { Route, Server } from "../types/server";
import {
  getAll,
  movieDetails,
  removeMovie,
  createMovie,
} from "../controllers/movies.controller";

const routes: Route[] = [
  (server: Server) => server.get("/movies", getAll),
  (server: Server) => server.get("/movies/:id", movieDetails),
  (server: Server) => server.del("/movies/:id", removeMovie),
  (server: Server) => server.post("/movies", createMovie),
];

export default routes;
