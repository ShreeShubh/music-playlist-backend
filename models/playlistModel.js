const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  spotifyId: String,
})

const playlistSchema = mongoose.Schema({
  name: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [songSchema],
})

module.exports = mongoose.model("Playlist", playlistSchema)
