import express, { Request, Response } from "express";
import memberController from "./controllers/member.controller";
const router = express.Router();

/** STORE **/

router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);

export default router;
