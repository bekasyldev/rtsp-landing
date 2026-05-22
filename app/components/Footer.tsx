import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "../[lang]/dictionaries";

type FooterDict = Dictionary["footer"];
type NavDict = Dictionary["nav"];

export default function Footer({ dict, nav }: { dict: FooterDict; nav: NavDict }) {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div>
          <div className="brand">
            <Image src="/logo.svg" alt="Protector AI" width={32} height={28} />
            <span>Protector AI · Stream</span>
          </div>
          <div className="note">
            {dict.note}
            <br />
            ТОО Protector AI, 2026 ©
          </div>
        </div>

        <div className="col">
          <h5>{dict.product}</h5>
          <Link href="#demo">{nav.demo}</Link>
          <Link href="#how">{nav.how}</Link>
          <Link href="#price">{nav.pricing}</Link>
          <Link href="#faq">{nav.faq}</Link>
        </div>

        <div className="col">
          <h5>{dict.information}</h5>
          <a>{dict.docs}</a>
          <a>{dict.privacy}</a>
          <a>{dict.terms}</a>
        </div>

        <div className="col">
          <h5>{dict.contactCol}</h5>
          <a href="tel:+77085968938">+7 708 596 89 38</a>
          <a href="mailto:info@protectorai.kz">info@protectorai.kz</a>
        </div>
      </div>

      <div className="colophon">
        <span>ТОО Protector AI, 2026 © {dict.rights}</span>
        <span>
          <a>{dict.terms}</a> · <a>{dict.privacy}</a>
        </span>
      </div>
    </footer>
  );
}
