import express from "express";
import UserController from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/signup", UserController.signUp);

export default userRouter;
