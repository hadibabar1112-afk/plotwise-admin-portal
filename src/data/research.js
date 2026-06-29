export const RESEARCH = {
  "aurelia-dehydration": {
    campaignId: "aurelia-dehydration",
    clientName: "Aurelia Skincare",
    product: "The Balance Serum",
    customer: {
      headline: "The Frustrated Researcher — she's tried 12 products, none worked.",
      distillation: "She's exhausted from researching but still hopeful. She wants to understand WHY a product works, not just be told it does.",
      pain: ["She feels betrayed by brands that overpromised", "Decision fatigue from researching ingredients", "Skin gets oily by 11am despite a full routine"],
      desires: ["Understand WHY a product works", "Stop trying new things", "Find one thing that actually works"],
      beliefs: ["Oily skin doesn't need hydration", "Premium price = premium results, but she's sceptical"],
      vocab: [
        { hers: "My skin gets oily by 11am", category: "Excess sebum production" },
        { hers: "I've tried everything", category: "Customer journey friction" },
        { hers: "It actually worked", category: "Demonstrated efficacy" },
        { hers: "I feel like I'm fighting my skin", category: "Skin barrier disruption" },
      ],
      hangouts: ["r/SkincareAddiction", "Hyram YouTube", "Sephora reviews"],
    },
    beliefs: [
      { belief: "Oily skin doesn't need hydration", reality: "Dehydrated skin overproduces oil to compensate — the opposite is true.", priority: "primary" },
      { belief: "Actives = progress", reality: "More actives without hydration weakens the barrier and worsens oil production.", priority: "secondary" },
      { belief: "If it's expensive, it works", reality: "Price signals care but doesn't guarantee mechanism. She needs mechanism explained.", priority: "secondary" },
    ],
    competitor: [
      { name: "Tatcha", positioning: "Japanese ritual, luxe texture", gap: "Talks ritual not mechanism — our angle is the science." },
      { name: "Glow Recipe", positioning: "Fun, fruit-powered, youthful", gap: "Skews younger, playful. Our buyer is more considered." },
      { name: "Drunk Elephant", positioning: "Biocompatible, suspicious of ingredients", gap: "Sells exclusion ('no bad ingredients') — we sell mechanism." },
    ],
    offer: {
      headline: "The Balance Serum",
      price: "$85",
      keyIngredients: ["Hyaluronic Acid (3-weight)", "Niacinamide 5%", "Ceramide Complex"],
      mechanism: "Delivers layered hydration at the surface and deeper layers simultaneously, reducing the sebum overproduction triggered by dehydration.",
      proof: "Clinical study: 94% of participants reported reduced midday oiliness after 28 days.",
      differentiation: "Science-explained mechanism, not ingredient listing. Positioned as the serum that makes your current routine work better.",
    },
    angles: [
      { id: "dehydration-reframe", name: "Dehydration Reframe", stage: "TOF", tagline: "The counterintuitive mechanism behind oily skin.", selected: true },
      { id: "routine-fixer", name: "The Routine Fixer", stage: "MOF", tagline: "The serum that makes your existing routine actually work.", selected: false },
      { id: "28-day-math", name: "28-Day Math", stage: "BOF", tagline: "94% of women saw a difference. Here's what 28 days actually looks like.", selected: false },
    ],
    hooks: [
      { letter: "A", type: "Curiosity", line: "Your oily skin isn't oily. It's thirsty.", angle: "dehydration-reframe" },
      { letter: "B", type: "Story", line: "I spent four years drying my skin out. It made everything worse.", angle: "dehydration-reframe" },
    ],
    status: {
      customer: "complete",
      beliefs: "complete",
      competitor: "complete",
      offer: "complete",
      angles: "complete",
      hooks: "complete",
    },
  },

  "aurelia-spf-daily": {
    campaignId: "aurelia-spf-daily",
    clientName: "Aurelia Skincare",
    product: "Daily Shield SPF 50",
    customer: {
      headline: "The SPF Avoider — she knows she should but doesn't.",
      distillation: "She's aware of SPF importance but finds it annoying, pore-clogging, or 'too much of a step'.",
      pain: ["SPF feels heavy and greasy", "White cast on her skintone", "Doesn't know which one to use"],
      desires: ["A lightweight SPF that feels like nothing", "Clear skin while protecting it", "Make it the easiest step"],
      beliefs: ["SPF is an extra step, not a base step", "Mineral SPF is safer but chalky", "Chemical SPF is invisible but scary"],
      vocab: [
        { hers: "I forget to put it on", category: "Habit failure" },
        { hers: "It makes my makeup slide", category: "Texture objection" },
        { hers: "I use the one in my moisturiser", category: "SPF awareness gap" },
      ],
      hangouts: ["TikTok #SPFtiktok", "r/SkincareAddiction", "YouTube dermatologist channels"],
    },
    beliefs: null,
    competitor: null,
    offer: null,
    angles: null,
    hooks: null,
    status: {
      customer: "in-progress",
      beliefs: "not-started",
      competitor: "not-started",
      offer: "not-started",
      angles: "not-started",
      hooks: "not-started",
    },
  },

  "saltsea-costperuse": {
    campaignId: "saltsea-costperuse",
    clientName: "Salt & Sea",
    product: "Sea Salt Scrub",
    customer: {
      headline: "The Value Seeker — she wants quality but resists premium prices.",
      distillation: "She comparison-shops, reads reviews obsessively, and needs a logical justification to spend more.",
      pain: ["Feels guilty spending on body care", "Unsure if premium products are worth it vs. drugstore"],
      desires: ["Confidence that she's getting value", "Something that actually lasts"],
      beliefs: ["Body scrubs are all the same", "You only need to pay premium for face products"],
      vocab: [
        { hers: "Is it worth it?", category: "Value anxiety" },
        { hers: "How long does it last?", category: "Cost-per-use framing" },
      ],
      hangouts: ["Reddit r/beauty", "YouTube haul videos", "Deal-focused beauty communities"],
    },
    beliefs: [
      { belief: "Body care doesn't need to be expensive", reality: "Premium ingredients + longer-lasting formula changes the cost-per-use math.", priority: "primary" },
    ],
    competitor: [
      { name: "Tree Hut", positioning: "Affordable, widely loved drugstore", gap: "No premium differentiation — good for us to own the 'worth it' space." },
    ],
    offer: {
      headline: "Sea Salt Scrub",
      price: "$34",
      keyIngredients: ["Dead Sea Salt", "Coconut Oil", "Vitamin E"],
      mechanism: "180g jar, 60+ uses. At $34 that's under $0.60 per use — competes on value when framed correctly.",
      proof: "Customer reviews average 4.7 stars with 78% noting it lasts longer than expected.",
      differentiation: "Value framing — cost-per-use math makes the price feel like a bargain, not a splurge.",
    },
    angles: [
      { id: "cost-per-use", name: "Cost Per Use Math", stage: "BOF", tagline: "At $34 for 60+ uses — that's under 60¢ a use.", selected: true },
    ],
    hooks: [
      { letter: "A", type: "Math reveal", line: "I did the math on my body scrub. $34 for 60+ uses. That's less than your daily coffee.", angle: "cost-per-use" },
    ],
    status: {
      customer: "complete",
      beliefs: "complete",
      competitor: "complete",
      offer: "complete",
      angles: "complete",
      hooks: "complete",
    },
  },
};
