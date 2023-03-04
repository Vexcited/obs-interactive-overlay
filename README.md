# OBS Interactive Overlay

> Web sources for my OBS overlay.

You can see a [deployed demo here](https://stream-overlay.vexcited.ml/).

## Public API

You can get direct access to data using the public API under `/api` routes.

### `GET /api/spotify_currently_playing`

Get informations about the currently playing song on Spotify. Used in the `/spotify` page.

## Development

### Get Started

```bash
# Clone
git clone https://github.com/Vexcited/obs-interactive-overlay
cd obs-interactive-overlay

# Install
pnpm install

# Configure environment variables.
cp .env.example .env # .env is not pushed, of course.
# If you need help on those variables, please see next section.

# Start development server.
pnpm dev --open

# Build for production (defaults to Vercel adapter, see `vite.config.ts`)
pnpm build
```

## Spotify Token

> Taken from <https://leerob.io/blog/spotify-api-nextjs>.

- Create a new app in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- Get your *client ID* and *client secret* from that app and fill them into `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` respectively.
- Add `http://localhost:3000` as a redirect URI.

Now that the app is configured, we'll authorize it to get a refresh token.

Go to `https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read` without forgetting to swap that `<CLIENT_ID>` parameter.

You'll be redirected to something like `http://localhost:3000/callback?code=NApCCg..BkWtQ`, save the value of the `code` parameter in that URL.

Now, you'll need to [generate a Base64 encoded string](https://www.base64encode.org/) of this format: `client_id:client_secret`. Just replace the values with the ones we got earlier.

To get our refresh token, we can now simply make a request to Spotify API using this Base64 encoded string.

```bash
curl -H "Authorization: Basic <base64 encoded client_id:client_secret>"
  -d grant_type=authorization_code
  -d code=<code> # Replace with the one we got ealier in the URL parameters.
  -d redirect_uri=http%3A%2F%2Flocalhost:3000
  https://accounts.spotify.com/api/token
```

The response will contain a `refresh_token` that is valid indefinitely unless you revoke access
so we can safely add it to our environment variables, in `SPOTIFY_REFRESH_TOKEN`.
