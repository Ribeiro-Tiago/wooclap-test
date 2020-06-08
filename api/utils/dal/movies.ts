import { ObjectId } from "mongodb";
import { basename } from "path";

import { getConnection } from "../../config/database";
import { Movie, NewMovie } from "../../types/movies";
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
    rating: movie.rating.toString(),
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

export const addMovie = async (movie: NewMovie) => {
  const { ops } = await collection("movies").insertOne(movie);
  const newMovie = ops[0];
  const id = newMovie._id;
  delete newMovie._id;

  return { ...newMovie, id };
};

export const getFilename = async (id: ObjectId) => {
  const { img } = await collection("movies").findOne(
    { _id: id },
    { projection: { img: 1 } },
  );

  return basename(img);
};

export const replaceMovie = async (id: ObjectId, movie: Movie) => {
  const { value } = await collection("movies").findOneAndReplace(
    { _id: id },
    movie,
  );

  return value;
};
