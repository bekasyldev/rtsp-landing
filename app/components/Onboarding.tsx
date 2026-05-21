import {
  MagnifyingGlass,
  PlugsConnected,
  Monitor,
  Globe,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

const STEPS = [
  {
    n: "1",
    icon: <MagnifyingGlass size={22} />,
    title: "Изучаем вашу сеть",
    body: "Сначала выясняем, как устроена сеть на объекте: где находятся камеры или видеорегистратор, есть ли белый IP-адрес, кто обслуживает роутер и можно ли безопасно открыть доступ к видеопотокам.",
  },
  {
    n: "2",
    icon: <PlugsConnected size={22} />,
    title: "Подключаем камеры подходящим способом",
    body: "Если у вас есть белый адрес, настраиваем доступ и выводим камеры в интернет через защищённую веб-ссылку. Если белого адреса нет, устанавливаем наше устройство и поднимаем закрытый VPN-канал.",
  },
  {
    n: "3",
    icon: <Monitor size={22} />,
    title: "Вы получаете ссылки в личном кабинете",
    body: "После подключения в вашем личном кабинете появляются ссылки на подключенные камеры. Ссылку можно отправить инспектору: он откроет страницу с описанием объекта и видеоплеером.",
  },
];

const MODES = [
  {
    icon: <Globe size={18} />,
    title: "Белый IP-адрес",
    body: "Настраиваем доступ к камерам или NVR, проверяем RTSP-потоки и публикуем их как веб-ссылки.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Нет белого IP-адреса",
    body: "Ставим наше устройство на объекте и подключаем его к платформе через закрытый VPN-канал.",
  },
  {
    icon: <Monitor size={18} />,
    title: "Личный кабинет",
    body: "После настройки пользователь видит список камер, статусы, лимиты и публичные ссылки.",
  },
];

export default function Onboarding() {
  return (
    <section className="section" id="how">
      <h2>
        Подключение <span className="accent">под ключ</span>
      </h2>
      <p className="sub">
        Мы берём настройку и подключение на себя. От вас — доступ к объекту.
      </p>

      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="stepnum">
              <span className="n">{s.n}</span>
              <span className="ic">{s.icon}</span>
            </div>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="conn-modes">
        {MODES.map((m) => (
          <div className="conn-mode" key={m.title}>
            <div className="h">
              <span className="ic">{m.icon}</span>
              <h5>{m.title}</h5>
            </div>
            <p>{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
