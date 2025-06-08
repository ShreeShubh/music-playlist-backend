const Playlist = require("../models/playlistModel")

// Get all playlists
const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.find({ userId: req.user.userId })
    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create new playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body
    const playlist = new Playlist({
      name,
      description,
      userId: req.user.userId,
      songs: [],
    })
    await playlist.save()
    res.status(201).json(playlist)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update a playlist
const updatePlaylist = async (req, res) => {
  try {
    const { name, description } = req.body
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { name, description },
      { new: true }
    )
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" })
    res.json(playlist)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update playlist", error: err.message })
  }
}

// Delete a playlist
const deletePlaylist = async (req, res) => {
  try {
    const result = await Playlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    })
    if (!result) return res.status(404).json({ message: "Playlist not found" })
    res.json({ message: "Playlist deleted" })
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete playlist", error: err.message })
  }
}

// Add song to playlist
const addSong = async (req, res) => {
  try {
    const { title, artist, album, spotifyId } = req.body
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" })

    playlist.songs.push({ title, artist, album, spotifyId })
    await playlist.save()

    res.json(playlist)
  } catch (err) {
    res.status(500).json({ message: "Failed to add song", error: err.message })
  }
}

module.exports = {
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
}
