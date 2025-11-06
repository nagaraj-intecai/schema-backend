import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const listModels = async () => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    console.log("✅ Available models:");
    data.models?.forEach((m) => console.log("-", m.name));
  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
};

listModels();
