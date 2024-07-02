// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel")
// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader =
//       req.headers["Authorization"] || req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).json("token is required");
//     }

//     const token = authHeader.split(" ")[1];
//     const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await userModel.findById(currentUser.userId).select('-password');
//     user = req.user;
//     console.log("currentUser ", currentUser);
//     console.log("req.user ",user);
//     console.log("currentUser ", currentUser.isAdmin);

//     next();
//   } catch (err) {
//     return res.status(401).json("Invalid Token");
//   }
// };

// module.exports = verifyToken

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json("token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};

module.exports = verifyToken;

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel")
// const httpStatusText = require("../utils/httpStatusText")
// // User must be authenticated
// const verifyToken = async (req, res, next) => {
//   try{
//   // Read JWT from the 'jwt' cookie
//   let token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       req.user = await User.findById(decoded.userId).select('-password');
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }}catch(err){
// res.status(401).json({status:httpStatusText.FAIL,message:err.message})

//   }
// };
// module.exports = verifyToken
// // const verifyToken = (req,res,next)=>{
// //     try{
// // const authHeader = req.c['Authorization']||req.headers['authorization']
// // if(!authHeader){
// // return res.status(401).json("token is required");
// // }

// // const token = authHeader.split(" ")[1]
// // const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY)
// // console.log("currentUser ",currentUser);
// // next()
// // }catch(err){
// //   return   res.status(401).json("Invalid Token")

// // }
// // }
