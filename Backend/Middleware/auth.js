// this is for cart authorization

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) =>
{
    const { token } = req.headers;

    if(!token)
    {
        return res.json({success: false, message: "Not Authorized Login Again"});
    }

    try
    {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded_token.id;
        next();
    }
    catch(error)
    {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export default authUser;

// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) =>
// {
//     try
//     {
//         const token = req.headers.authorization?.split(" ")[1] || req.headers.token;

//         if(!token)
//         {
//             return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = { _id: decoded.id };  // ✅ attach user properly
//         next();
//     }
//     catch(error)
//     {
//         console.log("Auth error:", error);
//         res.status(401).json({ success: false, message: "Invalid or expired token" });
//     }
// };

// export default authUser;