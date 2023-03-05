import type { Component } from "solid-js";
import { A } from "solid-start";

const Link: Component<{
  href: string,
  name: string,
  description: string
}> = (props) => (
  <A href={props.href}>
    <div class="flex flex-col px-4 mr-4 mb-4 py-2 bg-[#434C5E] hover:bg-[#2E3440] shadow-[12px_12px_0_0_#5E81AC]">
      <h2 class="text-[#ECEFF4] font-medium text-lg">
        {props.name}
      </h2>
      <p class="text-[#D8DEE9] font-light text-sm">{props.description}</p>
    </div>
  </A>
);

const BottomLink: Component<{
  href: string,
  name: string,
}> = (props) => (
  <a class="text-[#4C566A] hover:text-[#5E81AC] font-medium transition-colors" href={props.href}>{props.name}</a>
)

export default function Home() {
  return (
    <main class="bg-[#ECEFF4] h-screen flex flex-col gap-8 justify-center items-center p-4">
      <h1 class="text-xl font-medium text-[#2E3440]">Web sources for my OBS overlay.</h1>

      <div class="flex flex-col gap-4">
        <Link href="/spotify" name="Spotify - Currently playing" description="I usually use it with `1300px` of width and `300px` of height." />
      </div>

      <div class="flex gap-6">
        <BottomLink href="https://github.com/Vexcited/obs-interactive-overlay" name="GitHub" />
        <BottomLink href="https://twitch.tv/vexcited" name="Twitch" />
      </div>
    </main>
  );
}
