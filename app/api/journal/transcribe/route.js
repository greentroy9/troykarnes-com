import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

// POST { image: base64, media_type: "image/jpeg" }
// Transcribes a handwritten journal page.
export async function POST(request) {
  const { image, media_type } = await request.json().catch(() => ({}));
  if (!image) {
    return NextResponse.json({ error: "image required" }, { status: 400 });
  }

  const client = new Anthropic();
  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: media_type || "image/jpeg",
                data: image,
              },
            },
            {
              type: "text",
              text: "This is a photo of a handwritten journal entry. Transcribe it faithfully into plain text. Preserve paragraph breaks. Fix nothing except obvious pen slips; keep the writer's words, spelling of names, and voice exactly as written. If a word is truly illegible, write [?]. Output ONLY the transcription, no commentary.",
            },
          ],
        },
      ],
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json(
        { error: "Transcription was declined. Try again." },
        { status: 422 }
      );
    }
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Transcription failed" },
      { status: 500 }
    );
  }
}
