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
import type { Dictionary } from "../[lang]/dictionaries";

type ContactDict = Dictionary["contact"];

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact({ dict }: { dict: ContactDict }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { setFormState("error"); return; }
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 800);
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <div>
          <h3>{dict.h3}</h3>
          <p className="lede">{dict.lede}</p>

          <div className="channels">
            <span className="channel">
              <Phone size={18} />
              {dict.channelPhone}
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
                placeholder={dict.fieldName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                placeholder={dict.fieldCompany}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <input
              placeholder={dict.fieldPhone}
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
              placeholder={dict.fieldEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="submit" type="submit" disabled={formState === "submitting"}>
            <PaperPlaneTilt weight="bold" size={14} />
            {formState === "submitting" ? dict.submitSending : dict.submitIdle}
          </button>

          {formState === "success" && (
            <div className="state-pane success">
              <CheckCircle weight="fill" size={20} />
              <span>{dict.successMsg}</span>
            </div>
          )}

          {formState === "error" && (
            <div className="state-pane error">
              <WarningCircle weight="fill" size={20} />
              <span>{dict.errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
