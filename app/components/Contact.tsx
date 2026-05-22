"use client";

import { useState } from "react";
import {
  PaperPlaneTilt,
  Phone,
  EnvelopeSimple,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import type { Dictionary } from "../[lang]/dictionaries";

type ContactDict = Dictionary["contact"];

type FormState = "idle" | "submitting" | "success" | "error_phone" | "error_email" | "error_api";

function extractLocal(raw: string): string {
  let s = raw.trim();
  if (s.startsWith("+7") || s.startsWith("+8")) s = s.slice(2);
  const digits = s.replace(/\D/g, "");
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

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace") return;

    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const selEnd = input.selectionEnd ?? pos;

    // Let default handle selections or cursor at start
    if (pos !== selEnd || pos === 0) return;

    const charBefore = phone[pos - 1];

    // Only intercept when cursor is right after a formatting character
    if (!charBefore || /[\d+]/.test(charBefore)) return;

    e.preventDefault();

    // Find the nearest digit to the left
    let digitPos = pos - 1;
    while (digitPos > 0 && /\D/.test(phone[digitPos])) digitPos--;

    // Don't touch the "+7 (" prefix (local digits start at index 4)
    if (digitPos < 4) return;

    // How many local digits appear before the one we're deleting
    const localDigitsBefore = phone.slice(4, digitPos).replace(/\D/g, "").length;

    const newLocal = extractLocal(phone.slice(0, digitPos) + phone.slice(digitPos + 1));
    const newFormatted = formatPhone(newLocal);
    setPhone(newFormatted);
    if (formState === "error_phone" && newLocal.length >= 10) setFormState("idle");

    // Restore cursor to the equivalent position in the new formatted string
    requestAnimationFrame(() => {
      if (!input.isConnected) return;
      if (localDigitsBefore === 0) {
        input.setSelectionRange(4, 4);
        return;
      }
      let count = 0;
      for (let i = 4; i < newFormatted.length; i++) {
        if (/\d/.test(newFormatted[i])) {
          count++;
          if (count === localDigitsBefore) {
            input.setSelectionRange(i + 1, i + 1);
            return;
          }
        }
      }
      input.setSelectionRange(newFormatted.length, newFormatted.length);
    });
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
              onKeyDown={handlePhoneKeyDown}
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
