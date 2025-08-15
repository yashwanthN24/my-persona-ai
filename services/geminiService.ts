import { GoogleGenAI, Type } from "@google/genai";
import { PERSONA_CONFIG, JUDGE_SYSTEM_INSTRUCTION } from "../constants";
import { Persona, EvaluationResult, GenerationResult } from "../types";

// IMPORTANT: This setup is for development purposes only.
// Exposing an API key on the client-side is a security risk.
// In a production environment, you MUST move this logic to a secure backend.
if (!process.env.API_KEY) {
  console.error(
    "API_KEY environment variable is not set. Please set it to run the application."
  );
}
// The '!' tells TypeScript that we expect API_KEY to be present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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

const evaluateResponse = async (
  userPrompt: string,
  candidateResponse: string,
  personaInstruction: string
): Promise<EvaluationResult> => {
  const judgePrompt = `
      Here is the data to evaluate:
      - User Prompt: "${userPrompt}"
      - Persona Instructions: "${personaInstruction}"
      - AI's Response: "${candidateResponse}"
    `;

  const fallbackResult: EvaluationResult = {
    pass: false,
    reason: "The AI Judge failed to evaluate this response.",
    personaAuthenticity: 0,
    toneAccuracy: 0,
    contentRelevance: 0,
    overallQuality: 0,
  };

  try {
    if (!process.env.API_KEY) {
      return fallbackResult;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: judgePrompt,
      config: {
        systemInstruction: JUDGE_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pass: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            personaAuthenticity: { type: Type.INTEGER },
            toneAccuracy: { type: Type.INTEGER },
            contentRelevance: { type: Type.INTEGER },
            overallQuality: { type: Type.INTEGER },
          },
          required: [
            "pass",
            "reason",
            "personaAuthenticity",
            "toneAccuracy",
            "contentRelevance",
            "overallQuality",
          ],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as EvaluationResult;
  } catch (error) {
    console.error("Error during response evaluation:", error);
    return fallbackResult;
  }
};

export const generateResponse = async (
  prompt: string,
  persona: Persona
): Promise<{ responseText: string; evaluation: GenerationResult }> => {
  const fallbackEvaluation: GenerationResult = {
    pass: false,
    reason: "API call failed. Check console for details.",
    personaAuthenticity: 0,
    toneAccuracy: 0,
    contentRelevance: 0,
    overallQuality: 0,
    responseTime: 0,
    tokenUsage: 0,
  };

  if (!process.env.API_KEY) {
    return {
      responseText:
        "API_KEY is not configured. Please set it up to use the application.",
      evaluation: fallbackEvaluation,
    };
  }

  try {
    const personaConfig = PERSONA_CONFIG[persona];
    const startTime = performance.now();

    const responseText = await generateCandidateResponse(
      prompt,
      personaConfig.systemInstruction
    );
    const evaluation = await evaluateResponse(
      prompt,
      responseText,
      personaConfig.systemInstruction
    );
    const endTime = performance.now();

    const finalEvaluation: GenerationResult = {
      ...evaluation,
      responseTime: Math.round(endTime - startTime),
      tokenUsage: 0, // Placeholder
    };

    return { responseText, evaluation: finalEvaluation };
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    const errorText =
      "Sorry, I ran into an issue while trying to respond. Please check the developer console for more details.";
    return { responseText: errorText, evaluation: fallbackEvaluation };
  }
};
