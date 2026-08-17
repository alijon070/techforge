import mongoose, { Schema } from "mongoose";
import { View } from "../libs/types/view";

const viewSchema = new Schema<View>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<View>("View", viewSchema);
