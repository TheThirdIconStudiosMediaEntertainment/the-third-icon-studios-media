import React, { useState } from "react";
import "./App.css";

/**
 * The Third Icon Studios — All-in-one front page
 * Paste this file into: /src/App.tsx
 *
 * Features:
 * - Title / header (The Third Icon Studios, Media & Entertainment)
 * - Mr. I Got Bars (Spotify + Instagram links)
 * - Zeno.fm live embed (your provided stream)
 * - Pre-made avatar cards (hosted images so they appear immediately)
 * - BarToken NFT mock cards + Stripe buy links (user + sponsor)
 * - Token balance and simple actions
 *
 * Replace image URLs in AVATAR_IMAGES or drop files into /public and update paths.
 */

/* ------------------------- Config / Links ------------------------- */
const SITE_TITLE = "The Third Icon Studios, Media & Entertainment";
const TAGLINE = "From the streets to the streams — music, money, sports, and what's real.";

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/1v3l9DRzllNSF2U9hC7Epy?si=chz1iqnVQceUHtguKaM2yg";
const INSTAGRAM = "https://www.instagram.com/mrigotbars_?igsh=MWZiOGxjOWlneTRtdQ%3D%3D&utm_source=qr";
const ZENO_EMBED = "https://zenoplay.zenomedia.com/s/6ZNNcd";

const STRIPE_BUY = "https://buy.stripe.com/6oU3cvgJM8U3bwt8QK2wU01"; // user buy link
const STRIPE_SPONSOR = "https://buy.stripe.com/9B6bJ1dxAc6fbwt2sm2wU00"; // sponsor link

/* Hosted sample avatar images (publicly available placeholder images).
   Replace them with your custom avatar URLs or upload to /public and use /avatar1.png etc. */
const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1622277549788-6d9140f6f4f7?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a6e42f1b22d1b2d2eea2c6c6e1f3d6f",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c7d3c2b1d9f2f4e5b6c1a9d6a7c8f2b",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=bf9d1f4a4b1c2e3d4f5a6b7c8d9e0f11",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
];

/* Mock NFT items */
const NFT_ITEMS = [
  { id: "nft-1", title: "Icon Estate — Studio Loft", price: "0.05 ETH", desc: "Virtual property to host avatar streams." },
  { id: "nft-2", title: "Limited Beat Drop #3", price: "0.02 ETH", desc: "Exclusive producer loop — limited edition." },
  { id: "nft-3", title: "VIP Backstage Pass", price: "$10", desc: "One-on-one chat credit with an AI avatar." },
];

/* ------------------------- App ------------------------- */
export default function App(): JSX.Element {
  // initial tokens for new signups (you requested 200-300; using 300)
  const [tokens, setTokens] = useState<number>(300);
  const [joinedCount, setJoinedCount] = useState<number>(0);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  function openStripe(url: string) {
    window.open(url, "_blank", "noopener");
  }

  function requestAvatarAction(index: number) {
    if (tokens < 10) {
      // prompt buy if low tokens
      const buy = confirm("You need 10 tokens for this action. Buy tokens now?");
      if (buy) openStripe(STRIPE_BUY);
      return;
    }
    setTokens((t) => t - 10);
    alert(`Action requested from avatar #${index + 1} — (simulated).`);
  }

  function joinMovement() {
    setJoinedCount((j) => j + 1);
    setTokens((t) => Math.max(0, t - 5)); // small token usage
    alert("Thanks for joining the movement! (Simulated)");
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={styles.logoBox}>IIIΞ</div>
          <div>
            <div style={styles.siteTitle}>{SITE_TITLE}</div>
            <div style={styles.tagline}>{TAGLINE}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.sponsorBtn} onClick={() => openStripe(STRIPE_SPONSOR)}>Sponsor Radio</button>
          <button style={styles.buyBtn} onClick={() => openStripe(STRIPE_BUY)}>Buy Credits</button>
        </div>
      </header>

      {/* Main */}
      <main style={styles.main}>
        {/* Mr I Got Bars Panel */}
        <section style={styles.panel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={styles.h2}>🎤 Mr. I Got Bars</h2>
              <p style={styles.lead}>Spreading love through music. Tap in, stream, and join the movement.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <a href={SPOTIFY_ARTIST} target="_blank" rel="noreferrer" style={styles.link}>Spotify</a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={styles.link}>Instagram</a>
                <a href="https://www.patreon.com/Mrigotbars" target="_blank" rel="noreferrer" style={styles.link}>Patreon</a>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Spotify embed (fallback to open if embed blocked) */}
              <iframe
                src={"https://open.spotify.com/embed/artist/1v3l9DRzllNSF2U9hC7Epy?utm_source=generator"}
                width="100%"
                height="88"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                style={{ borderRadius: 8, border: "none" }}
                title="Spotify - Mr I Got Bars"
              />
            </div>
          </div>
        </section>

        {/* BarToken & NFTs */}
        <section style={styles.panel}>
          <h3 style={styles.h3}>💎 BarToken Network</h3>
          <p style={styles.p}>Own a piece of the music. Join the GotBarz Network and earn with every beat, bar, and stream.</p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
            <div style={styles.tokenCard}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{tokens}</div>
              <div style={{ fontSize: 12, color: "#b9ccd8" }}>Tokens</div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={styles.primaryAction} onClick={joinMovement}>Join the Movement ({joinedCount})</button>
              <button style={styles.secondaryAction} onClick={() => openStripe(STRIPE_BUY)}>Buy Tokens</button>
            </div>
          </div>

          {/* NFT grid */}
          <div style={styles.grid}>
            {NFT_ITEMS.map((n) => (
              <div key={n.id} style={styles.card}>
                <div style={styles.cardImage}>{n.title.split(" ").slice(0,2).join("\n")}</div>
                <div style={{ fontWeight: 800, marginTop: 8 }}>{n.title}</div>
                <div style={{ color: "#9db", fontSize: 13 }}>{n.desc}</div>
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <button style={styles.smallBtn} onClick={() => setSelectedNFT(n.id)}>View</button>
                  <button style={styles.buyNowBtn} onClick={() => openStripe(STRIPE_BUY)}>Buy / Mint</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Lounge */}
        <section style={styles.panel}>
          <h3 style={styles.h3}>🤖 AI Lounge</h3>
          <p style={styles.p}>Tap any avatar for a quick bio. Ask them to do actions (token cost applies).</p>

          <div style={styles.grid}>
            {AVATAR_IMAGES.map((img, i) => (
              <div key={i} style={styles.avatarCard}>
                <img src={img} alt={`avatar-${i}`} style={styles.avatarImg} />
                <div style={{ fontWeight: 800, marginTop: 8 }}>{["Nova","Icona","Zara","Luna"][i]}</div>
                <div style={{ color: "#9bb", fontSize: 13 }}>{["DJ & Beat Maker","Radio Host","Singer","Fitness DJ"][i]}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button style={styles.smallBtn} onClick={() => setSelectedAvatarIndex(i)}>Open</button>
                  <button style={styles.buyNowBtn} onClick={() => requestAvatarAction(i)}>Talk (10)</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Zeno player */}
        <section style={styles.panel}>
          <h3 style={styles.h3}>🎧 Live — The Block Radio</h3>
          <p style={styles.p}>Live stream powered by Zeno — tap play to listen.</p>
          <div style={{ marginTop: 12 }}>
            <iframe
              title="The Block Radio - Zeno"
              src={ZENO_EMBED}
              width="100%"
              height={140}
              style={{ borderRadius: 8, border: "none" }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>© {new Date().getFullYear()} The Third Icon Studios · Media & Entertainment</div>
        <div style={{ color: "#9fb", marginTop: 6, fontSize: 12 }}>Mr. I Got Bars — stay tuned for more features: live avatars, chat, and Web3 minting.</div>
      </footer>

      {/* Selected Avatar Modal */}
      {selectedAvatarIndex !== null && (
        <div style={styles.modalOverlay} onClick={() => setSelectedAvatarIndex(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={AVATAR_IMAGES[selectedAvatarIndex]} alt="avatar" style={{ width: 120, height: 120, borderRadius: 12 }} />
            <h3 style={{ marginTop: 12 }}>{["Nova","Icona","Zara","Luna"][selectedAvatarIndex]}</h3>
            <p style={{ color: "#bcd" }}>{["Spins late-night lo-fi and exclusive drops.","The voice of The Block — interviews & vibes.","Acoustic sessions and studio previews.","High-energy mixes for training and dance."][selectedAvatarIndex]}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={styles.primaryAction} onClick={() => { requestAvatarAction(selectedAvatarIndex); setSelectedAvatarIndex(null); }}>Request Action (10)</button>
              <button style={styles.secondaryAction} onClick={() => setSelectedAvatarIndex(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* NFT modal */}
      {selectedNFT && (
        <div style={styles.modalOverlay} onClick={() => setSelectedNFT(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 8 }}>{NFT_ITEMS.find(n=>n.id===selectedNFT)?.title}</h3>
            <p style={{ color: "#bcd" }}>{NFT_ITEMS.find(n=>n.id===selectedNFT)?.desc}</p>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button style={styles.buyNowBtn} onClick={() => openStripe(STRIPE_BUY)}>Buy Now</button>
              <button style={styles.smallBtn} onClick={() => setSelectedNFT(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------- Inline styles (keeps paste simple) ------------------------- */
const styles: { [k: string]: React.CSSProperties } = {
  page: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#070809,#0b0f14 40%,#07090b)", color: "#e9f3ff", fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", padding: 16 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.03)" },
  logoBox: { width: 68, height: 50, background: "linear-gradient(135deg,#081018,#001)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, color: "#00ff90", fontWeight: 900, fontSize: 20, boxShadow: "0 6px 18px rgba(0,255,144,0.04)" },
  siteTitle: { fontSize: 16, fontWeight: 800, letterSpacing: 0.3 },
  tagline: { fontSize: 12, color: "#92a3b3" },
  sponsorBtn: { background: "linear-gradient(90deg,#ffd166,#ffb85c)", border: "none", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontWeight: 800, color: "#000" },
  buyBtn: { background: "#00ff90", border: "none", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontWeight: 800, color: "#001" },
  main: { display: "grid", gap: 16, width: "100%", maxWidth: 1120, margin: "20px auto", gridTemplateColumns: "1fr" },
  panel: { background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)", padding: 16, borderRadius: 12, border: "1px solid rgba(255,255,255,0.03)" },
  h2: { margin: 0, fontSize: 18, fontWeight: 800 },
  h3: { margin: 0, fontSize: 16, fontWeight: 800 },
  lead: { color: "#bcd", marginTop: 6 },
  p: { color: "#9fb", marginTop: 8, maxWidth: 900 },
  link: { background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 10, color: "#dff", textDecoration: "none", fontWeight: 700 },
  tokenCard: { padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 96, textAlign: "center" },
  primaryAction: { background: "linear-gradient(90deg,#7c3aed,#5b21b6)", color: "#fff", padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800 },
  secondaryAction: { background: "transparent", color: "#dff", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontWeight: 800 },
  grid: { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 12 },
  card: { padding: 12, borderRadius: 10, background: "linear-gradient(180deg, rgba(255,255,255,0.01), transparent)", border: "1px solid rgba(255,255,255,0.03)", minHeight: 160, display: "flex", alignItems: "center", flexDirection: "column" },
  cardImage: { width: "100%", height: 88, background: "linear-gradient(135deg,#111,#001425)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#8fb", fontWeight: 900 },
  smallBtn: { background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#dff", padding: "6px 8px", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  buyNowBtn: { background: "#00ff90", border: "none", color: "#000", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 900 },
  avatarCard: { padding: 12, borderRadius: 12, display: "flex", alignItems: "center", flexDirection: "column", gap: 8 },
  avatarImg: { width: 120, height: 120, objectFit: "cover", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.4)" },
  footer: { marginTop: 22, color: "#9aa", fontSize: 13, textAlign: "center" },
  modalOverlay: { position: "fixed", left: 0, top: 0, right: 0, bottom: 0, background: "rgba(1,1,1,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  modal: { background: "#071018", padding: 18, borderRadius: 12, width: "92%", maxWidth: 520, border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" },
};
