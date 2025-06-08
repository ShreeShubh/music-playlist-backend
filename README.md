
## `Music Playlist Backend`

````md
# 🎵 Music Playlist Backend

This is the backend server for the Music Playlist Management System, built with Node.js, Express, and MongoDB. It supports user authentication, playlist creation, song management, and Spotify song search.

---

## Features

- User registration & login with JWT authentication
- Create, update, and delete playlists
- Add/remove songs to/from playlists
- Search songs from Spotify (via their API)
- RESTful API with JSON responses
- Secured with middleware & token verification

---

## Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JWT for Auth
- Axios for HTTP requests (e.g., to Spotify)
- dotenv for environment variables

---

## Installation

```bash
git clone https://github.com/ShreeShubh/music-playlist-backend.git
cd music-playlist-backend
npm install
````

---

## Environment Variables

Create a `.env` file at the root and add the following:

```env
PORT=5001
CONNECTION_STRING=your-mongodb-connection-string
ACCESS_TOKEN_SECRET=your_jwt_secret_key

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=https://example.com/callback
```

---

## Run Locally

```bash
npm run dev
```

> This starts the server on `http://localhost:5001`.

---

## API Endpoints

### Auth

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Login and receive a token

### Playlists (Protected)

* `GET /api/playlists` — Get all playlists for user
* `POST /api/playlists` — Create new playlist
* `PUT /api/playlists/:id` — Update playlist
* `DELETE /api/playlists/:id` — Delete playlist
* `POST /api/playlists/:id/songs` — Add a song

### Spotify Search

* `GET /api/spotify/search?q=QUERY` — Search for songs

---

## Deploy on Render (Steps)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New → Web Service**
3. Connect your GitHub repo
4. Use the following settings:

   * **Environment**: Node
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
   * **Environment Variables**: (Add `.env` values here)
5. Click **Deploy**

> 🔁 It will auto-deploy on every push to your main branch.

---

## 🔐 JWT Auth Middleware

All `/api/playlists` and `/api/spotify` routes are protected using a middleware that checks the `Authorization` header:

```http
Authorization: Bearer <your-token>
```

---
