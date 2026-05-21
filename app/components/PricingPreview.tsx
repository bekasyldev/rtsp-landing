import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

const ITEMS = [
  "Публичные ссылки для камер",
  "До 5 одновременных зрителей на камеру",
  "100 stream-hours в месяц на камеру",
  "Личный кабинет со списком камер и статусами",
  "Подключение по белому IP или через WireGuard",
];

export default function PricingPreview() {
  return (
    <section className="section" id="price">
      <h2>
        Простой <span className="accent">тариф</span>
      </h2>
      <p className="sub">
        Один пакет для MVP. Без сложного биллинга — позже добавим тарифы под объёмы.
      </p>

      <div className="price-preview">
        <div className="tier">Basic</div>
        <div className="scope">До 5 активных камер</div>

        <ul>
          {ITEMS.map((item) => (
            <li key={item}>
              <CheckCircle weight="fill" size={18} />
              {item}
            </li>
          ))}
        </ul>

        <div className="btn-row">
          <a href="#contact" className="btn btn-white">
            <PaperPlaneTilt weight="bold" size={14} />
            Оставить заявку
          </a>
          <a
            href="#faq"
            className="btn btn-ghost"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.18)" }}
          >
            Подробнее о лимитах
          </a>
        </div>
      </div>
    </section>
  );
}
