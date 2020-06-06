import { ObjectID, ObjectId } from "mongodb";

export const toObjectId = (id: string) => {
  try {
    return new ObjectID(id);
  } catch (ex) {
    return undefined;
  }
};

export const fromObjectId = (id: ObjectId) => id.toString();
