import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "../[lang]/dictionaries";

type PricingDict = Dictionary["pricing"];

export default function PricingPreview({ dict }: { dict: PricingDict }) {
  const items = [
    dict.item1,
    dict.item2,
    dict.item3,
    dict.item4,
    dict.item5,
  ];

  return (
    <section className="section" id="price">
      <h2>
        {dict.h2} <span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="price-preview">
        <div className="tier">Basic</div>

        <ul>
          {items.map((item) => (
            <li key={item}>
              <CheckCircle weight="fill" size={18} />
              {item}
            </li>
          ))}
        </ul>

        <div className="btn-row">
          <a href="#contact" className="btn btn-white">
            <PaperPlaneTilt weight="bold" size={14} />
            {dict.ctaPrimary}
          </a>
          <a
            href="#faq"
            className="btn btn-ghost"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.18)" }}
          >
            {dict.ctaGhost}
          </a>
        </div>
      </div>
    </section>
  );
}
