import express from "express";
import { loginUser, registerUser, adminLogin, getUser } from "../Controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUser);

export default userRouter;