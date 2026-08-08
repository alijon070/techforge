import express from "express";
import storeController from "./controllers/store.controller";
import productController from "./controllers/product.controller";
const routerAdmin = express.Router();

/** STORE **/
routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);

routerAdmin
  .get("/signup", storeController.getSignup)
  .post("/signup", storeController.processSignup);

routerAdmin.get("/logout", storeController.getLogout);

routerAdmin.get("/check-me", storeController.checkAuthSession);

/** Products **/

routerAdmin.get("/product/all", productController.getAllProduct);

routerAdmin.post("/product/create", productController.createNewProduct);

routerAdmin.post("/product/:id", productController.createNewProduct);

/** Member **/

export default routerAdmin;
