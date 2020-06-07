import { ObjectId } from "mongodb";

import { getConnection } from "../../config/database";
import { Movie } from "../types/movies";
import { fromObjectId } from "./utils";

const collection = (name: string) => getConnection().collection(name);

const PAGE_LIMIT = 10;

export const search = async (searchQuery?: string) => {
  return (
    await collection("movies")
      .find<Movie>({
        ...(searchQuery && { name: { $regex: searchQuery } }),
      })
      .limit(PAGE_LIMIT)
      .sort({ name: 1 })
      .toArray()
  ).map((movie) => ({
    id: movie._id.toString(),
    img: movie.img,
    name: movie.name,
    rating: movie.rating,
    releaseDate: movie.releaseDate,
    genre: movie.genre,
  }));
};

export const getDetails = async (id: ObjectId) => {
  const details = await collection("movies").findOne<Movie>({ _id: id });

  if (!details) {
    return;
  }

  delete details._id;

  return { ...details, id: fromObjectId(id) };
};

export const deleteMovie = async (id: ObjectId) => {
  const { value } = await collection("movies").findOneAndDelete({ _id: id });

  return value?.img;
};
