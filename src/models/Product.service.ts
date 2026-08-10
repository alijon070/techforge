import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
  }
  /** SPA **/

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
    input: ProductUpdateInput,
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
