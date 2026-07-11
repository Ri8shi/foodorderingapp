const axios = require("axios");

exports.generateDishDescription = async ({ name, category, spiceLevel, price }) => {
  const prompt = `You are a professional food classification assistant.\nGenerate ONLY valid JSON. No markdown. No explanation text.\nIMPORTANT RULES:\n- Tags must be accurate restaurant-style tags\n- Do NOT misclassify dishes\n- Allergens must be realistic\n- Serves must be realistic (1 or 2)\n- bestFor must be meal timings only\n\nDish Name: ${name}\nCategory: ${category}\nSpice Level: ${spiceLevel}\nBase Price: ${price}\n\nReturn JSON in this EXACT format:\n{\n  "description": "string",\n  "tags": ["string"],\n  "allergens": ["string"],\n  "serves": "string",\n  "bestFor": ["string"]\n}`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    { model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.4, max_tokens: 300 },
    { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" } }
  );

  return JSON.parse(response.data.choices[0].message.content);
};
