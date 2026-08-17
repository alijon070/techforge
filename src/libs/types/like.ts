import { ObjectId } from "mongoose";

export interface Like {
  _id: ObjectId;
  memberId: ObjectId;
  likeRefId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewInput {
  memberId: ObjectId;
  likeRefId: ObjectId;
}
