import { createServer, plugins } from "restify";

import { Route } from "../types/server";
import corsMiddleware from "../middleware/cors";
import { handleError } from "../middleware/error";
import { createConnection } from "./database";

export default async (routes: Route[]) => {
  let close: () => Promise<void>;

  try {
    const server = createServer({
      name: "wooclap",
      version: "1.0.0",
    });

    server.pre(corsMiddleware.preflight);
    server.use(corsMiddleware.actual);
    server.use(handleError);
    server.use(plugins.acceptParser(server.acceptable));
    server.use(plugins.queryParser());
    server.use(plugins.bodyParser());

    routes.forEach((r) => r(server));

    return await new Promise((resolve, reject) => {
      const port = process.env.PORT;

      server.listen(port, async (err: any) => {
        if (err) {
          reject(err);
          return;
        }

        close = await createConnection();

        resolve(3001);
      });
    });
  } catch (err) {
    if (close) {
      await close();
    }

    throw err;
  }
};
