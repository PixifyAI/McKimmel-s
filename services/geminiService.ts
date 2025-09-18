import { GoogleGenAI, Type } from "@google/genai";
import type { Review } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function fetchFakeReviews(): Promise<Review[]> {
  try {
    const prompt = `
      Generate a JSON array of 6 fake, funny, and satirical reviews for a fictional fast-food restaurant called 'McKimmel's' that mocks a fired TV host.
      Each review object should have three properties: 'author' (a creative, funny name), 'rating' (a number between 4 and 5, because the food is ironically good), and 'comment' (a short, sarcastic review, max 40 words, referencing the host's failure or the satirical menu items like 'Failure Fries' or the 'Kimmel Crybaby Mac').
      Make the reviews sound like they are written by political opponents or gleeful critics.
    `;

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
              author: {
                type: Type.STRING,
                description: 'The name of the reviewer.'
              },
              rating: {
                type: Type.NUMBER,
                description: 'A rating out of 5.'
              },
              comment: {
                type: Type.STRING,
                description: 'The review comment.'
              }
            },
            required: ["author", "rating", "comment"],
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const reviews = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(reviews)) {
        throw new Error("API did not return an array");
    }

    return reviews as Review[];

  } catch (error) {
    console.error('Error fetching reviews from Gemini API:', error);
    // As a fallback, return some hardcoded reviews if the API fails
    return [
      { author: "ComedyConnoisseur", rating: 5, comment: "The Kimmel Crybaby Mac is deliciously ironic. The LeftyLoon sauce has a certain tang of desperation. 10/10 would laugh at his failure again." },
      { author: "LateNightWatcher", rating: 5, comment: "The Failure Fries are perfectly salted with his tears. It's the best thing to come out of his career ending. So crispy!" },
      { author: "RatingExpert", rating: 4, comment: "Finally, a menu that reflects the host! The Humble Pie was a bit hard to swallow, but satisfying nonetheless. A fitting end." }
    ];
  }
}