import { Request, Response } from "express";
import { T } from "../libs/types/common";

const shopController: T = {};

shopController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

shopController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

shopController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("SignUp Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

export default shopController;
