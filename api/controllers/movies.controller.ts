import { Request, Response } from "../types/server";
import { search } from "../utils/dal/movies";

const sanitizeInput = (input?: string) => {
  return input ? input.trim() : "";
};

export const getAll = async ({ query }: Request, res: Response) => {
  const sanitized = sanitizeInput(query.search);

  const movies = await search(sanitized);

  return res.json(movies);
};
