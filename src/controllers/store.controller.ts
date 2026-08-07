import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";

const storeController: T = {};

storeController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

storeController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

storeController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("SignUp Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

export default storeController;
