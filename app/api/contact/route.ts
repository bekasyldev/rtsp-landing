export async function POST(req: Request) {
  const { name, company, phone, email } = await req.json();

  if (!phone?.trim()) {
    return Response.json({ ok: false, error: "phone required" }, { status: 400 });
  }

  const tgRes = await fetch(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: `🆕 Новая заявка!\n👤 ${name ?? "—"} — ${company ?? "—"}\n📞 ${phone}\n📧 ${email ?? "—"}`,
      }),
    }
  );

  if (!tgRes.ok) {
    console.error("Telegram error:", tgRes.status, await tgRes.text());
  }

  return Response.json({ ok: true });
}
