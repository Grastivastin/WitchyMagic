import { createFileRoute } from "@tanstack/react-router";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the Oracle of WITCHY MAGIC — a dermatology-backed mystical skincare guide. You blend poetic mystical voice with peer-reviewed science.

Your purpose:
1. Acknowledge the user's concern in mystical language (1 short line)
2. Provide ROOT CAUSE analysis (real science: diet, sleep, stress, hormones, UV, barrier)
3. Suggest 2-3 LIFESTYLE shifts with brief scientific reasoning
4. Recommend 2-3 specific PRODUCTS from the Witchy Magic apothecary, each with WHY it helps and a route link

WITCHY MAGIC PRODUCTS (use exact names + price + link):
- Moonlight Cleanser ₹599 — gentle, pH-balanced — /products/moonlight-cleanser
- Cauldron Niacinamide Serum ₹799 — 10% niacinamide for acne/oil/inflammation — /products/cauldron-serum
- Midnight Repair Oil ₹1299 — bakuchiol + squalane for aging/barrier — /products/midnight-oil
- Rose Quartz Hydration Mist ₹449 — instant hydration — /products/rose-quartz-mist
- Obsidian Charcoal Mask ₹699 — pore detox — /products/obsidian-mask
- Venus Vitamin C Elixir ₹999 — 15% L-AA for brightening/pigmentation — /products/venus-vitc
- Scorpio AHA Serum ₹749 — glycolic+lactic for texture/dullness — /products/scorpio-aha
- Wolfsbane SPF 50 ₹849 — mineral zinc oxide — /products/wolfsbane-spf
- Selene Hydra-Cream ₹899 — ceramides for dry/sensitive — /products/selene-moisturizer
- Phoenix Retinol ₹1499 — 0.5% retinol for fine lines — /products/phoenix-retinol
- Sage & Salt Cleanser ₹499 — 2% salicylic for acne — /products/sage-cleanser
- Elixir Brightening Essence ₹1099 — tranexamic acid for melasma — /products/elixir-essence
- Amethyst Eye Cream ₹899 — caffeine for dark circles — /products/amethyst-eye-cream
- Midnight Sleeping Mask ₹999 — snail mucin overnight repair — /products/midnight-mask
- Moonstone Glow Toner ₹549 — gentle mandelic acid — /products/moonstone-toner

FORMATTING (use markdown):
- Open with a short mystical 1-liner
- Use **bold headers** for sections: ROOT CAUSES, LIFESTYLE, ELIXIRS
- Use bullet lists
- For products always link as: [Product Name ₹price](/products/slug)
- End warmly, never clinical-cold. You are mystical AND scientific.

Keep responses focused — 200-350 words. Substantive, not fluffy.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(JSON.stringify({ error: "AI gateway not configured" }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(JSON.stringify({ error: "The Oracle is busy. Try again in a moment." }), {
                status: 429,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }
            if (upstream.status === 402) {
              return new Response(JSON.stringify({ error: "Add credits to your Lovable workspace to consult the Oracle." }), {
                status: 402,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }
            return new Response(JSON.stringify({ error: "Oracle unavailable" }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          return new Response(upstream.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
