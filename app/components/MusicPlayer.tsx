"use client";

import { useEffect, useRef } from "react";

const TRACK_URI = "spotify:track:4weAZ08opTkX3DXGfQQqXx";
const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

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
  }
}

export default function MusicPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hasGesture = false;

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

    window.onSpotifyIframeApiReady = (api) => {
      api.createController(
        container,
        { uri: TRACK_URI, width: "300", height: "152" },
        (createdController) => {
          controllerRef.current = createdController;

          createdController.addListener("ready", () => {
            if (hasGesture) createdController.play();
          });

          createdController.addListener("playback_update", (payload) => {
            if (payload.data.isPaused) {
              listenForGesture();
            } else {
              stopListeningForGesture();
            }
          });
        },
      );
    };

    const existingScript = document.querySelector(
      `script[src="${IFRAME_API_SRC}"]`,
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = IFRAME_API_SRC;
      script.async = true;
      document.body.appendChild(script);
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
