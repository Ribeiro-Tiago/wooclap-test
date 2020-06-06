import { Server } from "../types/server";
import movies from "./movies.routes";

export default [
  (server: Server) => server.get("/ping", (req, res) => res.json("pong")),
  ...movies,
];
