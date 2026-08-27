import mongoose, { Schema } from "mongoose";

const buildSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },

    buildName: { type: String, default: "My Build" },

    parts: {
      CPU: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      MOTHERBOARD: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      RAM: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      GPU: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      STORAGE: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      PSU: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      CASE: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },

    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "builds" }
);

export default mongoose.model("Build", buildSchema);
