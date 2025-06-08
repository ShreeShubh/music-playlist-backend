const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/DbConnection")

const authRoutes = require("./routes/authRoutes")
const playlistRoutes = require("./routes/playlistRoutes")
const spotifyRoutes = require("./routes/spotifyRoutes")

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/playlists", playlistRoutes)
app.use("/api/spotify", spotifyRoutes)

// DB connection
const server = () => {
  connectDb()
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
  })
}

server()
