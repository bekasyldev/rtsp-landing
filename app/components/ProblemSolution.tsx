export default function ProblemSolution() {
  return (
    <section className="section">
      <h2>
        Почему это <span className="accent">проблема</span>
      </h2>
      <p className="sub">
        Камеры говорят по одному протоколу. Браузер и госпортал — по другому. Мы соединяем.
      </p>

      <div className="ps-grid">
        <div className="ps-card problem">
          <span className="tag">Проблема</span>
          <h3>RTSP не открывается в браузере</h3>
          <p>
            Большинство IP-камер и видеорегистраторов отдают поток по RTSP. Такая
            ссылка работает в VLC или специальном ПО, но не открывается напрямую в
            браузере и неудобна для инспектора.
          </p>
          <div className="visual">
            <span>
              <span className="err">✗</span>{"  "}
              rtsp://192.168.1.42:554/Channel/101
            </span>
            <span style={{ color: "var(--text-3)" }}>
              ↳ браузер:{" "}
              <span className="err">«Не удалось открыть ссылку»</span>
            </span>
          </div>
        </div>

        <div className="ps-card solution">
          <span className="tag">Решение</span>
          <h3>Мы превращаем поток камеры в веб-ссылку</h3>
          <p>
            Сервис забирает RTSP-поток, готовит его для браузера и выдает публичную
            страницу с описанием объекта и видеоплеером.
          </p>
          <div className="visual">
            <span>
              <span className="ok">✓</span>{"  "}
              https://stream.protectorai.kz/zhasyl-dala/cex-1/live
            </span>
            <span style={{ color: "var(--text-3)" }}>
              ↳ браузер:{" "}
              <span className="ok">плеер + описание объекта</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
