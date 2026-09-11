import type { Metadata } from "next";
import { Alex_Brush, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { preconnect } from "react-dom";
import "./globals.css";

const scriptFont = Alex_Brush({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Hosts the Spotify embed hits on load and on first play (API, iframe, artwork, DRM handshake).
const SPOTIFY_HOSTS = [
  "https://open.spotify.com",
  "https://embed-cdn.spotifycdn.com",
  "https://image-cdn-fa.spotifycdn.com",
  "https://apresolve.spotify.com",
  "https://spclient.wg.spotify.com",
];

// Runs before hydration: keeps the Spotify API once it loads and remembers a tap
// that happens before React attaches its own listeners.
const spotifyBootstrap = `
window.onSpotifyIframeApiReady = function (api) { window.__spotifyIframeApi = api; };
window.addEventListener("pointerdown", function () { window.__hadGesture = true; }, { once: true, capture: true });
`;

export const metadata: Metadata = {
  title: "Maria Fernanda | XV Anos",
  description:
    "Com muita alegria convido você para celebrar comigo os meus 15 anos, dia 06.11.2026 em Chos Malal.",
  openGraph: {
    title: "Maria Fernanda | XV Anos",
    description:
      "Com muita alegria convido você para celebrar comigo os meus 15 anos, dia 06.11.2026 em Chos Malal.",
    images: ["/capa-v3.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  SPOTIFY_HOSTS.forEach((host) => preconnect(host));

  return (
    <html
      lang="pt-BR"
      className={`${scriptFont.variable} ${serifFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-serif">
        {children}
        <Script id="spotify-bootstrap" strategy="beforeInteractive">
          {spotifyBootstrap}
        </Script>
        <Script
          src="https://open.spotify.com/embed/iframe-api/v1"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
