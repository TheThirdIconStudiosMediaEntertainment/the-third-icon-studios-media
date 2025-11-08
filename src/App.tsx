import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      <header className="p-6 text-center border-b border-gray-800">
        <h1 className="text-4xl font-bold mb-2">🎵 Mr. I Got Bars</h1>
        <p className="text-gray-400 italic">
          “From the streets to the streams — music, money, sports, and what’s real.”
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://open.spotify.com/artist/1v3l9DRzllNSF2U9hC7Epy?si=chz1iqnVQceUHtguKaM2yg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500"
          >
            🎧 Listen on Spotify
          </a>
          <a
            href="https://www.instagram.com/mrigotbars_?igsh=MWZiOGxjOWlneTRtdQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-500"
          >
            📸 Follow on Instagram
          </a>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center space-x-6 mt-6 border-b border-gray-800 pb-4">
        <button
          onClick={() => setActiveTab("home")}
          className={`${
            activeTab === "home" ? "text-yellow-400" : "text-gray-400"
          } hover:text-white`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("radio")}
          className={`${
            activeTab === "radio" ? "text-yellow-400" : "text-gray-400"
          } hover:text-white`}
        >
          The Block Radio
        </button>
        <button
          onClick={() => setActiveTab("token")}
          className={`${
            activeTab === "token" ? "text-yellow-400" : "text-gray-400"
          } hover:text-white`}
        >
          BarToken Hub
        </button>
      </nav>

      {/* Page Sections */}
      <main className="p-8 text-center">
        {activeTab === "home" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">🔥 Latest Drops</h2>
            <iframe
              src="https://open.spotify.com/embed/artist/1v3l9DRzllNSF2U9hC7Epy?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
            <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
              Mr. I Got Bars — spreading love through music. Tap in with the movement
              and be part of the next wave connecting fans, creators, and blockchain ownership.
            </p>
          </div>
        )}

        {activeTab === "radio" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">🎙 The Block Radio</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              From the streets to the streams — your spot for music, money, sports,
              and what’s real. Tune in weekly for artist interviews, fan call-ins,
              and exclusive tracks from Mr. I Got Bars.
            </p>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Now Streaming:</h3>
              <audio controls className="w-full">
                <source src="/audio/sample-radio-show.mp3" type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        )}

        {activeTab === "token" && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">💎 BarToken / GotBarz Network</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Own a piece of the music experience. BarToken lets fans earn rewards,
              access collectibles, and join exclusive events — powered by blockchain technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">🎵 Fan Access Pass</h3>
                <p className="text-gray-400">
                  Unlock behind-the-scenes content and limited music drops.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">💰 Earn with Engagement</h3>
                <p className="text-gray-400">
                  Earn BarToken rewards by streaming, sharing, and supporting artists.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">🌍 Community</h3>
                <p className="text-gray-400">
                  Join the GotBarz Network — a movement connecting artists and fans
                  through blockchain ownership.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">🚀 Coming Soon</h3>
                <p className="text-gray-400">
                  NFT collectibles and digital access drops powered by $BARS token.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-gray-500 text-sm text-center p-6 border-t border-gray-800 mt-8">
        © 2025 The Third Icon Studios Media — Built for Mr. I Got Bars
      </footer>
    </div>
  );
}

export default App;
