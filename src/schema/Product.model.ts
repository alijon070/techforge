import mongoose, { Schema } from "mongoose";
import { ProductCategory, ProductStatus } from "../libs/enums/product.enum";
import { Product } from "../libs/types/product";

const productSchema = new Schema<Product>(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productStock: {
      type: Number,
      required: true,
    },

    productBrand: {
      type: String,
      required: true,
      trim: true,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      required: true,
    },

    productDesc: {
      type: String,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productSpecifications: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    productViews: {
      type: Number,
      default: 0,
    },

    productLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Product>("Products", productSchema);
