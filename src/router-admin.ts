import express from "express";
import shopController from "./controllers/shop.controller";
const routerAdmin = express.Router();

routerAdmin.get("/", shopController.goHome);

routerAdmin.get("/login", shopController.getLogin);

routerAdmin.get("/signup", shopController.getSignup);

export default routerAdmin;
