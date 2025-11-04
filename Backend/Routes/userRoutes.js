import express from "express";
import { loginUser, registerUser, adminLogin, getUser, addAddress, getAllUsers, sendResetOtp, resetPassword, editProfile } from "../Controllers/userControllers.js";
import adminAuth from "../Middleware/adminAuth.js";
import upload from "../Middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUser);
userRouter.post("/address", addAddress);
userRouter.get("/allusers", adminAuth, getAllUsers);
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/edit-profile",upload.single("image"), editProfile);

export default userRouter;