import { Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/types/Errors";
import { ExtentedRequest } from "../libs/types/member";
import OrderService from "../models/Order.Service";

const orderService = new OrderService();
const orderController: T = {};

orderController.createOrder = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("createOrder");
    const result = await orderService.createOrder(req.member, req.body);

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default orderController;
