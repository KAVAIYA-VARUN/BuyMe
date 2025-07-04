import express from "express";
import { addProduct,listProducts,removeProduct,singleProduct } from "../Controllers/productControllers.js";
import upload from "../Middleware/multer.js";
import adminAuth from "../Middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth , upload.fields([{name: "image1",maxCount: 1},{name: "image2",maxCount: 1},{name: "image3",maxCount: 1},{name: "image4",maxCount: 1}]), addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth , removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;