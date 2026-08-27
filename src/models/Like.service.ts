import { ObjectId } from "mongoose";
import LikeModel from "../schema/Like.model";
import ProductModel from "../schema/Product.model";
import { shapeIntoMongooseObjectId } from "../libs/types/config";

class LikeService {
  private readonly likeModel = LikeModel;
  private readonly productModel = ProductModel;

  /**
   * LIKE / UNLIKE PRODUCT
   */
  public async productLike(
    memberId: ObjectId,
    id: string
  ): Promise<{ liked: boolean; likeCount: number }> {
    const productId = shapeIntoMongooseObjectId(id);

    const existingLike = await this.likeModel.findOne({
      memberId,
      likeRefId: productId,
    });

    if (existingLike) {
      // =========================
      // UNLIKE
      // =========================

      await this.likeModel.deleteOne({
        _id: existingLike._id,
      });

      const product = await this.productModel.findByIdAndUpdate(
        productId,
        {
          $inc: {
            productLikes: -1,
          },
        },
        {
          new: true,
        }
      );

      return {
        liked: false,
        likeCount: Math.max(product?.productLikes ?? 0, 0),
      };
    }

    // =========================
    // LIKE
    // =========================

    await this.likeModel.create({
      memberId,
      likeRefId: productId,
    });

    const product = await this.productModel.findByIdAndUpdate(
      productId,
      {
        $inc: {
          productLikes: 1,
        },
      },
      {
        new: true,
      }
    );

    return {
      liked: true,
      likeCount: product?.productLikes ?? 0,
    };
  }

  /**
   * CHECK IF CURRENT MEMBER LIKED ONE PRODUCT
   */
  public async checkProductLike(
    memberId: ObjectId,
    productId: string
  ): Promise<boolean> {
    const like = await this.likeModel.findOne({
      memberId,
      likeRefId: shapeIntoMongooseObjectId(productId),
    });

    return !!like;
  }

  /**
   * GET LIKE STATUS FOR MULTIPLE PRODUCTS
   *
   * This is the aggregation you were asking about.
   *
   * It returns:
   *
   * {
   *   productId,
   *   liked
   * }
   */
  public async getProductsLikeStatus(memberId: ObjectId, productIds: string[]) {
    const ids = productIds.map((id) => shapeIntoMongooseObjectId(id));
    const memberObjectId = shapeIntoMongooseObjectId(memberId);

    const likes = await this.likeModel.aggregate([
      {
        $match: {
          memberId: memberObjectId,
          likeRefId: {
            $in: ids,
          },
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$likeRefId",
        },
      },
    ]);
    console.log("LIKE STATUS RESULT:", likes);

    return likes;
  }
  public async getMyWishlist(memberId: ObjectId) {
    const memberObjectId = shapeIntoMongooseObjectId(memberId);
    console.log("========== GET MY WISHLIST ==========");
    console.log("MEMBER ID:", memberId);

    // const likes = await this.likeModel.find({
    //   memberId: memberObjectId,
    // });

    // console.log("LIKES FOUND:", likes);

    const wishlist = await this.likeModel.aggregate([
      {
        $match: {
          memberId: memberObjectId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "likeRefId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    console.log("WISHLIST AGGREGATION:", wishlist);

    return wishlist.map((item) => item.product).filter(Boolean);
  }
}

export default LikeService;
