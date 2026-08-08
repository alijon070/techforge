import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors from "../libs/types/Errors";

const productController: T = {};

productController.getAllProduct = async (req: Request, res: Response) => {
  try {
    console.log("getAllProduct");
    res.render("products");
  } catch (err) {
    console.log("Error, getAllProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
    res.send("done");
  } catch (err) {
    console.log("Error, createNewProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.updateProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateProduct");
  } catch (err) {
    console.log("Error, updateProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
