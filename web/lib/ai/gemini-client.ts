export type GeminiGenerateParams = {
  apiKey: string;
  model: string;
  systemInstruction: string;
  userText: string;
  timeoutMs: number;
};

type GeminiPart = { text?: string };

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
  }>;
  error?: { message?: string };
};

/**
 * Gemini generateContent（JSON モード）を呼び、テキスト本文を返す。
 * 依存追加を避けるため REST + fetch を使う。
 */
export async function generateGeminiJson(
  params: GeminiGenerateParams,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(params.model)}:generateContent`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), params.timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": params.apiKey,
      },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: params.systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: params.userText }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    });

    const payload = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      const detail = payload.error?.message ?? `HTTP ${response.status}`;
      throw new Error(`Gemini API error: ${detail}`);
    }

    const text =
      payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) {
      throw new Error("AI 応答が空でした");
    }

    return text;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Gemini request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
