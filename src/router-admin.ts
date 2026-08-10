import express from "express";
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";
const routerAdmin = express.Router();

/** STORE **/
routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);

routerAdmin
  .get("/signup", storeController.getSignup)

  .post(
    "/signup",
    // makeUploader("members").single("memberImage"),
    storeController.processSignup,
  );

routerAdmin.get("/logout", storeController.getLogout);

routerAdmin.get("/check-me", storeController.checkAuthSession);

/** Products **/

routerAdmin.get(
  "/product/all",
  storeController.verifyRestaurant,
  productController.getAllProduct,
);

routerAdmin.post(
  "/product/create",
  storeController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct,
);

routerAdmin.post(
  "/product/:id",
  storeController.verifyRestaurant,
  productController.updateChosenProduct,
);

/** Member **/
routerAdmin.get(
  "/user/all",
  storeController.verifyRestaurant,
  storeController.getUsers,
);

routerAdmin.post(
  "/user/edit",
  storeController.verifyRestaurant,
  storeController.updateChosenUser,
);

export default routerAdmin;
