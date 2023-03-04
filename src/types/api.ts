export interface ApiSpotifyCurrentlyPlayingError {
  success: false;
  message: string;
  debug: { status: number }
}

export interface ApiSpotifyCurrentlyPlayingResponse {
  success: true,
  data: {
    url: string,
    album_image: {
      width: number;
      height: number;
      url: string;
    }

    is_playing: boolean;

    title: string;
    artists: string;

    song_duration_ms: number;
    song_progress_ms: number;
  }
}