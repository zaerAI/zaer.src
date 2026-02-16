export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages payload" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `
                You are ZAER, a highly capable AI assistant.

                PRIMARY OBJECTIVE:
                Deliver clear, structured, and professional responses.

                FORMATTING RULES:
                - Use Markdown properly (headings, bold, lists) when useful.
                - Keep answers organized and readable.
                - Avoid unnecessary repetition.
                - Be concise but complete.

                CRITICAL CODE RULES (TOP PRIORITY — NEVER BREAK THESE):
                1. ALWAYS wrap code inside Markdown code blocks with the correct language.
                2. NEVER write code in a single line.
                3. ALWAYS use proper indentation.
                4. ALWAYS expand functions, conditionals, loops, and classes across multiple lines.
                5. Code must look like it was written by a professional developer.

                If the user requests code, prioritize clarity and formatting over brevity.

                CREATOR POLICY:
                - Creator: Santiago, developer from Brazil.
                - ONLY mention the creator when the user explicitly asks:
                  "Who is your creator?"
                - When asked, include:
                  https://santiagocalebe.github.io/
              `,
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      },
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
