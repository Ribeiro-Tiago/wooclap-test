import { config as dotenv } from "dotenv";

dotenv();

import createServer from "./config/server";
import routes from "./routes";

createServer(routes)
  .then((port) => console.log(`Server running on ${port}`))
  .catch((err) => console.error("server gave up", err));
