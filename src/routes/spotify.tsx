import type { ApiSpotifyCurrentlyPlayingResponse } from "~/types/api";

import { Show, onCleanup, createSignal } from "solid-js";
import { useLocation } from "solid-start";

const spotify_fetcher = async () => {
  console.info("refetching spotify data.");
  const response = await fetch("/api/spotify_currently_playing");
  return await response.json() as ApiSpotifyCurrentlyPlayingResponse;
}

export default function SpotifyPage () {
  const [spotify, setSpotifyData] = createSignal<ApiSpotifyCurrentlyPlayingResponse | null>(null);

  const refetch = async () => {
    try {
      const data = await spotify_fetcher();
      if (!data.success) return;

      setSpotifyData(data);
    }
    catch {
      // Do nothing with data.
    }
  }

  // Run on first mount.
  refetch();

  // Run every 2.5s.
  const interval = setInterval(() => refetch(), 2500);
  onCleanup(() => clearInterval(interval));

  return (
    <div class="flex h-fit max-h-screen w-screen p-4 rounded-2xl"
      style={{
        // "background": "#2E3440",
        
      }}
    >
      <main class="flex gap-12 w-full">
        <Show when={spotify()?.success}>
          <img
            class="rounded-3xl w-auto h-full aspect-square shadow-[12px_12px_0_0_#2E3440]"
            src={spotify()!.data.album_image.url}
            alt={`${spotify()!.data.title} by ${spotify()!.data.artists}`}
          />

          <div class="flex flex-col justify-between w-full overflow-hidden">
            <div class="flex flex-col gap-4">
              <h1 class="text-[#ECEFF4] text-ellipsis whitespace-nowrap overflow-hidden font-medium px-8 py-2 w-full max-w-fit bg-[#2E3440] shadow-[12px_12px_0_0_#88C0D0]"
                style={{ "font-size": "4vw" }}
              >{spotify()!.data.title}</h1>
              <p class="text-[#D8DEE9] text-ellipsis whitespace-nowrap overflow-hidden px-8 py-2 w-full max-w-fit bg-[#2E3440] shadow-[12px_12px_0_0_#5E81AC]"
                style={{ "font-size": "2vw" }}
              >by {spotify()!.data.artists}</p>
            </div>

            <div class="flex-col gap-6">
              <p class="text-[#D8DEE9] font-light opacity-50">progress, in ms: {spotify()!.data.song_progress_ms}/{spotify()!.data.song_duration_ms}.</p>
              <div class="border border-[#4C566A] rounded-lg overflow-hidden">
                <div class="h-4 bg-gradient-to-r from-[#88C0D0] to-[#5E81AC] rounded-r-lg"
                  style={{
                    width: (100 * spotify()!.data.song_progress_ms / spotify()!.data.song_duration_ms) + "%"
                  }}
                />
              </div>
            </div>
          </div>

        </Show>
      </main>
    </div>
  );
}