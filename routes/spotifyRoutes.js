const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const { searchSongs } = require("../controllers/spotifyController")

router.get("/search", auth, searchSongs)

module.exports = router
