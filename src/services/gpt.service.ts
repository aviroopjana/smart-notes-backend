import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeTextWithGPT = async (text: string) => {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes text efficiently.",
        },
        {
          role: "user",
          content: `Summarize the following text:\n\n${text}`,
        },
      ],
      max_tokens: 100,
    });

    return result.choices[0]?.message?.content || "Could not generate summary";
  } catch (error) {
    console.error("Error communicating with OpenAI GPT:", error);
    return "Error summarizing text.";
  }
};
