import { Browser, Broadcast, Headset } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "../[lang]/dictionaries";

type FeaturesDict = Dictionary["features"];

export default function Features({ dict }: { dict: FeaturesDict }) {
  const features = [
    {
      icon: <Browser size={26} />,
      title: dict.feature1Title,
      body: dict.feature1Body,
    },
    {
      icon: <Broadcast size={26} />,
      title: dict.feature2Title,
      body: dict.feature2Body,
    },
    {
      icon: <Headset size={26} />,
      title: dict.feature3Title,
      body: dict.feature3Body,
    },
  ];

  return (
    <section className="section">
      <h2>
        {dict.h2} <span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="features">
        {features.map((f) => (
          <div className="feature" key={f.title}>
            <div className="ic">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
