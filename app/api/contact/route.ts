export async function POST(req: Request) {
  const { name, company, phone, email } = await req.json();

  if (!phone?.trim()) {
    return Response.json({ ok: false, error: "phone required" }, { status: 400 });
  }

  if (process.env.NOTION_TOKEN && process.env.NOTION_DB_ID) {
    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DB_ID },
        properties: {
          Client:  { title: [{ text: { content: name ?? "" } }] },
          Company: { rich_text: [{ text: { content: company ?? "" } }] },
          Phone:   { phone_number: phone },
          Email:   { email: email || null },
          Status:  { select: { name: "New" } },
        },
      }),
    });

    if (!notionRes.ok) {
      console.error("Notion error:", notionRes.status, await notionRes.text());
    }
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
    // Notion already saved — log but don't fail the request
    console.error("Telegram error:", tgRes.status, await tgRes.text());
  }

  return Response.json({ ok: true });
}
