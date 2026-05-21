"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { Dictionary } from "../[lang]/dictionaries";

type FaqDict = Dictionary["faq"];

export default function Faq({ dict }: { dict: FaqDict }) {
  const [open, setOpen] = useState<number>(0);

  const items = [
    { q: dict.q1, a: dict.a1 },
    { q: dict.q2, a: dict.a2 },
    { q: dict.q3, a: dict.a3 },
    { q: dict.q4, a: dict.a4 },
    { q: dict.q5, a: dict.a5 },
    { q: dict.q6, a: dict.a6 },
    { q: dict.q7, a: dict.a7 },
  ];

  return (
    <section className="section" id="faq">
      <h2>
        {dict.h2} <span className="accent">{dict.h2accent}</span>
      </h2>
      <p className="sub">{dict.sub}</p>

      <div className="faq">
        {items.map((item, i) => (
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
            <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{item.q}</span>
              <CaretDown size={16} />
            </div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
