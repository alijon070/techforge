import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProductUpdateInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
  }
  /** SPA **/

  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    console.log("inquiry:", inquiry);

    const match: T = { productStatus: ProductStatus.PROCESS };
    if (inquiry.productCategory)
      match.productCategory = inquiry.productCategory;

    if (inquiry.productBrand) match.productBrand = inquiry.productBrand;

    if (inquiry.search)
      match.productName = { $regex: inquiry.search, $options: "i" };

    if (inquiry.minPrice !== undefined || inquiry.maxPrice !== undefined) {
      match.productPrice = {};
      if (inquiry.minPrice !== undefined)
        match.productPrice.$gte = inquiry.minPrice;
      if (inquiry.maxPrice !== undefined)
        match.productPrice.$lte = inquiry.maxPrice;
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? {
            [inquiry.order]: 1,
          }
        : { [inquiry.order]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
      ])
      .exec();

    if (!result.length)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  /** SSR **/

  public async getAllProduct(): Promise<Product[]> {
    try {
      const result = await this.productModel.find().exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      return result;
    } catch (err) {
      console.error("Error, model: updateChosenProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    }
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      const product = await this.productModel.create(input);
      return product;
    } catch (err) {
      console.error("Error, model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    try {
      const productId = shapeIntoMongooseObjectId(id);
      const result = await this.productModel
        .findOneAndUpdate({ _id: productId }, input, {
          returnDocument: "after",
        })
        .exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.UPDATE_FAILED);

      return result;
    } catch (err) {
      console.error("Error, model: updateChosenProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    }
  }
}

export default ProductService;
