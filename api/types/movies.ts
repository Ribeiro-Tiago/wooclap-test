import { ObjectId } from "mongodb";

import { BaseMovie } from "../../types/movies";

export interface Movie extends BaseMovie {
  _id: ObjectId;
  rating: number;
}
export type NewMovie = BaseMovie;
