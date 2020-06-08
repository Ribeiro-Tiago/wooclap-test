import { Route, Server } from "../types/server";
import {
  getAll,
  movieDetails,
  removeMovie,
  createMovie,
  updateMovie,
} from "../controllers/movies.controller";

const routes: Route[] = [
  (server: Server) => server.get("/api/movies", getAll),
  (server: Server) => server.get("/api/movies/:id", movieDetails),
  (server: Server) => server.del("/api/movies/:id", removeMovie),
  (server: Server) => server.post("/api/movies", createMovie),
  (server: Server) => server.put("/api/movies/:id", updateMovie),
];

export default routes;
