import {
  PaperPlaneTilt,
  Play,
  CheckCircle,
  Lock,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "../[lang]/dictionaries";

type HeroDict = Dictionary["hero"];

export default function Hero({ dict }: { dict: HeroDict }) {
  return (
    <header className="hero light">
      <div className="hero-inner">
        <div>
          <span className="hero-eyebrow">
            <span className="dot" />
            {dict.eyebrow}
          </span>

          <h1>
            {dict.h1}{" "}
            <em>{dict.h1em}</em>
          </h1>

          <p className="lede">{dict.lede}</p>

          <p className="trustline">{dict.trustline}</p>

          <div className="hero-bullets">
            {[
              <>
                {dict.bulletLinkPrefix}{" "}
                <code
                  style={{
                    fontFamily: "var(--font-data)",
                    fontSize: 13,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "rgba(83,88,98,0.10)",
                    color: "#535862",
                  }}
                >
                  /&#123;companySlug&#125;/&#123;cameraSlug&#125;/live
                </code>
              </>,
              dict.bullet2,
              dict.bullet3,
              dict.bullet4,
            ].map((text, i) => (
              <div className="hero-bullet" key={i}>
                <CheckCircle
                  weight="fill"
                  size={18}
                  style={{ color: "#287219", flexShrink: 0, marginTop: 1 }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              <PaperPlaneTilt weight="bold" size={16} />
              {dict.ctaPrimary}
            </a>
            <a href="#demo" className="btn btn-ghost">
              <Play weight="bold" size={16} />
              {dict.ctaGhost}
            </a>
          </div>
        </div>

        {/* Hero card — browser mock */}
        <div className="hero-card">
          <div className="browser-mock">
            <div className="browser-bar">
              <div className="dots">
                <span />
                <span />
                <span />
              </div>
              <div className="url">
                <Lock weight="fill" size={12} style={{ color: "#287219" }} />
                <span className="scheme">https://</span>
                ktp.protectorai.kz/shabitex/cex-1/live
              </div>
            </div>

            <div className="browser-content">
              <div className="obj-head">
                <div className="ic">
                  <Buildings size={20} style={{ color: "var(--brand-blue)" }} />
                </div>
                <div>
                  <h5>ТОО «Жасыл Дала» · Цех №1 · Линия розлива</h5>
                  <div className="meta">г. Алматы · Камера активна с 14 мая 2026</div>
                </div>
              </div>

              <div className="player-tile">
                <div
                  className="feed"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(#3A4E66cc, #28384Acc)",
                  }}
                />
                <span className="live-badge">
                  <span className="pulse" />
                  LIVE
                </span>
                <span className="qual">1080p · LL-HLS</span>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--text-3)",
              textAlign: "center",
              padding: "0 8px",
            }}
          >
            {dict.cardCaption}
          </div>
        </div>
      </div>
    </header>
  );
}
