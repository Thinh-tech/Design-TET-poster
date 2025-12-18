
import { GoogleGenAI } from "@google/genai";
import { PosterConfig } from "../types";

export const generatePosterImage = async (config: PosterConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Construct a very detailed prompt based on the requirements from the image
  const prompt = `
    A high-resolution, professional luxury Tet 2026 (Year of the Horse - Bính Ngọ) poster design.
    Theme: ${config.theme === 'imperial' ? 'Imperial Vietnamese royal style with navy and gold' : config.theme === 'traditional' ? 'Classic Vietnamese Tet with red and peach blossoms' : 'Modern high-end graphic design'}.
    Central Focus: ${config.mainSymbol === 'horse' ? 'A majestic, powerful horse (linh vật Ngựa) galloping towards success' : 'An ornate bronze drum (Trống Đồng) with a subtle horse silhouette'}.
    Visual Elements: Stylized Vietnamese traditional motifs, "mây ngũ sắc" (five-colored clouds), 
    ${config.theme === 'traditional' ? 'peach blossoms (hoa đào) and apricot blossoms (hoa mai)' : 'delicate gold filigree and geometric patterns'}.
    Typography: Elegant traditional calligraphy style text in Vietnamese: "${config.mainGreeting}" and "${config.subGreeting}".
    Layout: Perfectly symmetrical, spacious, formal, and balanced. 
    Color Palette: ${config.theme === 'imperial' ? 'Deep Navy Blue, Charcoal, and metallic Gold' : 'Imperial Red, Vermillion, and brilliant Gold'}.
    Style: Semi-realistic digital illustration, no cartoonish elements, extremely high quality, suitable for high-level government and corporate gift.
    Mood: Respectful, prosperous, stable, and auspicious.
    Sender: Leave space at the bottom for the text "${config.senderName}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio === 'A3' ? "3:4" : "9:16",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data returned from Gemini");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};
