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

type FormState = "idle" | "submitting" | "success" | "error_phone" | "error_email" | "error_api";

// Extract only the 10 local digits from whatever the user typed/pasted.
// Strips +7/+8 prefix first so the country code never ends up in the local part.
function extractLocal(raw: string): string {
  let s = raw.trim();
  if (s.startsWith("+7") || s.startsWith("+8")) s = s.slice(2);
  const digits = s.replace(/\D/g, "");
  // Pasted full number without "+": 77473336952 → strip leading 7/8
  if (digits.length > 10 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return digits.slice(1, 11);
  }
  return digits.slice(0, 10);
}

function formatPhone(local: string): string {
  if (!local) return "";
  let result = "+7 (" + local.slice(0, 3);
  if (local.length >= 3) result += ") " + local.slice(3, 6);
  if (local.length >= 6) result += "-" + local.slice(6, 8);
  if (local.length >= 8) result += "-" + local.slice(8, 10);
  return result;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ dict }: { dict: ContactDict }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const local = extractLocal(e.target.value);
    setPhone(formatPhone(local));
    if (formState === "error_phone" && local.length >= 10) setFormState("idle");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (formState === "error_email") setFormState("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (extractLocal(phone).length < 10) {
      setFormState("error_phone");
      return;
    }

    if (email && !isValidEmail(email)) {
      setFormState("error_email");
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, phone, email }),
      });
      if (!res.ok) throw new Error("request failed");
      setFormState("success");
    } catch {
      setFormState("error_api");
    }
  };

  const errorMessage =
    formState === "error_phone" ? dict.errorMsg :
    formState === "error_email" ? dict.errorMsgEmail :
    formState === "error_api"   ? dict.errorMsgApi :
    null;

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
              type="tel"
              inputMode="numeric"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="field">
            <input
              type="email"
              placeholder={dict.fieldEmail}
              value={email}
              onChange={handleEmailChange}
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

          {errorMessage && (
            <div className="state-pane error">
              <WarningCircle weight="fill" size={20} />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
