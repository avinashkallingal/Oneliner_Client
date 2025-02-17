
import { GoogleGenerativeAI } from "@google/generative-ai"; // Correct import for browser

const generateAIResponse = async (prompt:string) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyB5wyzigrH2qND8Zy7AQYsw-5H920K-hSQ"); // **REPLACE WITH YOUR ACTUAL API KEY**
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const newPrompt=`give 15 words related to the word ${prompt} for a story purpose,only word needed,i need to store that word in a array,so give a string accordingly`
    const result = await model.generateContent(newPrompt);
    return result.response.text(); // Return the text response
  } catch (error) {
    console.error("Error generating AI response:", error);
    if (error.response && error.response.status === 429) {
        console.warn("Rate limit hit. Retrying after a delay...");
        // Retry after 1 second (adjust as needed)
      } else {
        console.error("Error:", error);
      }
    return "Error generating response. Please try again."; // Handle errors gracefully
  }
};

export default generateAIResponse;
