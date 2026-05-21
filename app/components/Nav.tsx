import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
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
    </div>
  );
}
