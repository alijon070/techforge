import express, { Request, Response } from "express";
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
const router = express.Router();

/** Member **/
router.get("/member/store", memberController.getStore);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);
/** Product **/

router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);
// router.post(
//   "/product/like/:id",
//   memberController.verifyAuth,
//   productController.productLike
// );

router.post(
  "/product/like/:id",
  (req, res, next) => {
    console.log("🔥 LIKE ROUTE HIT");
    console.log("ID:", req.params.id);
    next();
  },
  memberController.verifyAuth,
  productController.productLike
);

router.post(
  "/products/like-status",
  memberController.verifyAuth,
  productController.getProductsLikeStatus
);

router.post(
  "/products/like-status/:id",
  memberController.verifyAuth,
  productController.getProductsLikeStatus
);

router.get(
  "/member/wishlist",
  memberController.verifyAuth,
  productController.getMyWishlist
);

/**  Order **/
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);

router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;
