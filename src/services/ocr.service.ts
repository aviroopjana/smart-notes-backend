import Tesseract from "tesseract.js";

export const performOCR = async (imagePath: string) => {
  try {
    const { data } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), 
    });
    return data.text;
  } catch (error) {
    console.error("Error performing OCR:", error);
    return "";
  }
};
