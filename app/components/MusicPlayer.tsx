"use client";

import { useEffect, useRef } from "react";

const TRACK_URI = "spotify:track:5lm18pjbwdth6ENVllxjfl";
// How long before the preview ends the next player instance starts loading.
const STANDBY_LEAD_MS = 6000;
// Position updates arrive about once a second, so the handoff is scheduled from
// the last update before the end, minus the time a fresh instance takes to sound.
const HANDOFF_WINDOW_MS = 1500;
const START_LATENCY_MS = 300;
const END_TOLERANCE_MS = 150;

type SpotifyPlaybackUpdate = {
  data: {
    isPaused: boolean;
    isBuffering: boolean;
    duration: number;
    position: number;
  };
};

type SpotifyEmbedController = {
  play: () => void;
  destroy: () => void;
  addListener: (
    event: "ready" | "playback_update",
    callback: (payload: SpotifyPlaybackUpdate) => void,
  ) => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

type Player = {
  controller: SpotifyEmbedController | null;
  ready: boolean;
  wantsPlay: boolean;
  playing: boolean;
  lastPosition: number;
  destroy: () => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    __spotifyIframeApi?: SpotifyIframeApi;
    __hadGesture?: boolean;
  }
}

export default function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let hasGesture = Boolean(window.__hadGesture);
    let current: Player | null = null;
    let standby: Player | null = null;
    let handoffTimer: ReturnType<typeof setTimeout> | undefined;

    function listenForGesture() {
      window.addEventListener("pointerdown", handleGesture);
    }

    function stopListeningForGesture() {
      window.removeEventListener("pointerdown", handleGesture);
    }

    function play(player: Player) {
      player.wantsPlay = true;
      if (player.ready) player.controller?.play();
    }

    // Browsers only allow audio after the visitor has interacted with the page,
    // so every tap retries play() until Spotify reports the track is playing.
    function handleGesture() {
      hasGesture = true;
      if (current && !current.playing) play(current);
    }

    // The anonymous preview plays once per embed instance, so a fresh iframe is
    // what brings it back. The page keeps its user activation, so the new
    // instance may start on its own.
    function createPlayer(api: SpotifyIframeApi): Player {
      const target = document.createElement("div");
      host!.appendChild(target);

      const player: Player = {
        controller: null,
        ready: false,
        wantsPlay: false,
        playing: false,
        lastPosition: 0,
        destroy() {
          player.controller?.destroy();
          target.remove();
        },
      };

      api.createController(
        target,
        { uri: TRACK_URI, width: "300", height: "152" },
        (controller) => {
          player.controller = controller;

          controller.addListener("ready", () => {
            player.ready = true;
            if (player.wantsPlay) controller.play();
          });

          controller.addListener("playback_update", ({ data }) => {
            player.playing = !data.isPaused;
            if (player !== current) return;

            const nearEnd = data.duration > 0 && data.position >= data.duration - END_TOLERANCE_MS;
            const stoppedAtEnd =
              data.isPaused && data.duration > 0 && player.lastPosition >= data.duration - 2000;

            if (nearEnd || stoppedAtEnd) {
              swapToStandby(api);
              return;
            }

            if (data.isPaused) {
              listenForGesture();
              return;
            }

            stopListeningForGesture();
            player.lastPosition = data.position;
            if (data.duration <= 0) return;

            const remaining = data.duration - data.position;
            if (!standby && remaining <= STANDBY_LEAD_MS) {
              standby = createPlayer(api);
            }
            if (standby && !standby.wantsPlay && remaining <= HANDOFF_WINDOW_MS) {
              const next = standby;
              clearTimeout(handoffTimer);
              handoffTimer = setTimeout(
                () => play(next),
                Math.max(0, remaining - START_LATENCY_MS),
              );
            }
          });
        },
      );

      return player;
    }

    function swapToStandby(api: SpotifyIframeApi) {
      clearTimeout(handoffTimer);
      const finished = current;
      current = standby ?? createPlayer(api);
      standby = null;
      finished?.destroy();
      if (!current.wantsPlay) play(current);
    }

    function start(api: SpotifyIframeApi) {
      current = createPlayer(api);
      if (hasGesture) play(current);
    }

    listenForGesture();

    if (window.__spotifyIframeApi) {
      start(window.__spotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = start;
    }

    return () => {
      clearTimeout(handoffTimer);
      stopListeningForGesture();
      current?.destroy();
      standby?.destroy();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{ width: 1, height: 1, overflow: "hidden", opacity: 0 }}
    />
  );
}
