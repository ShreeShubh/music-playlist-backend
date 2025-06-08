const axios = require("axios")
const qs = require("qs")

let cachedToken = null
let tokenExpiresAt = null

const getSpotifyToken = async () => {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken
  }

  const data = qs.stringify({ grant_type: "client_credentials" })

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
    }
  )

  cachedToken = response.data.access_token
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 1000
  return cachedToken
}

module.exports = { getSpotifyToken }
