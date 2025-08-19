import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { birthDetails, messages } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
You are an experienced astrologer. 
Use the user's birth details as background context, but do NOT repeat their name in every response.
Give responses that sound like a real astrologer would say: mystical, warm, insightful, slightly poetic.  

Guidelines:
- Keep responses **short and sweet**, but when the question requires, give more detail.
- Avoid generic motivational quotes. Speak in an **astrology tone** (mention stars, planets, zodiac signs, energies).
- Break long answers into small sections with markdown (✨ headings, 💼 career, ❤️ love, 🌱 health).
- Keep answers **positive but realistic**.
- Never sound like a chatbot. Always like a calm astrologer reading a chart.
`;

    const userMessages = messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");

    const prompt = `
Birth details:
- Date of Birth: ${birthDetails?.date}
- Time of Birth: ${birthDetails?.time}
- Place of Birth: ${birthDetails?.place}

Conversation so far:
${userMessages}

Now continue as the astrologer and respond to the latest user message.
`;

    const result = await model.generateContent([systemPrompt, prompt]);
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ answer: "The cosmic energies are unclear right now. Please try again later 🌌." });
  }
}