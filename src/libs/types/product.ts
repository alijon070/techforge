import { ObjectId } from "mongoose";
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productName: string;
  productPrice: number;
  productOldPrice: number | null;
  productStock: number;
  productPoints: number;
  productBrand: ProductBrand;
  productCategory: ProductCategory;
  productDesc?: string;
  productImages: string[];
  productSpecifications: Record<string, any>;
  productViews: number;
  productLikes: number;
  productLiked?: boolean;
}

export interface ProductInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productName: string;
  productPrice: number;
  productOldPrice?: number;
  productStock: number;
  productBrand: ProductBrand;
  productCategory: ProductCategory;
  productDesc?: string;
  productImages?: string[];
  productSpecifications: Record<string, any>;
  productViews?: number;
  productLikes?: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productName?: string;
  productPrice?: number;
  productOldPrice?: number;
  productStock?: number;
  productBrand?: ProductBrand;
  productCategory?: ProductCategory;
  productDesc?: string;
  productImages?: string[];
  productSpecifications?: Record<string, any>;
  productViews?: number;
  productLikes?: number;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  productCategory?: ProductCategory;
  productBrand?: ProductBrand;
  productOldPrice?: number;
  search?: string;
  onlyDeals?: boolean;
}
