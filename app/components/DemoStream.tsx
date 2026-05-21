"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import {
  VideoCameraSlash,
  PlayCircle,
  Play,
  ArrowClockwise,
  WarningCircle,
  LockSimple,
} from "@phosphor-icons/react";

type StreamState = "loading" | "starting" | "live" | "offline" | "error";

const STATE_ROWS: { id: StreamState; label: string; desc: string }[] = [
  { id: "loading",  label: "loading",         desc: "Загружаем плеер и манифест" },
  { id: "starting", label: "stream starting", desc: "Получаем первые сегменты потока" },
  { id: "live",     label: "live",            desc: "Поток воспроизводится в реальном времени" },
  { id: "offline",  label: "offline",         desc: "Поток сейчас недоступен" },
  { id: "error",    label: "playback error",  desc: "Браузер не смог воспроизвести поток" },
];

const HLS_SRC = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function DemoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [state, setState] = useState<StreamState>("loading");
  const [version, setVersion] = useState(0);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const video = videoRef.current;
    if (!video) return;

    setState("loading");
    setNeedsPlay(false);

    const startingTimer = setTimeout(() => {
      if (!cancelled) setState((s) => (s === "loading" ? "starting" : s));
    }, 900);

    const onPlaying = () => { if (!cancelled) setState("live"); };
    const onWaiting = () => { if (!cancelled) setState((s) => (s === "live" ? "starting" : s)); };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);

    const tryPlay = () => {
      const p = video.play();
      if (p?.catch) {
        p.catch(() => {
          if (!cancelled) { setNeedsPlay(true); setState("starting"); }
        });
      }
    };

    const useNative = video.canPlayType("application/vnd.apple.mpegurl");

    if (useNative) {
      video.src = HLS_SRC;
      tryPlay();
    } else {
      import("hls.js").then(({ default: HlsLib }) => {
        if (cancelled || !HlsLib.isSupported()) { setState("offline"); return; }
        const hls = new HlsLib({
          lowLatencyMode: true,
          backBufferLength: 30,
          liveSyncDuration: 1.5,
          liveMaxLatencyDuration: 6,
        });
        hlsRef.current = hls;
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        hls.on(HlsLib.Events.MANIFEST_PARSED, () => { tryPlay(); });
        hls.on(HlsLib.Events.ERROR, (_, data) => {
          if (!cancelled && data.fatal) {
            setState(data.type === HlsLib.ErrorTypes.NETWORK_ERROR ? "offline" : "error");
          }
        });
      });
    }

    return () => {
      cancelled = true;
      clearTimeout(startingTimer);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch {}
        hlsRef.current = null;
      }
    };
  }, [version]);

  const retry = () => { setState("loading"); setVersion((v) => v + 1); };

  return (
    <section className="section" id="demo">
      <h2>
        Пример онлайн-<span className="accent">трансляции</span>
      </h2>
      <p className="sub">
        Нажмите play и проверьте, как выглядит ссылка, которую получает инспектор.
      </p>

      <div className="demo-grid">
        {/* Player */}
        <div className="demo-player">
          <video
            ref={videoRef}
            playsInline
            muted
            controls={state === "live"}
            preload="metadata"
          />

          {/* Top-left label */}
          <div className="overlay-tl">
            <span style={{ opacity: 0.85, fontSize: 11 }}>
              DEMO · stream.protectorai.kz/demo
            </span>
          </div>

          {/* Top-right badge */}
          <div className="overlay-tr">
            {state === "live"     && <span className="badge live"><span className="pulse" />LIVE</span>}
            {state === "loading"  && <span className="badge loading">LOADING</span>}
            {state === "starting" && <span className="badge starting">STARTING</span>}
            {state === "offline"  && <span className="badge offline">OFFLINE</span>}
            {state === "error"    && <span className="badge error">ERROR</span>}
          </div>

          {state === "live" && (
            <>
              <div className="overlay-bl">1080p · LL-HLS</div>
              <div className="overlay-br">~2 с задержка</div>
            </>
          )}

          {/* State overlays */}
          {state === "loading" && (
            <div className="state-center">
              <div className="spinner" />
              <div className="ttl">Загрузка</div>
              <div className="sub">Подключаемся к серверу потоковой передачи.</div>
            </div>
          )}

          {state === "starting" && needsPlay && (
            <div className="state-center">
              <PlayCircle weight="fill" size={44} />
              <div className="ttl">Нажмите Play, чтобы запустить демо</div>
              <div className="sub">
                Браузер требует подтверждение перед воспроизведением видео.
              </div>
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (v) { v.muted = true; v.play().catch(() => {}); setNeedsPlay(false); }
                }}
              >
                <Play weight="fill" size={14} />
                Воспроизвести
              </button>
            </div>
          )}

          {state === "starting" && !needsPlay && (
            <div className="state-center">
              <div className="spinner" />
              <div className="ttl">Стартуем поток…</div>
              <div className="sub">Получаем первые сегменты от камеры.</div>
            </div>
          )}

          {state === "offline" && (
            <div className="state-center">
              <VideoCameraSlash size={44} />
              <div className="ttl">Поток сейчас недоступен</div>
              <div className="sub">
                Демо-камера временно отключена. Попробуйте обновить через минуту.
              </div>
              <button onClick={retry}>
                <ArrowClockwise weight="bold" size={14} />
                Повторить
              </button>
            </div>
          )}

          {state === "error" && (
            <div className="state-center">
              <WarningCircle size={44} />
              <div className="ttl">Ошибка воспроизведения</div>
              <div className="sub">
                Браузер не смог открыть поток. Это бывает на старых версиях Safari
                или при блокировке сети.
              </div>
              <button onClick={retry}>
                <ArrowClockwise weight="bold" size={14} />
                Повторить
              </button>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="demo-side">
          <h3>Это тот же плеер, что увидит инспектор</h3>
          <p>
            Демо использует то же ядро Low-Latency HLS, что и public live page.
            На лендинге мы проверяем playback, fallback и error states в вашем браузере.
          </p>

          <div className="demo-states">
            {STATE_ROWS.map((row) => (
              <div key={row.id} className={`row ${state === row.id ? "active" : ""}`}>
                <span className="label">{row.label}</span>
                <span className="desc">{row.desc}</span>
              </div>
            ))}
          </div>

          <div className="demo-url">
            <LockSimple weight="fill" size={14} />
            <span>
              <span className="scheme">https://</span>
              stream.protectorai.kz/
              <span className="slug">demo</span>/
              <span className="slug">camera-01</span>
              /live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
