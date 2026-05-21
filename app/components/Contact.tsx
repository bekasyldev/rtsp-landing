"use client";

import { useState } from "react";
import {
  PaperPlaneTilt,
  Phone,
  EnvelopeSimple,
  TelegramLogo,
  Buildings,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { setFormState("error"); return; }
    setFormState("submitting");
    // Replace with real API call
    setTimeout(() => {
      setFormState("success");
    }, 800);
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <div>
          <h3>Оставьте заявку — мы поможем подключить камеру.</h3>
          <p className="lede">
            Расскажите про объект — подскажем способ подключения, проверим вашу
            камеру и поможем оформить ссылку для инспектора.
          </p>

          <div className="channels">
            <span className="channel">
              <Phone size={18} />
              +7 708 596 89 38 · будни 9:00–19:00
            </span>
            <span className="channel">
              <EnvelopeSimple size={18} />
              info@protectorai.kz
            </span>
            <span className="channel">
              <TelegramLogo size={18} />
              @protectorai_kz
            </span>
            <span className="channel">
              <Buildings size={18} />
              Алматы, пр. Аль-Фараби, 17
            </span>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="row">
            <div className="field">
              <input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                placeholder="Компания"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <input
              placeholder="Телефон ★"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (formState === "error" && e.target.value.trim()) setFormState("idle");
              }}
              required
            />
          </div>

          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="submit" type="submit" disabled={formState === "submitting"}>
            <PaperPlaneTilt weight="bold" size={14} />
            {formState === "submitting" ? "Отправка…" : "Отправить заявку"}
          </button>

          {formState === "success" && (
            <div className="state-pane success">
              <CheckCircle weight="fill" size={20} />
              <span>
                Заявка отправлена. Мы свяжемся с вами и подскажем, как подключить камеру.
              </span>
            </div>
          )}

          {formState === "error" && (
            <div className="state-pane error">
              <WarningCircle weight="fill" size={20} />
              <span>Укажите номер телефона — мы перезвоним.</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
