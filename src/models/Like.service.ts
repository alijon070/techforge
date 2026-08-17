import { ObjectId } from "mongoose";
import LikeModel from "../schema/Like.model";
import ProductModel from "../schema/Product.model";
import { shapeIntoMongooseObjectId } from "../libs/types/config";

class LikeService {
  private readonly likeModel;
  private productModel = ProductModel;

  constructor() {
    this.likeModel = LikeModel;
  }

  public async productLike(
    memberId: ObjectId,
    id: string
  ): Promise<{ liked: boolean; likeCount: number }> {
    const productId = shapeIntoMongooseObjectId(id);

    const existing = await this.likeModel.findOne({
      memberId: memberId,
      likeRefId: productId,
    });

    if (existing) {
      // unlike
      await this.likeModel.deleteOne({ _id: existing._id });
      const product = await this.productModel.findByIdAndUpdate(
        { _id: productId },
        { $inc: { productLikes: -1 } },
        { new: true }
      );
      return { liked: false, likeCount: product?.productLikes ?? 0 };
    } else {
      // like
      await this.likeModel.create({
        memberId,
        likeRefId: productId,
      });
      const product = await this.productModel.findByIdAndUpdate(
        { _id: productId },
        { $inc: { productLikes: 1 } },
        { new: true }
      );
      return { liked: true, likeCount: product?.productLikes ?? 0 };
    }
  }
}

export default LikeService;
