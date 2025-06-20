const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]

  if (!token)
    return res.status(401).json({ message: "Access denied, no token provided" })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" })
  }
}

module.exports = verifyToken
