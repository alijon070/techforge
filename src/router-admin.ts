import express from "express";
import storeController from "./controllers/store.controller";
const routerAdmin = express.Router();

/** STORE **/
routerAdmin.get("/", storeController.goHome);

routerAdmin
  .get("/login", storeController.getLogin)
  .post("/login", storeController.processLogin);

routerAdmin
  .get("/signup", storeController.getSignup)
  .post("/signup", storeController.processSignup);

/** Products **/
/** Member **/

export default routerAdmin;
