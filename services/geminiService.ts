import { GoogleGenAI, Type } from "@google/genai";
import { PERSONA_CONFIG } from "../constants";
import { Persona, GenerationResult } from "../types";

// IMPORTANT: This setup is for development purposes only.
// Exposing an API key on the client-side is a security risk.
// In a production environment, you MUST move this logic to a secure backend.
if (!import.meta.env.VITE_API_KEY) {
  console.error(
    "API_KEY environment variable is not set. Please set it to run the application."
  );
}
// The '!' tells TypeScript that we expect API_KEY to be present.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY! });

const generateCandidateResponse = async (
  prompt: string,
  systemInstruction: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    return response.text;
  } catch (e) {
    console.error("Error in generateCandidateResponse:", e);
    return "Sorry, I encountered an error while generating a response. Check the console for details.";
  }
};

const generateStreamingResponse = async (
  prompt: string,
  systemInstruction: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    for await (const chunk of response) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (e) {
    console.error("Error in generateStreamingResponse:", e);
    onChunk(
      "Sorry, I encountered an error while generating a response. Check the console for details."
    );
  }
};

export const generateResponse = async (
  prompt: string,
  persona: Persona
): Promise<{ responseText: string }> => {
  if (!import.meta.env.VITE_API_KEY) {
    return {
      responseText:
        "API_KEY is not configured. Please set it up to use the application.",
    };
  }

  try {
    const personaConfig = PERSONA_CONFIG[persona];

    const responseText = await generateCandidateResponse(
      prompt,
      personaConfig.systemInstruction
    );

    return { responseText };
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    const errorText =
      "Sorry, I ran into an issue while trying to respond. Please check the developer console for more details.";
    return { responseText: errorText };
  }
};

export const generateStreamingResponseHandler = async (
  prompt: string,
  persona: Persona,
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (!import.meta.env.VITE_API_KEY) {
    onChunk(
      "API_KEY is not configured. Please set it up to use the application."
    );
    return;
  }

  try {
    const personaConfig = PERSONA_CONFIG[persona];
    await generateStreamingResponse(
      prompt,
      personaConfig.systemInstruction,
      onChunk
    );
  } catch (error) {
    console.error(
      "Error generating streaming response from Gemini API:",
      error
    );
    const errorText =
      "Sorry, I ran into an issue while trying to respond. Please check the developer console for more details.";
    onChunk(errorText);
  }
};
