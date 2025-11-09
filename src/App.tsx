import React, { useEffect, useRef, useState } from "react";
import "./App.css";

/**
 * The Third Icon Studios — Live AI Avatars + Voice Chat (single-file drop-in)
 *
 * Paste this into /src/App.tsx and commit. Works immediately with browser voice TTS/STT.
 *
 * Optional: To use ElevenLabs (better TTS) or a transcription API, supply API keys and
 * uncomment the sections marked "OPTIONAL EXTERNAL TTS/STT" and wire them to your serverless function.
 */

/* ---------------- CONFIG ---------------- */
const SITE_TITLE = "The Third Icon Studios, Media & Entertainment";
const TAGLINE = "From the streets to the streams — music, money, sports, and what’s real.";

const ZENO_EMBED = "https://zenoplay.zenomedia.com/s/6ZNNcd";
const STRIPE_BUY = "https://buy.stripe.com/6oU3cvgJM8U3bwt8QK2wU01";
const STRIPE_SPONSOR = "https://buy.stripe.com/9B6bJ1dxAc6fbwt2sm2wU00";

// 10 avatar images (publicly hosted placeholders). Replace with your avatars / hosted files if desired.
const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop&s=09b37d4c2f4c2a3c3b4f7d8d5a6b9c1f",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format&fit=crop&s=b6aab8fe6b9d1f4e2c7c3d4b5a2f6e98",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80&auto=format&fit=crop&s=2b9e8a3fcb8b9f5c3d4e6f7a8b9c0d1e",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop&s=4d6b1f2a3e9c8b7f6a5d3c2b1e4f0a9b",
  "https://images.unsplash.com/photo-1545996124-0f6a3ac3b6d4?w=900&q=80&auto=format&fit=crop&s=9b4a2f0e1d3c6b7a8f5e4d3c2b1a0f0e",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80&auto=format&fit=crop&s=7c4d3b2a1f0e9d8c6b5a4f3e2d1c0b9a",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format&fit=crop&s=3f6a2e9d4b8c1a7d5e4f3a2b1c0d9e8f",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format&fit=crop&s=8b3c2d1f0e9a7b6c5d4e3f2a1b0c9d8e",
  "https://images.unsplash.com/photo-1546456073-6712f79251bb?w=900&q=80&auto=format&fit=crop&s=6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop&s=09b37d4c2f4c2a3c3b4f7d8d5a6b9c1f"
];

/* ------------- Helper: Browser Speech Support -------------- */
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
const speechSynthesisSupported = typeof window !== "undefined" && "speechSynthesis" in window;

/* --------------------- App --------------------- */
export default function App(): JSX.Element {
  // tokens and state
  const [tokens, setTokens] = useState<number>(300); // initial tokens
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ who: string; text: string }[]>([]);
  const recogRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // prepare SpeechRecognition if available
    if (SpeechRecognition) {
      const r = new SpeechRecognition();
      r.lang = "en-US";
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.onresult = (ev: any) => {
        const text = ev.results[0][0].transcript;
        onUserSpoke(text);
      };
      r.onend = () => {
        setIsListening(false);
      };
      r.onerror = (e: any) => {
        console.warn("SpeechRecognition error", e);
        setIsListening(false);
      };
      recogRef.current = r;
    }
  }, []);

  /* ------------------ Core Voice Flow ------------------
     1) User clicks "Start Voice Chat" → recognition starts (browser)
     2) When speech result arrives -> onUserSpoke(text)
     3) onUserSpoke() -> append to chat, call getAvatarReply()
     4) getAvatarReply() returns text (simulated or via external AI)
     5) speakText() plays audio (browser TTS or external TTS)
     ----------------------------------------------------- */

  function startListening() {
    if (!SpeechRecognition) {
      alert("Voice input not available in this browser. Try Chrome on desktop or Android.");
      return;
    }
    try {
      setTranscript("");
      setIsListening(true);
      recogRef.current.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  }

  async function onUserSpoke(text: string) {
    setTranscript(text);
    setChatHistory((h) => [...h, { who: "you", text }]);

    // simulate token cost for talking
    const cost = 10;
    if (tokens < cost) {
      if (confirm("Not enough tokens. Buy tokens ($5+)?")) window.open(STRIPE_BUY, "_blank");
      return;
    }
    setTokens((t) => t - cost);

    // get avatar reply (can be replaced with a server call to an LLM)
    const replyText = await getAvatarReply(text, selectedAvatar ?? 0);
    setChatHistory((h) => [...h, { who: "avatar", text: replyText }]);

    // speak reply (browser TTS or external TTS)
    await speakText(replyText);
  }

  async function getAvatarReply(userText: string, avatarIndex: number): Promise<string> {
    // Basic heuristic personality replies — replace with LLM call for better results.
    const names = ["Nova", "Icona", "Zara", "Luna", "Kai", "Vera", "Romy", "Sasha", "Mia", "Jade"];
    const persona = names[avatarIndex % names.length];
    // Short simulated reply
    const reply = `${persona}: I heard you — "${userText}". That's fire. Tell me more or ask me to sing a chorus.`;
    // OPTIONAL: here you could call your server-side LLM endpoint and return its text.
    // e.g. const r = await fetch("/api/ai-reply", {method:'POST', body: JSON.stringify({text:userText, persona:persona})});
    return new Promise((res) => setTimeout(() => res(reply), 500));
  }

  async function speakText(text: string) {
    // 1) OPTION: External TTS (ElevenLabs) — higher quality
    // If you set up a server route to call ElevenLabs and return an MP3 URL, call it here.
    // Example (serverless): fetch('/api/eleven-tts', {method:'POST', body: JSON.stringify({text})}) -> returns {url}
    // then set audioRef.current.src = url; audioRef.current.play();

    // 2) FALLBACK: Browser SpeechSynthesis (no keys required)
    if (speechSynthesisSupported) {
      const utter = new SpeechSynthesisUtterance(text);
      // Voice settings for a deeper voice
      utter.rate = 1.0;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      // Optional: pick a voice from available voices
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length) {
        // choose a voice that closely matches - try to find "Google" or "Microsoft" voices
        utter.voice = voices.find((v) => /Google|Microsoft|Alex|Samantha|Daniel/i.test(v.name)) || voices[0];
      }
      window.speechSynthesis.cancel(); // stop previous
      window.speechSynthesis.speak(utter);
      return;
    }

    // 3) If no browser TTS support, fallback to alert
    alert(text);
  }

  /* ---------------- UI Actions ---------------- */
  function openAvatar(i: number) {
    setSelectedAvatar(i);
    setChatHistory([]);
  }

  function closeAvatarModal() {
    setSelectedAvatar(null);
    setChatHistory([]);
  }

  function quickRequestAction(i: number) {
    // Example action: request sing/dance (cost 25 tokens)
    const cost = 25;
    if (tokens < cost) {
      if (confirm("Not enough tokens. Buy tokens?")) window.open(STRIPE_BUY, "_blank");
      return;
    }
    setTokens((t) => t - cost);
    const text = `Requested a special action from avatar #${i + 1}.`;
    setChatHistory((h) => [...h, { who: "you", text }]);
    setTimeout(async () => {
      const reply = await getAvatarReply("Performing action", i);
      setChatHistory((h) => [...h, { who: "avatar", text: reply }]);
      await speakText(reply);
    }, 700);
  }

  /* ---------------- Render ---------------- */
  const avatarNames = ["Nova", "Icona", "Zara", "Luna", "Kai", "Vera", "Romy", "Sasha", "Mia", "Jade"];
  const avatarRoles = ["DJ & Beat Maker","Radio Host","Singer","Fitness DJ","Producer","Host","Model","Voice Actress","MC","Dancer"];

  return (
    <div style={PAGE_STYLES.container}>
      <header style={PAGE_STYLES.header}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={PAGE_STYLES.logo}>IIIΞ</div>
          <div>
            <div style={PAGE_STYLES.title}>{SITE_TITLE}</div>
            <div style={PAGE_STYLES.tagline}>{TAGLINE}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={PAGE_STYLES.sponsorBtn} onClick={() => window.open(STRIPE_SPONSOR, "_blank")}>Sponsor Radio</button>
          <button style={PAGE_STYLES.buyBtn} onClick={() => window.open(STRIPE_BUY, "_blank")}>Buy Credits</button>
        </div>
      </header>

      <main style={PAGE_STYLES.main}>
        {/* Left column: avatars */}
        <section style={PAGE_STYLES.panel}>
          <h3 style={PAGE_STYLES.h3}>🤖 Live AI Avatars</h3>
          <p style={PAGE_STYLES.p}>Tap an avatar to open their live room. Use voice to chat — browser voice works instantly.</p>

          <div style={PAGE_STYLES.avatarsGrid}>
            {AVATAR_IMAGES.map((img, i) => (
              <div key={i} style={PAGE_STYLES.avatarCard}>
                <img src={img} alt={`avatar-${i}`} style={PAGE_STYLES.avatarImg} />
                <div style={{ fontWeight: 800, marginTop: 8 }}>{avatarNames[i]}</div>
                <div style={{ color: "#9aa", fontSize: 13 }}>{avatarRoles[i]}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={PAGE_STYLES.smallBtn} onClick={() => openAvatar(i)}>Open</button>
                  <button style={PAGE_STYLES.actionBtn} onClick={() => quickRequestAction(i)}>Request Action (25)</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right column: Zeno + token balance */}
        <aside style={PAGE_STYLES.side}>
          <div style={{ ...PAGE_STYLES.panel, marginBottom: 12 }}>
            <h4 style={{ margin: 0, fontWeight: 800 }}>🎧 Live — The Block Radio</h4>
            <div style={{ marginTop: 12 }}>
              <iframe title="Zeno Radio" src={ZENO_EMBED} width="100%" height={120} style={{ borderRadius: 8, border: "none" }} />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>{tokens} <span style={{ fontSize: 12, color: "#bcd" }}>Tokens</span></div>
              <button style={PAGE_STYLES.buyBtn} onClick={() => window.open(STRIPE_BUY, "_blank")}>Buy</button>
            </div>
          </div>

          <div style={PAGE_STYLES.panel}>
            <h4 style={{ margin: 0, fontWeight: 800 }}>💎 BarToken Network</h4>
            <p style={{ color: "#9aa", fontSize: 13 }}>NFT drops & Fan ownership — preview below</p>
            <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
              {NFT_PREVIEW.map((n) => (
                <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: "#9aa" }}>{n.price}</div>
                  </div>
                  <button style={PAGE_STYLES.buyNowBtn} onClick={() => window.open(STRIPE_BUY, "_blank")}>Buy</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <footer style={PAGE_STYLES.footer}>
        © {new Date().getFullYear()} The Third Icon Studios · Media & Entertainment — Mr. I Got Bars
      </footer>

      {/* Avatar Modal: live chat */}
      {selectedAvatar !== null && (
        <div style={PAGE_STYLES.modalOverlay} onClick={() => closeAvatarModal()}>
          <div style={PAGE_STYLES.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <img src={AVATAR_IMAGES[selectedAvatar]} alt="avatar" style={{ width: 120, height: 120, borderRadius: 10 }} />
              <div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{avatarNames[selectedAvatar]}</div>
                <div style={{ color: "#9aa", fontSize: 13 }}>{avatarRoles[selectedAvatar]}</div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Live Chat</strong>
              </div>
              <div style={{ maxHeight: 200, overflowY: "auto", background: "#051017", padding: 8, borderRadius: 8 }}>
                {chatHistory.length === 0 && <div style={{ color: "#9aa" }}>No messages yet — press Start Voice Chat to speak.</div>}
                {chatHistory.map((m, idx) => (
                  <div key={idx} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: m.who === "you" ? "#9fb" : "#ffd", fontWeight: 700 }}>{m.who === "you" ? "You" : avatarNames[selectedAvatar]}</div>
                    <div style={{ fontSize: 14 }}>{m.text}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button style={PAGE_STYLES.primaryAction} onClick={() => startListening()} disabled={!SpeechRecognition || isListening}>
                  {isListening ? "Listening..." : "Start Voice Chat"}
                </button>
                <button style={PAGE_STYLES.secondaryAction} onClick={() => { setChatHistory([]); }}>Clear</button>
                <button style={PAGE_STYLES.smallBtn} onClick={() => closeAvatarModal()}>Close</button>
              </div>

              <div style={{ marginTop: 10, color: "#9aa", fontSize: 13 }}>
                Note: Browser voice recognition (SpeechRecognition) works best on Chrome desktop and Android. Speech synthesis (voice playback) uses your browser voices.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- Mock NFT preview (small) ------------------ */
const NFT_PREVIEW = [
  { id: "n1", title: "Icon Estate — Studio Loft", price: "0.05 ETH" },
  { id: "n2", title: "Limited Beat Drop #3", price: "0.02 ETH" },
  { id: "n3", title: "VIP Backstage Pass", price: "$10" },
];

/* -------------------- Styles -------------------- */
const PAGE_STYLES: { [k: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#06070a,#08101a 40%,#07080a)", color: "#eaf2ff", fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, borderBottom: "1px solid rgba(255,255,255,0.03)" },
  logo: { width: 64, height: 46, borderRadius: 10, background: "linear-gradient(135deg,#001 0%,#051425 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00ff90", fontWeight: 900, boxShadow: "0 8px 24px rgba(0,255,144,0.04)" },
  title: { fontSize: 16, fontWeight: 900 },
  tagline: { fontSize: 12, color: "#9bb" },
  sponsorBtn: { background: "linear-gradient(90deg,#ffd166,#ffb85c)", border: "none", padding: "8px 12px", borderRadius: 10, fontWeight: 800, cursor: "pointer" },
  buyBtn: { background: "#00ff90", border: "none", padding: "8px 12px", borderRadius: 10, fontWeight: 800, cursor: "pointer", color: "#001" },
  main: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 14, width: "100%", maxWidth: 1180, margin: "18px auto", padding: "0 12px", alignItems: "start" },
  panel: { padding: 14, borderRadius: 12, background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)", border: "1px solid rgba(255,255,255,0.03)" },
  side: {},
  h3: { margin: 0, fontSize: 16, fontWeight: 800 },
  p: { color: "#9aa", marginTop: 8 },
  avatarsGrid: { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", marginTop: 12 },
  avatarCard: { padding: 10, borderRadius: 12, textAlign: "center", background: "linear-gradient(180deg, rgba(255,255,255,0.01), transparent)" },
  avatarImg: { width: 120, height: 120, objectFit: "cover", borderRadius: 12, boxShadow: "0 8px 20px rgba(0,0,0,0.5)" },
  smallBtn: { background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#dff", padding: "6px 8px", borderRadius: 8, cursor: "pointer" },
  actionBtn: { background: "linear-gradient(90deg,#ff7a7a,#ff3d7a)", border: "none", color: "#fff", padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontWeight: 800 },
  tokenCard: { padding: 10, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 90, textAlign: "center" },
  primaryAction: { background: "linear-gradient(90deg,#7c3aed,#5b21b6)", color: "#fff", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800 },
  secondaryAction: { background: "transparent", color: "#dff", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontWeight: 800 },
  buyNowBtn: { background: "#00ff90", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 900 },
  footer: { padding: 12, textAlign: "center", color: "#9aa", borderTop: "1px solid rgba(255,255,255,0.02)" },
  modalOverlay: { position: "fixed", left: 0, top: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  modal: { background: "#071018", padding: 16, borderRadius: 12, width: "92%", maxWidth: 720, border: "1px solid rgba(255,255,255,0.03)" },
};

/* ------------------ End of File ------------------ */
