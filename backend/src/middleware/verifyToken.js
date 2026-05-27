const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  try {
    console.log(true)
    // Get authorization header
    const authHeader = req.headers.authorization

    // Check token existence
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      })
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      })
    }

    // Extract token
    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // Attach user data
    req.user = decoded
    console.log(req.user)
    next()
  } catch (error) {
    // Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      })
    }

    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Invalid token"
      })
    }

    // Server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

module.exports = verifyToken