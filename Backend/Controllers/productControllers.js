import { v2 as cloudinary } from "cloudinary";
import productModel from "../Models/productModel.js";

// function for add product
const addProduct = async(req,res) =>
{
    try
    {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imageUrl = await Promise.all(
            images.map( async (item) =>
            {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:"image"});
                return result.secure_url;
            })
        )

        const productData =
        {
            name,
            description,
            price: Number(price),
            image: imageUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()
        }

        console.log(productData);
        
        const product = new productModel(productData);
        await product.save();

        res.status(200).json({success: true, message: "Product Added"});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Adding The Product"});
    }
}

// function for list products
const listProducts = async(req,res) =>
{
    try
    {
        const products = await productModel.find({});
        res.status(200).json({success: true, products});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Fetching The Products"});
    }
}

// function for remove product
const removeProduct = async(req,res) =>
{
    try
    {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success: true, message: "Product Deleted"});
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({success: false, message: "Error While Removing The Product"});
    }
}

// function for single product info
const singleProduct = async(req,res) =>
{
    try
    {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.status(200).send(product);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({message: "Error While Fetching Product"});
    }
}

export { addProduct,listProducts,removeProduct,singleProduct }