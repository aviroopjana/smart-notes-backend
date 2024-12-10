import { summarizeTextWithGPT } from "./gpt.service";

export const parseReceiptData = async (text: string) => {
  try {
    const analysisPrompt = `
      Extract and structure the following key details from the receipt text:
      1. Merchant name
      2. Total amount paid
      3. Date of purchase
      4. List of purchased items and their quantities
      Respond in JSON format.
      
      Text:\n
      ${text}
    `;

    const result = await summarizeTextWithGPT(analysisPrompt);
    return result; 
  } catch (error) {
    console.error("Error parsing receipt data:", error);
    return {};
  }
};
