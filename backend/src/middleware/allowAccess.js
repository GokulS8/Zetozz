const allowAccess = (...roles) => {
  return (req, res, next) => {
    try {
      // Check user existence
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access"
        })
      }

      // Check role existence
      if (!req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Role Not Found"
        })
      }

      // Normalize roles for safety
      const userRole = req.user.role.toLowerCase()
      const allowedRoles = roles.map(role => role.toLowerCase())

      // Verify access
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access Denied for role: ${req.user.role}`
        })
      }

      next()
    } catch (error) {
      console.error("Authorization Error:", error)

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  }
}

module.exports = allowAccess