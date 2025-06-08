const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User registered successfully",
      name: user.name,
      email: user.email,
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "User not found" })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid password" })

    // JWT Token
    const payload = {
      userId: user._id,
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    })

    res.status(200).json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

module.exports = { registerUser, loginUser }
