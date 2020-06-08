import { NewMovie } from "../../../types/movies";
import { sanitizer } from "../../sanitnize";
import { isValidDate, isValidNumber } from "../helpers";
import { toObjectId } from "../../dal/utils";

export const validateBody = (body: NewMovie) => {
  const errors: any = {};
  const validated: any = {};

  if (!sanitizer(body.name)) {
    errors.name = "name is requried";
  } else {
    validated.name = sanitizer(body.name);
  }

  if (!sanitizer(body.genre)) {
    errors.genre = "genre is requried";
  } else {
    validated.genre = sanitizer(body.genre);
  }

  if (!isValidDate(body.releaseDate)) {
    errors.releaseDate = "releaseDate is invalid";
  } else {
    validated.releaseDate = new Date(body.releaseDate);
  }

  if (!isValidNumber(body.rating)) {
    errors.rating = "rating must be a postiive number";
  } else {
    validated.rating = isValidNumber(body.rating);
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { validated };
};

export const validateParams = (params: { id: string }) => {
  return toObjectId(sanitizer(params?.id));
};
