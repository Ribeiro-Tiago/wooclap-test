import { plugins } from "restify";
import { resolve } from "path";

import { Server } from "../types/server";
import movies from "./movies.routes";

const serveStatic = plugins.serveStatic({
  directory: "public",
});

export default [
  (server: Server) => server.get("/assets/*", serveStatic),
  (server: Server) => server.get("/ping", (req, res) => res.json("pong")),
  ...movies,
];
