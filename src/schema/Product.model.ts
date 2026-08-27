import mongoose, { Schema } from "mongoose";
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from "../libs/enums/product.enum";
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

    productOldPrice: {
      type: Number,
      default: 0,
    },

    productStock: {
      type: Number,
      required: true,
    },

    productBrand: {
      type: String,
      enum: ProductBrand,
      required: true,
    },

    productPoints: {
      type: Number,
      default: 0,
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
      default: { key: String, value: String },
    },

    productViews: {
      type: Number,
      default: 0,
    },

    productLikes: {
      type: Number,
      default: 0,
    },

    productLiked: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Product>("Product", productSchema);
