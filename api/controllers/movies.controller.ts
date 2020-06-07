import { Request, Response } from "../types/server";
import {
  search,
  getDetails,
  deleteMovie,
  addMovie,
  replaceMovie,
  getFilename,
} from "../utils/dal/movies";
import { INVALID_PARAM_ID, INVALID_BODY } from "../errors/request";
import {
  removePublicFile as removeImage,
  uploadPublicFile as uploadImage,
  buildPublicPath,
} from "../utils/filesystem";
import { sanitizer as sanitizeInput } from "../utils/sanitnize";
import { validateBody, validateParams } from "../utils/validators/movies";

export const getAll = async ({ query }: Request, res: Response) => {
  const sanitized = sanitizeInput(query.search);

  const movies = await search(sanitized);

  return res.json(movies);
};

export const movieDetails = async ({ params }: Request, res: Response) => {
  const id = validateParams(params);

  if (!id) {
    return res.error(INVALID_PARAM_ID);
  }
  const details = await getDetails(id);

  return !!details ? res.json(details) : res.send(404);
};

export const removeMovie = async ({ params }: Request, res: Response) => {
  const id = validateParams(params);

  if (!id) {
    return res.error(INVALID_PARAM_ID);
  }

  const imgName = await deleteMovie(id);

  if (!imgName) {
    return res.send(404);
  }

  removeImage(imgName);

  return res.send(200);
};

export const createMovie = async ({ files, body }: Request, res: Response) => {
  const file = files?.file;

  const { validated, errors } = validateBody(body);

  if (errors) {
    return res.error(INVALID_BODY, errors);
  }

  const filename = handleUploadFile(file);
  const newMovie = await addMovie({
    img: buildPublicPath(filename),
    ...validated,
  });

  return res.json(newMovie);
};

export const updateMovie = async (
  { files, body, params }: Request,
  res: Response,
) => {
  const id = validateParams(params);

  if (!id) {
    return res.error(INVALID_PARAM_ID);
  }

  const { validated, errors } = validateBody(body);

  if (errors) {
    return res.error(INVALID_BODY, errors);
  }

  let filename = "";
  if (files?.file) {
    removeImage(await getFilename(id));
    filename = handleUploadFile(files.file);
  }

  const updatedMovie = await replaceMovie(id, {
    img: buildPublicPath(filename),
    ...validated,
  });

  return res.json(updatedMovie);
};

const handleUploadFile = (file: any) => {
  const ext = file.type.split("image/")[1];
  const filename = `${Date.now()}.${ext}`;
  uploadImage(file.path, filename);

  return filename;
};
