"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import type { Dictionary } from "../[lang]/dictionaries";

type NavDict = Dictionary["nav"];

const LANG_LABELS: Record<string, string> = { ru: "RU", en: "EN", kk: "KK" };

export default function Nav({ dict, lang }: { dict: NavDict; lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="nav">
        <div className="nav-left">
          <Image src="/logo.svg" alt="Protector AI" width={36} height={32} />
          <span className="name">
            Protector AI{" "}
            <span className="grey">· Stream</span>
          </span>
        </div>

        <nav className="nav-links">
          <Link href="#demo">{dict.demo}</Link>
          <Link href="#how">{dict.how}</Link>
          <Link href="#price">{dict.pricing}</Link>
          <Link href="#faq">{dict.faq}</Link>
        </nav>

        <div className="nav-cta">
          <div className="lang-switcher">
            {(["ru", "en", "kk"] as const).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`lang-btn${lang === l ? " active" : ""}`}
              >
                {LANG_LABELS[l]}
              </Link>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm">{dict.signIn}</button>
          <Link href="#contact" className="btn btn-sm btn-primary">
            {dict.cta}
          </Link>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={dict.menuLabel}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-menu">
          <Link href="#demo" onClick={() => setOpen(false)}>{dict.demo}</Link>
          <Link href="#how" onClick={() => setOpen(false)}>{dict.how}</Link>
          <Link href="#price" onClick={() => setOpen(false)}>{dict.pricing}</Link>
          <Link href="#faq" onClick={() => setOpen(false)}>{dict.faq}</Link>
          <div className="nav-mobile-ctas">
            <div className="lang-switcher">
              {(["ru", "en", "kk"] as const).map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`lang-btn${lang === l ? " active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {LANG_LABELS[l]}
                </Link>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm">{dict.signIn}</button>
            <Link href="#contact" className="btn btn-sm btn-primary" onClick={() => setOpen(false)}>
              {dict.cta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
