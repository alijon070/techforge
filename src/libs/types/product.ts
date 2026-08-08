import { ObjectId } from "mongoose";
import { ProductCategory, ProductStatus } from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productName: string;
  productPrice: number;
  productStock: number;
  productBrand: string;
  productCategory: ProductCategory;
  productDesc?: string;
  productImages: string[];
  productSpecifications: string;
  productViews: number;
  productLikes: number;
}

export interface ProductInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productName: string;
  productPrice: number;
  productStock: number;
  productBrand: string;
  productCategory: ProductCategory;
  productDesc?: string;
  productImages?: string[];
  productSpecifications: string;
  productViews?: number;
  productLikes?: number;
}
