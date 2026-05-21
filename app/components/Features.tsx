import { Browser, Broadcast, Headset } from "@phosphor-icons/react/dist/ssr";

const FEATURES = [
  {
    icon: <Browser size={26} />,
    title: "Публичная страница камеры",
    body: "Ссылка открывается без логина и показывает только безопасную информацию.",
  },
  {
    icon: <Broadcast size={26} />,
    title: "Мониторинг камер",
    body: "Отображение статусов live и offline в личном кабинете.",
  },
  {
    icon: <Headset size={26} />,
    title: "Техподдержка",
    body: "Помогаем с настройкой и подключением камер.",
  },
];

export default function Features() {
  return (
    <section className="section">
      <h2>
        Что вы <span className="accent">получаете</span>
      </h2>
      <p className="sub">
        Простой набор инструментов для одной задачи — показать камеру инспектору.
      </p>

      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="ic">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
