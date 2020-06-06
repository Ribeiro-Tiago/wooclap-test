import { Request, Response } from "../types/server";
import { search, getDetails } from "../utils/dal/movies";
import { toObjectId } from "../utils/dal/utils";

const sanitizeInput = (input?: string) => {
  return input ? input.trim() : "";
};

export const getAll = async ({ query }: Request, res: Response) => {
  const sanitized = sanitizeInput(query.search);

  const movies = await search(sanitized);

  return res.json(movies);
};

export const movieDetails = async ({ params }: Request, res: Response) => {
  const id = toObjectId(sanitizeInput(params.id));

  if (!id) {
    return res.error({ message: "id param is invalid", status: 400 });
  }

  const details = await getDetails(id);

  return res.json(details);
};
