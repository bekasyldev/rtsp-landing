"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

export default function Nav() {
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
          <Link href="#demo">Пример трансляции</Link>
          <Link href="#how">Как подключить</Link>
          <Link href="#price">Тарифы</Link>
          <Link href="#faq">FAQ</Link>
        </nav>

        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm">Войти</button>
          <Link href="#contact" className="btn btn-sm btn-primary">
            Оставить заявку
          </Link>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-menu">
          <Link href="#demo" onClick={() => setOpen(false)}>Пример трансляции</Link>
          <Link href="#how" onClick={() => setOpen(false)}>Как подключить</Link>
          <Link href="#price" onClick={() => setOpen(false)}>Тарифы</Link>
          <Link href="#faq" onClick={() => setOpen(false)}>FAQ</Link>
          <div className="nav-mobile-ctas">
            <button className="btn btn-ghost btn-sm">Войти</button>
            <Link href="#contact" className="btn btn-sm btn-primary" onClick={() => setOpen(false)}>
              Оставить заявку
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
