import { GoogleGenAI, Type } from "@google/genai";
import { Competition, SearchFilters } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchCompetitions = async (filters: SearchFilters): Promise<Competition[]> => {
  const ai = getClient();
  
  const prompt = `
    Generate a list of 8 to 12 realistic and popular student competitions based on the following criteria:
    Location: ${filters.state ? `${filters.state}, ` : ''}${filters.country || 'Global'}
    Field of Interest: ${filters.field || 'General'}
    Education Level: ${filters.level || 'Any'}

    The competitions should be real or highly realistic representations of typical competitions in this region.
    Include a mix of local, state-level, and national/international competitions relevant to the location.
    
    For the 'imageKeyword', provide a single noun that represents the visual theme (e.g., 'robot', 'code', 'paint', 'business', 'microscope').
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              organizer: { type: Type.STRING },
              description: { type: Type.STRING },
              location: { type: Type.STRING },
              field: { type: Type.STRING },
              deadline: { type: Type.STRING },
              eligibility: { type: Type.STRING },
              websiteUrl: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              imageKeyword: { type: Type.STRING }
            },
            required: ["id", "name", "organizer", "description", "location", "field", "deadline", "eligibility", "websiteUrl", "tags", "imageKeyword"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Competition[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching competitions:", error);
    // Return empty array or throw to be handled by UI
    return [];
  }
};
