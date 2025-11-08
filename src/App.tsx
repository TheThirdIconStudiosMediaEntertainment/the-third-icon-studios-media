import React from 'react';
import "./App.css";
import BarToken from "./BarToken";
import MusicHub from "./MusicHub";
import BlockRadio from "./BlockRadio";

function App() {
  return (
    <div style={{ padding: 30 }}>
      <h1>The Third Icon Studios Media Network 🎶</h1>
      <p>Choose an experience:</p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div className="card">
          <h2>🎧 Music Hub</h2>
          <MusicHub />
        </div>

        <div className="card">
          <h2>💰 BarToken</h2>
          <BarToken />
        </div>

        <div className="card">
          <h2>📻 Block Radio</h2>
          <BlockRadio />
        </div>
      </div>
    </div>
  );
}

export default App;
