import { ObjectId } from "mongodb";

import { BaseMovie } from "../../types/movies";

export interface Movie extends NewMovie {
  _id: ObjectId;
}
export interface NewMovie extends BaseMovie {
  rating: number;
}
