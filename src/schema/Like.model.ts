import mongoose, { Schema } from "mongoose";
import { Like } from "../libs/types/like";

const likeSchema = new Schema<Like>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    likeRefId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Like>("Like", likeSchema);
