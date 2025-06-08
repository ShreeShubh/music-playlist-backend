const axios = require("axios")
const { getSpotifyToken } = require("../utils/spotifyAuth")

exports.searchSongs = async (req, res) => {
  try {
    const q = req.query.q
    if (!q) return res.status(400).json({ message: "Missing query" })

    const token = await getSpotifyToken()

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q,
        type: "track",
        limit: 10,
      },
    })

    const tracks = response.data.tracks.items.map((track) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      spotifyId: track.id,
    }))

    res.json(tracks)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Spotify search failed", error: err.message })
  }
}
