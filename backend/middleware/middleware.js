import jwt from "jsonwebtoken";

export const authorizeUser = async (req, res, next) => {
  try {
    // Extract the authorization header (optional)
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing authorization header",
      });
    }

    // Split the header to separate scheme and token (if present)
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // Extract the token from the second part
    const token = parts[1];
    console.log(token);
    const secretKey = process.env.SECRET_KEY;

    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing jwt payload",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
