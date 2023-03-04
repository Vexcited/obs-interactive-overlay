export interface SpotifyNowPlayingResponse {
  timestamp: number;

  context: {
    external_urls: {
      spotify: string;
    }

    uri: string;
    href: string;
    type: "playlist";
  }

  progress_ms: number;

  item: {
    album: {
      album_type: "single" | "album";
      artists: {
        external_urls: {
          spotify: string;
        }

        id: string;
        name: string;
        href: string;
        uri: string;
        type: "artist";
      }[];

      available_markets: string[];

      external_urls: {
        spotify: string;
      }

      href: string;
      id: string;
      images: {
        height: number;
        width: number;
        url: string;
      }[];

      name: string;
      release_date: string;
      release_date_precision: "day";

      total_tracks: number;
      type: "album";
      uri: string;
    }

    artists: {
      external_urls: {
        spotify: string;
      }

      href: string;
      id: string;
      name: string;
      type: "artist";
      uri: string;
    }[];

    available_markets: string[];

    external_ids: {
      isrc: string;
    }

    external_urls: {
      spotify: string;
    }

    explicit: boolean;
    duration_ms: number;
    is_local: boolean;
    name: string;
    id: string;
    
    href: string;
    disc_number: number;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
  }

  currently_playing_type: "track";
  is_playing: boolean;
}