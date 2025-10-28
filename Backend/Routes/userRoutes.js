import express from "express";
import { loginUser, registerUser, adminLogin, getUser, addAddress, getAllUsers } from "../Controllers/userControllers.js";
import adminAuth from "../Middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUser);
userRouter.post("/address", addAddress);
userRouter.get("/allusers", adminAuth, getAllUsers);

export default userRouter;