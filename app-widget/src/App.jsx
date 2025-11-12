import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import * as Tone from "tone";
import "animate.css";

export default function App() {
  const [widgetId, setWidgetId] = useState(null);
  const [donation, setDonation] = useState(null);
  const [fade, setFade] = useState("hidden");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("widget_id");
    if (!id) return;
    setWidgetId(id);

    const ws = new WebSocket(
      `wss://tfzpayi2fj.execute-api.us-east-1.amazonaws.com/production?widget_id=${id}`
    );

    ws.onopen = () => console.log("[WebSocket] ✅ Connected:", id);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[DEBUG] Donation:", data);
        setDonation(data);
        playEffects();

        setFade("fade-in");
        setTimeout(() => setFade("fade-out"), 4000);
        setTimeout(() => setDonation(null), 6000);
      } catch (e) {
        console.error("❌ Invalid message", e);
      }
    };

    ws.onclose = () => console.log("[WebSocket] 🔒 Closed");
    ws.onerror = (err) => console.error("[WebSocket] ⚠️ Error:", err);
    return () => ws.close();
  }, []);

  const playEffects = () => {
    try {
      const sound = new Tone.Player("spirit.mp3").toDestination();
      sound.autostart = true;
      const canvas = document.getElementById("preview-confetti-canvas");
      if (canvas) {
        const myConfetti = confetti.create(canvas, { resize: true });
        myConfetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.7 },
          colors: ["#00CFFF", "#FF9500", "#06D6A0", "#FFD166"],
        });
      }
    } catch (err) {
      console.error("⚠️ Failed to play effects:", err);
    }
  };

  if (!widgetId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent text-white text-2xl">
        ❌ Missing widget_id in URL
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-transparent relative overflow-hidden">
      {donation && (
        <div
          className={`flex flex-col items-center justify-center gap-4 text-center transition-opacity duration-1000 ${
            fade === "fade-in"
              ? "opacity-100"
              : fade === "fade-out"
              ? "opacity-0"
              : "opacity-0"
          }`}
        >
          <img
            className="h-[200px] w-auto rounded-2xl animate__animated animate__fadeInDown"
            alt="donation-img"
            src={donation.image}
            style={{
              animationDuration: "1000ms",
              filter: "drop-shadow(rgba(0,0,0,0.6) 0px 4px 6px)",
            }}
          />
          <div
            className="flex flex-col items-center animate__animated animate__fadeInUp"
            style={{ animationDuration: "1000ms" }}
          >
            <div className="mb-2 flex items-end justify-center gap-3">
              <h1
                className="text-4xl font-bold"
                style={{
                  fontFamily: '"IBM Plex Sans Thai"',
                  color: "#fff",
                  filter: "drop-shadow(rgba(0,0,0,0.6) 0px 4px 6px)",
                }}
              >
                <span style={{ color: "#FF9500" }}>
                  {donation.donor_name}
                </span>
                <span> โดเนทมา</span>
              </h1>
              <h1
                className="text-[48px] font-bold text-sky-400"
                style={{
                  fontFamily: '"IBM Plex Sans Thai"',
                  filter: "drop-shadow(rgba(0,0,0,0.6) 0px 4px 6px)",
                }}
              >
                {donation.amount}
                <span>฿</span>
              </h1>
            </div>
            <p
              className="w-[400px]"
              style={{
                fontFamily: '"IBM Plex Sans Thai"',
                fontWeight: 500,
                color: "white",
                fontSize: "24px",
                filter: "drop-shadow(rgba(0,0,0,0.6) 0px 4px 6px)",
              }}
            >
              {donation.message}
            </p>
          </div>
        </div>
      )}
      <canvas
        id="preview-confetti-canvas"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      ></canvas>
    </div>
  );
}
