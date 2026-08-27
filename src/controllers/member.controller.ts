import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  ExtentedRequest,
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/types/config";

const memberService = new MemberService();
const authServive = new AuthService();
const memberController: T = {};

memberController.getStore = async (req: Request, res: Response) => {
  try {
    console.log("getStore");
    const result = await memberService.getStore();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getStore", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    console.log("body:", req.body);
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input),
      token = await authServive.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });
    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error, signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result: Member = await memberService.login(input),
      token = await authServive.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });
    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error, login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.logout = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.getMemberDetail = async (
  req: ExtentedRequest,
  res: Response
) => {
  try {
    console.log("getMemberDetail");
    const result = await memberService.getMemberDetail(req.member);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMemberDetail", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.updateMember = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("\n========== BACKEND UPDATE MEMBER ==========");

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.member:", req.member);

    if (req.file) {
      console.log("FILE PATH:", req.file.path);
      console.log("FILE NAME:", req.file.filename);
      console.log("FILE ORIGINAL NAME:", req.file.originalname);
      console.log("FILE MIME:", req.file.mimetype);
    }
    const input: MemberUpdateInput = req.body;
    if (req.file) {
      input.memberImage = req.file.path.replace(/\\/g, "/");
    }
    const result = await memberService.updateMember(req.member, input);

    console.log("UPDATED MEMBER:", result);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateMember", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
memberController.verifyAuth = async (
  req: ExtentedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authServive.checkAuth(token);

    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    next();
  } catch (err) {
    console.log("Error, verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.retrieveAuth = async (
  req: ExtentedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authServive.checkAuth(token);

    next();
  } catch (err) {
    console.log("Error, retrieveAuth", err);
    next();
  }
};

export default memberController;
