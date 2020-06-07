import { rmdirSync, existsSync } from "fs";
import { join } from "path";

export const removePublicFile = (name: string) => {
  const path = join("../", process.env.PUBLIC_FILES_DIR, name);

  if (existsSync(path)) {
    return rmdirSync(path);
  }
};
