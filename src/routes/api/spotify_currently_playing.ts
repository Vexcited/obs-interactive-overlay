import { json } from "solid-start"
import { getNowPlaying } from "~/utils/spotify";

export const GET = async () => {
  const data = await getNowPlaying();
  console.log(data)

  if (data.status === 204 || data.status > 400) {
    return json({
      success: false,
      message: "Nothing is playing!"
    });
  }
  const song = await data.json();
  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;

  return json({
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
}