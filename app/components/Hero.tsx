import {
  PaperPlaneTilt,
  CheckCircle,
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
          </div>
        </div>

      </div>
    </header>
  );
}
