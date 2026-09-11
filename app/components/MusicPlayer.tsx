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
  pause: () => void;
  resume: () => void;
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
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hasConfirmedPlay = false;

    function startPlayback() {
      const controller = controllerRef.current;
      if (!controller || hasConfirmedPlay) return;
      if (hasStartedRef.current) {
        controller.resume();
      } else {
        hasStartedRef.current = true;
        controller.play();
      }
    }

    function removeGestureListeners() {
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("touchstart", startPlayback);
    }

    window.addEventListener("pointerdown", startPlayback);
    window.addEventListener("touchstart", startPlayback);

    window.onSpotifyIframeApiReady = (api) => {
      api.createController(
        container,
        { uri: TRACK_URI, width: "300", height: "152" },
        (createdController) => {
          controllerRef.current = createdController;

          createdController.addListener("ready", startPlayback);

          createdController.addListener("playback_update", (payload) => {
            if (!payload.data.isPaused) {
              hasConfirmedPlay = true;
              removeGestureListeners();
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
      removeGestureListeners();
      controllerRef.current?.destroy?.();
    };
  }, []);

  return (
    <div aria-hidden style={{ width: 1, height: 1, overflow: "hidden", opacity: 0 }}>
      <div ref={containerRef} />
    </div>
  );
}
