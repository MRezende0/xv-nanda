"use client";

import { useEffect, useRef } from "react";

const TRACK_URI = "spotify:track:5lm18pjbwdth6ENVllxjfl";
// How long before the preview ends the next player instance starts loading.
const STANDBY_LEAD_MS = 6000;
const END_TOLERANCE_MS = 150;
// A play() the browser blocks stays silent instead of reporting an error, and
// Spotify still announces position 0 as if it were playing. Anything that has
// not advanced by now was blocked, so go back to waiting for a tap.
const PLAY_TIMEOUT_MS = 2500;
const GESTURES = ["pointerdown", "touchstart", "click", "keydown"] as const;

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
  lastPosition: number;
  destroy: () => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    __spotifyIframeApi?: SpotifyIframeApi;
  }
}

export default function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let current: Player | null = null;
    let standby: Player | null = null;
    let playTimer: ReturnType<typeof setTimeout> | undefined;

    function listenForGesture() {
      GESTURES.forEach((event) => window.addEventListener(event, handleGesture));
    }

    function stopListeningForGesture() {
      GESTURES.forEach((event) => window.removeEventListener(event, handleGesture));
    }

    function play(player: Player) {
      player.wantsPlay = true;
      if (!player.ready) return;
      player.controller?.play();
      clearTimeout(playTimer);
      playTimer = setTimeout(listenForGesture, PLAY_TIMEOUT_MS);
    }

    function handleGesture() {
      if (current) play(current);
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
            if (player.wantsPlay) play(player);
          });

          controller.addListener("playback_update", ({ data }) => {
            if (player !== current) return;

            const playing = !data.isPaused && data.duration > 0 && data.position > 0;
            if (playing) {
              clearTimeout(playTimer);
              stopListeningForGesture();
              player.lastPosition = data.position;
            } else if (data.isPaused) {
              listenForGesture();
            }

            if (data.duration <= 0) return;

            const atEnd = data.position >= data.duration - END_TOLERANCE_MS;
            const stoppedAtEnd = data.isPaused && player.lastPosition >= data.duration - 2000;
            if (atEnd || stoppedAtEnd) {
              swapToStandby(api);
              return;
            }

            if (playing && !standby && data.duration - data.position <= STANDBY_LEAD_MS) {
              standby = createPlayer(api);
            }
          });
        },
      );

      return player;
    }

    function swapToStandby(api: SpotifyIframeApi) {
      const finished = current;
      current = standby ?? createPlayer(api);
      standby = null;
      finished?.destroy();
      play(current);
    }

    function start(api: SpotifyIframeApi) {
      current = createPlayer(api);
      play(current);
    }

    listenForGesture();

    if (window.__spotifyIframeApi) {
      start(window.__spotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = start;
    }

    return () => {
      clearTimeout(playTimer);
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
