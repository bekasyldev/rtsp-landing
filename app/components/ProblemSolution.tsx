import type { Dictionary } from "../[lang]/dictionaries";

type PSDict = Dictionary["problemSolution"];

export default function ProblemSolution({ dict }: { dict: PSDict }) {
  return (
    <section className="section">
      <h2>
        {dict.h2} <span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="ps-grid">
        <div className="ps-card problem">
          <span className="tag">{dict.problemTag}</span>
          <h3>{dict.problemH3}</h3>
          <p>{dict.problemP}</p>
          <div className="visual">
            <span>
              <span className="err">✗</span>{"  "}
              rtsp://192.168.1.42:554/Channel/101
            </span>
            <span style={{ color: "var(--text-3)" }}>
              ↳ {dict.problemVisualErr}
            </span>
          </div>
        </div>

        <div className="ps-card solution">
          <span className="tag">{dict.solutionTag}</span>
          <h3>{dict.solutionH3}</h3>
          <p>{dict.solutionP}</p>
          <div className="visual">
            <span>
              <span className="ok">✓</span>{"  "}
              https://ktp.protectorai.kz/shabitex/cex-1/live
            </span>
            <span style={{ color: "var(--text-3)" }}>
              ↳ <span className="ok">{dict.solutionVisualOk}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
