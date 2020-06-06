import { Route, Server } from "../types/server";

import { getAll } from "../controllers/movies.controller";

const routes: Route[] = [(server: Server) => server.get("/movies", getAll)];

export default routes;
