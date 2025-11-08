import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white font-sans">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        The Block Radio 📻
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center mb-8">
        From the streets to the streams — music, money, sports, and what’s real.
      </p>

      {/* Featured Artist */}
      <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2">🎤 Mr. I Got Bars</h2>
        <p className="text-gray-300 mb-4">
          Spreading love through music. Tap in, stream, and join the movement.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://open.spotify.com/artist/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-xl font-bold transition-all"
          >
            Spotify
          </a>
          <a
            href="https://www.patreon.com/Mrigotbars"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold transition-all"
          >
            Patreon
          </a>
          <a
            href="https://instagram.com/Mrigotbars"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl font-bold transition-all"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* BarToken or engagement feature */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">💎 BarToken Network</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Own a piece of the music. Join the GotBarz Network and earn with every
          beat, bar, and stream.
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-bold transition-all"
        >
          Join the Movement ({count})
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} The Block Radio · Powered by Mr. I Got Bars
      </footer>
    </div>
  );
}

export default App;
