import { getConnection } from "../../config/database";
import { Movie } from "../types/movies";

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
    ratings: movie.ratings,
    releaseDate: movie.releaseDate,
  }));
};
