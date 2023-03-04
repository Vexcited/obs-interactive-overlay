import type { ApiSpotifyCurrentlyPlayingResponse, ApiSpotifyCurrentlyPlayingError } from "~/types/api";
import type { SpotifyNowPlayingResponse } from "~/types/spotify";

import { json } from "solid-start";
import { getNowPlaying } from "~/utils/spotify";

export const GET = async () => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return json<ApiSpotifyCurrentlyPlayingError>({
      success: false,
      message: "Spotify is not playing!",
      debug: { status: response.status }
    });
  }

  const song = await response.json() as SpotifyNowPlayingResponse;

  // Get the biggest image from the `images` array.
  const album_image = song.item.album.images.reduce(
    (a, b) => Math.max(a.height, a.width) > Math.max(b.height, b.width) ? a : b
  );

  // Merge every artists of the song into a single string.
  const artists = song.item.artists.map((_artist) => _artist.name).join(", ");

  return json<ApiSpotifyCurrentlyPlayingResponse>({
    success: true,
    data: {
      url: song.item.external_urls.spotify,
      album_image,
      
      is_playing: song.is_playing,
      
      title: song.item.name,
      artists,
  
      song_duration_ms: song.item.duration_ms,
      song_progress_ms: song.progress_ms
    }
  });
}
