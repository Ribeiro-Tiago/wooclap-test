import {
  mkdirSync,
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
} from "fs";
import { join, resolve } from "path";

const publicDir = resolve(__dirname, "../", process.env.PUBLIC_FILES_DIR);

export const removePublicFile = (name: string) => {
  const path = join(publicDir, name);

  if (existsSync(path)) {
    return unlinkSync(path);
  }
};

// not really sure what's the type for file
export const uploadPublicFile = (tmpFilePath: string, filename: string) => {
  const path = join(publicDir, filename);

  if (!existsSync(publicDir)) {
    mkdirSync(publicDir);
  }

  writeFileSync(path, readFileSync(tmpFilePath));

  return path;
};

export const buildPublicPath = (filename: string) => {
  return `${process.env.APP_ORIGIN}/assets/${filename}`;
};
