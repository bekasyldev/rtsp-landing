import {
  MagnifyingGlass,
  PlugsConnected,
  Monitor,
  Globe,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "../[lang]/dictionaries";

type OnboardingDict = Dictionary["onboarding"];

export default function Onboarding({ dict }: { dict: OnboardingDict }) {
  const steps = [
    {
      n: "1",
      icon: <MagnifyingGlass size={22} />,
      title: dict.step1Title,
      body: dict.step1Body,
    },
    {
      n: "2",
      icon: <PlugsConnected size={22} />,
      title: dict.step2Title,
      body: dict.step2Body,
    },
    {
      n: "3",
      icon: <Monitor size={22} />,
      title: dict.step3Title,
      body: dict.step3Body,
    },
  ];

  const modes = [
    {
      icon: <Globe size={18} />,
      title: dict.mode1Title,
      body: dict.mode1Body,
    },
    {
      icon: <ShieldCheck size={18} />,
      title: dict.mode2Title,
      body: dict.mode2Body,
    },
    {
      icon: <Monitor size={18} />,
      title: dict.mode3Title,
      body: dict.mode3Body,
    },
  ];

  return (
    <section className="section" id="how">
      <h2>
        {dict.h2} <span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="steps">
        {steps.map((s) => (
          <div className="step" key={s.n}>
            <div className="stepnum">
              <span className="n">{s.n}</span>
              <span className="ic">{s.icon}</span>
            </div>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="conn-modes">
        {modes.map((m) => (
          <div className="conn-mode" key={m.title}>
            <div className="h">
              <span className="ic">{m.icon}</span>
              <h5>{m.title}</h5>
            </div>
            <p>{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
