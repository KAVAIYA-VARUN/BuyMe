import userModel from "../Models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Route for user login
const loginUser = async (req,res) =>
{
    console.log(req.body);
    try
    {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});

        // checking if the user exists or not
        if(!user)
        {
            return res.json({message: "User Doesn't Exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // now if the password is true then will generate the token
        if(isMatch)
        {
            const token = createToken(user._id);
            res.status(200).json({success: true, token});
        }
        else
        {
            res.json({success: false, message: "Incorrect Credentials"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({message: "Error While Logging The User"});
    }
}

// Route for user register
const registerUser = async (req,res) =>
{
    try
    {
        const { name, email, password } = req.body;

        // checking if the user already exists

        const exists = await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false, message: "User Already Exists"});
        }

        // validation part

        // validating email format and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false, message: "Please Enter A Valid Email"});
        }

        if(password.length < 8)
        {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        if(!/[A-Z]/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one uppercase letter" });
        }

        if(!/\d/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one number" });
        }

        if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        {
            return res.json({ success: false, message: "Password must contain at least one special character" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // now a user is created so we need to store the user

        const newUser = new userModel(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        const user = await newUser.save();
        // as a new user is created it will have a unique id with the help of which we can create the token for their login

        const token = createToken(user._id);
        // _id is auto generated by mongoDB

        res.json({success: true, token});
    }
    catch(error)
    {
        console.log(error);
        return res.json({success: false, message: "Error Creating The User"});
    }
}

// Route for admin login
const adminLogin = async (req,res) =>
{
    try
    {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token, message: "LoggedIn Successfully"});
        }
        else
        {
            res.json({success: false, message: "Invalid Credentials"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: "Error Admin Not Found"});
    }
}

// this might need to change
const getUser = async (req, res) => 
{
  try
  {
    const token = req.headers.token;

    if(!token)
    {
      return res.json({ success: false, message: "Not Authorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user
    const user = await userModel.findById(userId).select("-password"); // exclude password
    if(!user)
    {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  }
  catch(error)
  {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch user" });
  }
};

export { loginUser, registerUser, adminLogin, getUser }
