const express = require("express")
const verifyToken = require("../middleware/authMiddleware")
const {
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
} = require("../controllers/playlistController")
const router = express.Router()

router.use(verifyToken)
router.get("/", getPlaylist)
router.post("/", createPlaylist)
router.put("/:id", updatePlaylist)
router.delete("/:id", deletePlaylist)
router.post("/:id/songs", addSong)

module.exports = router
