const getEnvironmentVariables = () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Missing environment variables. Please, add them to your .env and restart the server.");
  }

  return {
    client_id,
    client_secret,
    refresh_token
  }
}

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
 
const getAccessToken = async () => {
  const secrets = getEnvironmentVariables();
  const authorization = Buffer.from(`${secrets.client_id}:${secrets.client_secret}`).toString('base64');

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", secrets.refresh_token);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body
  });
  
  return response.json();
};


export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
};