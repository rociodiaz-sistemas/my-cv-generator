// src/api/fetchHermesResponse.ts
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

interface HermesResponse {
  choices: { message: { content: string } }[];
}

export const fetchHermesResponse = async (prompt: string): Promise<string> => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nousresearch/hermes-3-llama-3.1-405b:free",
        messages: [{ role: "user", content: prompt }],
        top_p: 1,
        temperature: 1,
        repetition_penalty: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from Hermes API");
  }

  const data: HermesResponse = await response.json();
  return data.choices[0]?.message.content;
};
