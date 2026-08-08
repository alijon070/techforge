import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { Product } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = ProductModel;
  }

  public async getAllProduct(): Promise<void> {
    try {
    } catch (err) {
      console.error("Error, model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
}

export default ProductService;
