import { getConnection } from "../../config/database";

const collection = (name: string) => getConnection().collection(name);

const PAGE_LIMIT = 10;

export const search = (searchQuery?: string) => {
  return collection("movies")
    .find({
      ...(searchQuery && { name: { $regex: searchQuery } }),
    })
    .limit(PAGE_LIMIT)
    .sort({ name: 1 })
    .toArray();
};
