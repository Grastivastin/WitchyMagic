// Face skin analysis edge function — uses Lovable AI (Gemini) vision to detect skin concerns
// and prescribe ingredients/products. Returns structured JSON via tool calling.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INGREDIENT_IDS = [
  "niacinamide", "retinol", "hyaluronic-acid", "salicylic-acid",
  "vitamin-c", "bakuchiol", "tranexamic-acid", "azelaic-acid",
  "peptides", "ceramides", "glycolic-acid", "squalane",
];
const PRODUCT_IDS = [
  "moonlight-cleanser", "cauldron-serum", "selene-moisturizer",
  "venus-vitc", "phoenix-retinol", "rose-quartz-mist",
  "wolfsbane-spf", "obsidian-mask", "sage-cleanser",
  "amethyst-eye-cream", "scorpio-aha", "elixir-essence", "lunar-pads",
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image } = await req.json();
    if (!image) {
      return new Response(JSON.stringify({ error: "image required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a board-certified cosmetic dermatologist who also speaks in mystical witchy language for the Witchy Magic boutique. You analyze a single face photo and identify visible skin concerns. Be honest but kind. For each concern: name it, score severity 0-100, explain the dermatological cause in 1-2 sentences (factors like sebum, UV, dehydration, inflammation, hormones), then prescribe ingredients and products from our fixed catalog.

Allowed ingredient IDs (only these): ${INGREDIENT_IDS.join(", ")}.
Allowed product IDs (only these): ${PRODUCT_IDS.join(", ")}.

Pick an archetype (e.g. "The Moonlit Oracle", "The Phoenix", "The Mystic Healer", "The High Priestess", "The Velvet Witch") and a single mystical glyph (☾ ☼ ✦ ♆ ♅ 🜂 🜄). Provide 3-5 findings.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this face photo. Return concerns, causes, and prescriptions via the tool." },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
        tools: [{
          type: "function",
          function: {
            name: "deliver_skin_reading",
            description: "Return the structured skin analysis.",
            parameters: {
              type: "object",
              properties: {
                archetype: { type: "string" },
                glyph: { type: "string" },
                summary: { type: "string", description: "2-3 sentence overall reading in poetic but informative tone." },
                findings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      concern: { type: "string" },
                      severity: { type: "number" },
                      cause: { type: "string" },
                      ingredientIds: { type: "array", items: { type: "string" } },
                      productIds: { type: "array", items: { type: "string" } },
                    },
                    required: ["concern", "severity", "cause", "ingredientIds", "productIds"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["archetype", "glyph", "summary", "findings"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "deliver_skin_reading" } },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error", response.status, t);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many readings — pause and try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No reading produced");
    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("face-analysis error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
