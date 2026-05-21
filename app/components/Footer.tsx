import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div>
          <div className="brand">
            <Image src="/logo.svg" alt="Protector AI" width={32} height={28} />
            <span>Protector AI · Stream</span>
          </div>
          <div className="note">
            Веб-ссылка на камеру для онлайн-видеонаблюдения производственных
            площадок.
            <br />
            ТОО Protector AI, 2026 ©
          </div>
        </div>

        <div className="col">
          <h5>Продукт</h5>
          <Link href="#demo">Пример трансляции</Link>
          <Link href="#how">Как подключить</Link>
          <Link href="#price">Тарифы</Link>
          <Link href="#faq">FAQ</Link>
        </div>

        <div className="col">
          <h5>Информация</h5>
          <a>Документация</a>
          <a>Политика конфиденциальности</a>
          <a>Условия использования</a>
        </div>

        <div className="col">
          <h5>Связаться</h5>
          <a href="tel:+77085968938">+7 708 596 89 38</a>
          <a href="mailto:info@protectorai.kz">info@protectorai.kz</a>
          <a href="https://t.me/protectorai_kz" target="_blank" rel="noreferrer">
            Telegram-канал
          </a>
        </div>
      </div>

      <div className="colophon">
        <span>ТОО Protector AI, 2026 © Все права защищены</span>
        <span>
          <a>Условия использования</a> · <a>Конфиденциальность</a>
        </span>
      </div>
    </footer>
  );
}
