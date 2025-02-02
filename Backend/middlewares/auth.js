import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    // Check if the token exists in cookies
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please log in to access this resource.",
        });
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        console.error("Authentication error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};