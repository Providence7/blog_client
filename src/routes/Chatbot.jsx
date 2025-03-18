import { useState } from "react";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: input }]
        })
      });
      
      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      
      if (!/(fashion|tailoring|fabric|textile|silk|cotton|linen|wool|polyester|sewing|design|style|outfit|clothing|apparel|embroidery|couture|bespoke|haute couture|pattern making|draping|African prints|ankara|aso oke|kente|batik|adire|kitenge|bogolan|dashiki|boubou|kaftan|agbada|lace|velvet|chiffon|organza|brocade|crepe|tweed|fashion trends|fashioncost|material cost|fabric cost|African fabric prices|types of ankara)/i.test(input)) {
      setResponse("Ask me fashion or tailoring related questions, including fabric types, latest costs, and African fashion trends.");
      } else {
        setResponse(aiResponse);
      }
    } catch (error) {
      setResponse("Error fetching response");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Chat with AI (Fashion Focused)</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about fashion or tailoring..."
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <strong>AI Response:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}
