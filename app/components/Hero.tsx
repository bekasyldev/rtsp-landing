import {
  PaperPlaneTilt,
  Play,
  CheckCircle,
  Lock,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

export default function Hero() {
  return (
    <header className="hero light">
      <div className="hero-inner">
        <div>
          <span className="hero-eyebrow">
            <span className="dot" />
            Облачное видеонаблюдение производственных площадок
          </span>

          <h1>
            Веб-ссылка на камеру для проверки{" "}
            <em>производства</em>
          </h1>

          <p className="lede">
            Подключаем камеру или видеорегистратор и выдаем публичную ссылку,
            которую инспектор открывает в браузере без установки программ.
          </p>

          <p className="trustline">
            Подходит для онлайн-видеонаблюдения производственных площадок
            и передачи ссылки проверяющим органам.
          </p>

          <div className="hero-bullets">
            {[
              <>
                Публичная ссылка вида{" "}
                <code
                  style={{
                    fontFamily: "var(--font-data)",
                    fontSize: 13,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "rgba(44,144,234,0.10)",
                    color: "var(--brand-blue)",
                  }}
                >
                  /&#123;companySlug&#125;/&#123;cameraSlug&#125;/live
                </code>
              </>,
              "Просмотр в браузере без RTSP-плееров",
              "Низкая задержка через Low-Latency HLS",
              "Подключение по белому IP или через WireGuard",
            ].map((text, i) => (
              <div className="hero-bullet" key={i}>
                <CheckCircle
                  weight="fill"
                  size={18}
                  style={{ color: "#287219", flexShrink: 0, marginTop: 1 }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              <PaperPlaneTilt weight="bold" size={16} />
              Оставить заявку
            </a>
            <a href="#demo" className="btn btn-ghost">
              <Play weight="bold" size={16} />
              Смотреть пример
            </a>
          </div>
        </div>

        {/* Hero card — browser mock */}
        <div className="hero-card">
          <div className="browser-mock">
            <div className="browser-bar">
              <div className="dots">
                <span />
                <span />
                <span />
              </div>
              <div className="url">
                <Lock weight="fill" size={12} style={{ color: "#287219" }} />
                <span className="scheme">https://</span>
                stream.protectorai.kz/
                <span className="slug">zhasyl-dala</span>/
                <span className="slug">cex-1</span>
                <span className="path">/live</span>
              </div>
            </div>

            <div className="browser-content">
              <div className="obj-head">
                <div className="ic">
                  <Buildings size={20} style={{ color: "var(--brand-blue)" }} />
                </div>
                <div>
                  <h5>ТОО «Жасыл Дала» · Цех №1 · Линия розлива</h5>
                  <div className="meta">г. Алматы · Камера активна с 14 мая 2026</div>
                </div>
              </div>

              <div className="player-tile">
                <div
                  className="feed"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(#3A4E66cc, #28384Acc)",
                  }}
                />
                <span className="live-badge">
                  <span className="pulse" />
                  LIVE
                </span>
                <span className="qual">1080p · LL-HLS</span>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--text-3)",
              textAlign: "center",
              padding: "0 8px",
            }}
          >
            ↑ Это то, что увидит инспектор после перехода по ссылке
          </div>
        </div>
      </div>
    </header>
  );
}
