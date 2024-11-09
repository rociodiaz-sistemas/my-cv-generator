import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

// Define the AI query fetch function
const fetchAIResponse = async (prompt: string, jobPosting: string) => {
  const combinedPrompt = `${prompt} Job Posting: ${jobPosting}\n\n`;
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    JSON.stringify({
      model: "liquid/lfm-40b:free",
      messages: [{ role: "user", content: combinedPrompt }],
      max_tokens: 200, // Adjust according to the expected response length
      temperature: 1.0, // Balanced temperature for creativity and coherence
      top_p: 1.0, // Allowing full range of token choices
      repetition_penalty: 1.0, // Prevent repetition
      frequency_penalty: 0.0, // No bias against frequent tokens
      presence_penalty: 0.0, // No bias against repetitive tokens
      transforms: ["remove_redundancy", "group_similar_tasks"],
      stop: "\n", // Ensure the output stops at the end of the list
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
    }
  );
  return response.data;
};

// Use queryOptions helper to get the query configuration
export const aiQueryOptions = (prompt: string, jobPosting: string) => {
  return queryOptions({
    queryKey: ["ai-response", prompt],
    queryFn: () => fetchAIResponse(prompt, jobPosting),
    staleTime: 60 * 1000, // Cache for 1 minute
    retry: 3, // Retry up to 3 times
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });
};
