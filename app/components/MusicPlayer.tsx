"use client";

import { useEffect, useRef } from "react";

const TRACK_URI = "spotify:track:5lm18pjbwdth6ENVllxjfl";

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
  destroy?: () => void;
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

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    __spotifyIframeApi?: SpotifyIframeApi;
    __hadGesture?: boolean;
  }
}

export default function MusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hasGesture = Boolean(window.__hadGesture);

    // Browsers only allow audio after the visitor has interacted with the page,
    // so every tap retries play() until Spotify reports the track is playing.
    function handleGesture() {
      hasGesture = true;
      controllerRef.current?.play();
    }

    function listenForGesture() {
      window.addEventListener("pointerdown", handleGesture);
    }

    function stopListeningForGesture() {
      window.removeEventListener("pointerdown", handleGesture);
    }

    listenForGesture();

    function setup(api: SpotifyIframeApi) {
      api.createController(
        container as HTMLElement,
        { uri: TRACK_URI, width: "300", height: "152" },
        (controller) => {
          controllerRef.current = controller;

          controller.addListener("ready", () => {
            if (hasGesture) controller.play();
          });

          controller.addListener("playback_update", (payload) => {
            if (payload.data.isPaused) {
              listenForGesture();
            } else {
              stopListeningForGesture();
            }
          });
        },
      );
    }

    if (window.__spotifyIframeApi) {
      setup(window.__spotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = setup;
    }

    return () => {
      stopListeningForGesture();
      controllerRef.current?.destroy?.();
    };
  }, []);

  return (
    <div aria-hidden style={{ width: 1, height: 1, overflow: "hidden", opacity: 0 }}>
      <div ref={containerRef} />
    </div>
  );
}
