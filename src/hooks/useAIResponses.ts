import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the AI query fetch function
const fetchAIResponse = async (prompt: string) => {
  const combinedPrompt = `ONLY JSON OUTPUT, NO INTRODUCTIONS OR OTHER MESSAGES ${prompt}`;
  console.log(import.meta.env.VITE_OPENROUTER_API_KEY);
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    JSON.stringify({
      // model: "meta-llama/llama-3.1-8b-instruct",
      model: "liquid/lfm-40b:free",
      messages: [{ role: "user", content: combinedPrompt }],
      temperature: 0.0,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
      repetition_penalty: 1.0,
      min_p: 0.0,
      top_k: 0.0,
      top_p: 1.0,
      transforms: ["remove_redundancy", "group_similar_tasks"],
      maxTokens: 10000,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_KEY}`,
      },
    }
  );
  return response.data;
};

// Use queryOptions helper to get the query configuration
export const aiQueryOptions = (prompt: string, shouldFetch: boolean) => {
  return queryOptions({
    queryKey: ["ai-response", prompt],
    queryFn: () => fetchAIResponse(prompt),
    staleTime: 60 * 1000, // Cache for 1 minute
    retry: 3, // Retry up to 3 times
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    enabled: shouldFetch, // Only fetch if shouldFetch is true
  });
};

export const useAIResponse = (prompt: string, shouldFetch: boolean) => {
  return useQuery(aiQueryOptions(prompt, shouldFetch));
};

// Custom hook to handle multiple AI calls
export const useMultipleAIResponses = (
  prompts: string[],
  shouldFetch: boolean
) => {
  const queryResults = useQueries({
    queries: prompts.map((prompt) => aiQueryOptions(prompt, shouldFetch)),
  });

  return queryResults;
};

// Max Tokens
// 0
// Chat Memory
// 8
// Temperature
// 1.000
// Top P
// 1.000
// Top K
// 0.000
// Frequency Penalty
// 0.000
// Presence Penalty
// 0.000
// Repetition Penalty
// 1.000
// Min P
// 0.000
// Top A
// 0.000
