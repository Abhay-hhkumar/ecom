import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {

    // we also send 'JWT_SECRET' key to make our token
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ 
      success: false,
      message: "Get login",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({ 
        success: false,
        message: "Only admin can access",
      });
    } else {
      next();
    }
  } catch (error) {
    
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};