"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import {
  VideoCameraSlash,
  PlayCircle,
  Play,
  ArrowClockwise,
  WarningCircle,
} from "@phosphor-icons/react";
import type { Dictionary } from "../[lang]/dictionaries";

type DemoDict = Dictionary["demo"];

type StreamState = "loading" | "starting" | "live" | "offline" | "error";

const HLS_SRC = "https://stream.rtsp.kz/push_a1b2c3d4e5/index.m3u8";

export default function DemoStream({ dict }: { dict: DemoDict }) {
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
        {dict.h2}<span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="demo-grid">
        <div className="demo-player">
          <video
            ref={videoRef}
            playsInline
            muted
            controls={state === "live"}
            preload="metadata"
          />

          <div className="overlay-tl">
            <span style={{ opacity: 0.85, fontSize: 11 }}>
              DEMO · stream.protectorai.kz/demo
            </span>
          </div>

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
              <div className="overlay-br">{dict.overlayDelay}</div>
            </>
          )}

          {state === "loading" && (
            <div className="state-center">
              <div className="spinner" />
              <div className="ttl">{dict.stateLoadingTitle}</div>
              <div className="sub">{dict.stateLoadingSub}</div>
            </div>
          )}

          {state === "starting" && needsPlay && (
            <div className="state-center">
              <PlayCircle weight="fill" size={44} />
              <div className="ttl">{dict.statePlayTitle}</div>
              <div className="sub">{dict.statePlaySub}</div>
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (v) { v.muted = true; v.play().catch(() => {}); setNeedsPlay(false); }
                }}
              >
                <Play weight="fill" size={14} />
                {dict.statePlayBtn}
              </button>
            </div>
          )}

          {state === "starting" && !needsPlay && (
            <div className="state-center">
              <div className="spinner" />
              <div className="ttl">{dict.stateStartingTitle}</div>
              <div className="sub">{dict.stateStartingSub}</div>
            </div>
          )}

          {state === "offline" && (
            <div className="state-center">
              <VideoCameraSlash size={44} />
              <div className="ttl">{dict.stateOfflineTitle}</div>
              <div className="sub">{dict.stateOfflineSub}</div>
              <button onClick={retry}>
                <ArrowClockwise weight="bold" size={14} />
                {dict.stateRetry}
              </button>
            </div>
          )}

          {state === "error" && (
            <div className="state-center">
              <WarningCircle size={44} />
              <div className="ttl">{dict.stateErrorTitle}</div>
              <div className="sub">{dict.stateErrorSub}</div>
              <button onClick={retry}>
                <ArrowClockwise weight="bold" size={14} />
                {dict.stateRetry}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
