import { Server } from "../types/server";

export default [
  (server: Server) => server.get("/ping", (req, res) => res.json("pong")),
];
