export const PRODUCTION_DETAILS = {
  "aurelia-dehydration": {
    briefPack: {
      brand: {
        name: "Aurelia Skincare",
        category: "Skincare · Premium Serum",
        heroProduct: "The Balance Serum ($58)",
        positioning: "An independent skincare brand built around the hydration paradox — oily skin is often dehydrated skin. Not in Sephora. Built for the informed skincare consumer who reads labels and distrusts marketing claims.",
      },
      persona: {
        name: "The Frustrated Oily-Skin Buyer",
        distillation: "She's been using oil-control products for years. Her skin is getting worse, not better.",
        feels: {
          pain: ["Her oily skin keeps breaking out despite using oil-control products", "She's spent a lot on serums that didn't deliver on their promise"],
          desires: ["She wants skin that feels balanced throughout the day", "She wants to understand the science behind what she puts on her face"],
          beliefs: ["She believes moisturizer will make oily skin worse", "She believes oil-control is the only solution to oily skin"],
        },
        vocab: [
          { hers: "My skin gets oily by noon no matter what I do", category: "Midday oil complaint" },
          { hers: "I'm scared to moisturize — it breaks me out", category: "Hydration fear response" },
          { hers: "I feel like nothing actually works for my skin type", category: "Category fatigue" },
          { hers: "I need something lightweight that won't clog my pores", category: "Formula concern" },
        ],
        lives: ["r/SkincareAddiction", "HolySnails", "Skincare by Hyram (YouTube)", "TikTok #skincareadvice"],
      },
      angle: {
        name: "The Dehydration Reframe",
        tagline: "Oily skin is dehydrated skin. Hydrating it is the fix, not the cause.",
        matters: "The dominant belief in this segment — that moisturizer makes oily skin worse — is directly harming their skin. This reframe corrects that belief with science and gives the viewer a clear reason to try something different. It positions Aurelia as the brand that tells the truth when others don't.",
        beliefShift: "She currently thinks: 'My skin is oily — hydration will make it worse.' We want her thinking after this video: 'My skin is oily because it's dehydrated. Adding hydration is exactly what it needs.'",
      },
      hooks: [
        { letter: "A", type: "Contrarian", line: "You've been told oily skin doesn't need hydration. That's exactly why it's getting worse.", note: "Open with the belief you're about to destroy. No hedging." },
        { letter: "B", type: "Confession", line: "I gave up moisturizer for two years because my skin was oily. I was making it worse the whole time.", note: "Personal confession. Makes the viewer feel seen." },
      ],
      script: {
        intro: "Same body across both hooks. After the first 3 seconds, the video opens the same way. Film in your own voice — these are beats, not lines to read.",
        beats: [
          { time: "0:03 – 0:12", label: "Name the paradox", body: "Set up the counterintuitive truth. Oily skin produces excess oil because it's dehydrated and trying to compensate.", keyLine: "When skin is dehydrated, it overproduces oil to compensate. That's why stripping it makes it worse." },
          { time: "0:12 – 0:25", label: "Explain the science", body: "The mechanism matters here. Your skin's sebaceous glands go into overdrive when moisture is stripped. Keep it simple.", keyLine: "Oil-control products strip moisture. Your skin freaks out and produces more oil. It's a loop." },
          { time: "0:25 – 0:37", label: "Introduce the serum", body: "Pick it up. Hold it like something you already use. Show the bottle — don't pose with it. Say what it does, not what it claims.", keyLine: "I've been using this for six weeks. It's a lightweight hyaluronic serum. My skin is less oily by day two." },
          { time: "0:37 – 0:45", label: "Close with the shift", body: "Bring it back to the belief. She's been fighting the wrong thing.", keyLine: "Your skin isn't oily by nature. It's dehydrated by habit. There's a difference." },
        ],
        notes: "Slow down on the mechanism explanation at 0:12. The viewer is hearing this for the first time and it's the moment that earns the rest of the watch.",
      },
      specs: { length: "40-50 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "Meta + TikTok", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Conversational, science-adjacent. Not clinical. Film in your bathroom or skincare corner — wherever feels authentic to your routine. Natural light preferred. Hold products like you already use them, not like you're presenting them.",
      productNotes: "The Balance Serum comes in a 30ml frosted glass dropper bottle with minimal labeling. The serum is water-clear. Show the dropper application on fingertips, then press gently into skin. The brand logo should be visible at least once. No price mention, no discount codes.",
      avoid: "No 'life-changing' or 'holy grail' language. No before/after skin photography. Don't claim it cures acne. Don't recommend it for dry skin types — this is specifically the oily/combination reframe angle.",
      moodboard: ["@hyram TikTok skincare education style — calm, science-forward, no hype", "Conversational bathroom routine setup — GRWM energy", "Mechanism-first explainer tone — a friend who studied biochemistry explaining it over coffee"],
    },
    submissions: [
      { id: "sub-a1", creatorId: "maya-chen", creatorName: "Maya Chen", title: "Dehydration Reframe — Hook A", submittedAt: "Feb 18, 2026", duration: "44s", status: "revision-requested", revisions: [{ note: "The mechanism explanation at 0:12 is too fast — slow it down. The viewer needs 3–4 more seconds on the oil-compensation loop before you introduce the product.", requestedAt: "Feb 20, 2026" }] },
      { id: "sub-a2", creatorId: "maya-chen", creatorName: "Maya Chen", title: "Dehydration Reframe — Hook B", submittedAt: "Feb 18, 2026", duration: "42s", status: "pending", revisions: [] },
    ],
  },

  "aurelia-timeline": {
    briefPack: {
      brand: {
        name: "Aurelia Skincare",
        category: "Skincare · Premium Serum",
        heroProduct: "The Balance Serum ($58)",
        positioning: "Aurelia's honesty-first serum campaign. This angle positions timeline transparency as the core differentiator — Aurelia doesn't promise overnight results, it explains what actually happens at weeks one, two, and four.",
      },
      persona: {
        name: "The Skeptical Skincare Researcher",
        distillation: "She's tried serums that promised everything and delivered nothing. She wants proof before she believes anything.",
        feels: {
          pain: ["She's wasted money on products that showed 'results' only in brand photography", "She doesn't know if her skin is actually improving or if she's just hoping"],
          desires: ["She wants a product that's honest about what it can and can't do", "She wants to know the real timeline before she commits"],
          beliefs: ["She believes most skincare marketing is dishonest about timelines", "She believes if a product worked, the brand wouldn't need to photoshop the results"],
        },
        vocab: [
          { hers: "I'm tired of products that promise results in 7 days", category: "Timeline scepticism" },
          { hers: "Show me what actually happens, not what they want me to see", category: "Proof demand" },
          { hers: "I've been burned too many times by skincare claims", category: "Brand trust deficit" },
          { hers: "I just want to know if it's actually worth it", category: "Purchase hesitation" },
        ],
        lives: ["r/SkincareAddiction", "YouTube skincare reviews", "Skincare TikTok #productreview", "INCI Decoder"],
      },
      angle: {
        name: "Timeline Honesty",
        tagline: "Honest 30-day timeline — sets realistic expectations and builds trust.",
        matters: "The skincare category is saturated with 7-day promises and heavily edited before/after photography. Authentic timeline documentation from a real user is the most credible content format in this segment.",
        beliefShift: "She currently thinks: 'Another serum making claims it can't back up.' We want her thinking: 'This brand is honest about what to expect — and that honesty makes me trust the results more.'",
      },
      hooks: [
        { letter: "A", type: "Timeline", line: "Documenting 30 days with a serum that's honest about what it can't do in week one.", note: "Lead with the unusual positioning — honesty about limitations builds trust faster than claims." },
        { letter: "B", type: "Proof", line: "Week one: nothing obvious. Week two: texture. Week four: I stopped checking every morning.", note: "Give the timeline upfront. Spoil the ending — it earns the watch." },
      ],
      script: {
        intro: "This video is a genuine 30-day documentation. It should feel like a journal entry, not a review. These are beats to guide the narrative — film in your own voice at each stage.",
        beats: [
          { time: "Day 1 (0:03–0:10)", label: "Honest start", body: "Start with your skin as it is. No filters, no flattering light. Set the honest baseline.", keyLine: "Starting today. I'm not expecting miracles in week one. I know that's not how skin works." },
          { time: "Week 1 (0:10–0:20)", label: "Nothing obvious yet", body: "Report honestly on week one — slight texture change, if anything. Resist the urge to oversell early progress.", keyLine: "Week one. No dramatic difference. Skin feels slightly more comfortable in the morning. That's it." },
          { time: "Week 2 (0:20–0:30)", label: "Texture shift", body: "This is where most honest users notice something. Texture becomes the story.", keyLine: "Week two. The texture is different. It feels more even — like my skin is less angry." },
          { time: "Week 4 (0:30–0:42)", label: "The real result", body: "Honest assessment at the end. What changed, what didn't.", keyLine: "Week four. I stopped checking every morning. That's actually the best sign — I wasn't hunting for results anymore." },
        ],
        notes: "The value of this video is in what you don't oversell. The 'nothing obvious' in week one is the most important beat — it's what makes everything after it credible.",
      },
      specs: { length: "38-48 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "Meta + TikTok", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Documentary-honest. Different filming setups at each week checkpoint — same spot but different lighting or outfit. Resist the urge to look more polished as the timeline progresses. Week 4 should not look more curated than day 1.",
      productNotes: "The Balance Serum (30ml frosted glass dropper bottle). Show it at each checkpoint. Application should look practiced by week 4 — like you've done it 30 times, because you have. No price mention.",
      avoid: "No dramatic transformation language. No 'completely changed my skin' claims. No before/after with same-day photos. Don't mention competitor products. Don't claim any medical benefit.",
      moodboard: ["Honest skincare documentation — r/SkincareAddiction 'one-month update' post energy", "Product journalist review tone — 'here's what actually happened'", "@abigailkingofficial month-long documentation style"],
    },
    submissions: [
      { id: "sub-b1", creatorId: "ella-kim", creatorName: "Ella Kim", title: "30-Day Timeline — Hook A", submittedAt: "Dec 28, 2025", duration: "46s", status: "approved", revisions: [] },
      { id: "sub-b2", creatorId: "ella-kim", creatorName: "Ella Kim", title: "30-Day Timeline — Hook B", submittedAt: "Dec 29, 2025", duration: "43s", status: "approved", revisions: [{ note: "Week two section is slightly rushed — add a beat after the texture observation. Otherwise excellent.", requestedAt: "Dec 30, 2025", resolvedAt: "Jan 1, 2026" }] },
    ],
  },

  "aurelia-spf-daily": {
    briefPack: {
      brand: {
        name: "Aurelia Skincare",
        category: "Skincare · SPF Protection",
        heroProduct: "Daily Shield SPF 50 ($44)",
        positioning: "Aurelia's entry into the SPF category. Positioned as the SPF that doesn't feel like SPF — lightweight, no white cast, designed for daily wear under makeup or alone.",
      },
      persona: {
        name: "The SPF Avoider",
        distillation: "She knows SPF is important. She keeps skipping it anyway because every product she's tried has let her down.",
        feels: {
          pain: ["Every SPF she's tried feels heavy, greasy, or leaves a white cast", "She's been skipping SPF by convincing herself her makeup has 'some' protection"],
          desires: ["She wants to actually use SPF every day without it ruining her routine", "She wants something that disappears into skin the way a serum does"],
          beliefs: ["She believes daily SPF always feels bad — it's just a fact of the product category", "She believes any SPF protection is better than no SPF protection"],
        },
        vocab: [
          { hers: "I skip SPF because every one I try feels like sunscreen", category: "Category friction" },
          { hers: "My foundation has SPF so I'm kind of protected", category: "Justification behaviour" },
          { hers: "I need something that doesn't feel like I'm wearing anything", category: "Weightless demand" },
          { hers: "The white cast is the dealbreaker for me", category: "Formula failure" },
        ],
        lives: ["r/SkincareAddiction SPF recommendations", "TikTok #spfmakeup", "Allure Beauty reviews", "YouTube SPF roundups"],
      },
      angle: {
        name: "SPF as Foundation Step",
        tagline: "Reframe SPF as the non-negotiable first step — not an add-on.",
        matters: "The segment that skips SPF isn't anti-SPF — they're anti-the-experience-of-using-SPF. Reframing Daily Shield as something that becomes the first step of the routine addresses the real objection.",
        beliefShift: "She currently thinks: 'SPF is an annoying extra step.' We want her thinking: 'This SPF is so lightweight it's become the first step of my routine — I forget it's there.'",
      },
      hooks: [
        { letter: "A", type: "Problem-first", line: "Every SPF I tried felt like wearing sunscreen. This one genuinely doesn't.", note: "Direct product claim earned by the common experience she recognizes." },
        { letter: "B", type: "Reframe", line: "I stopped skipping SPF when I found one that felt like a skincare step and not a sunscreen.", note: "Position the brand as the solution to her exact objection." },
      ],
      script: {
        intro: "Film it as a routine integration — show where the SPF fits into your actual morning routine.",
        beats: [
          { time: "0:03 – 0:12", label: "Acknowledge the problem", body: "Name what most SPFs do wrong — the texture, the cast, the greasy film.", keyLine: "Every SPF I've tried has either left a white cast, a greasy film, or felt heavy for hours. So I just... stopped using it." },
          { time: "0:12 – 0:25", label: "Introduce Daily Shield", body: "Apply it in your routine. Show the texture — pump it onto clean skin. Show how it absorbs.", keyLine: "This one goes on like a serum. No cast. No grease. It's just... gone in 30 seconds." },
          { time: "0:25 – 0:35", label: "Show the integration", body: "Continue your routine on top. Show that it doesn't interfere.", keyLine: "I put everything on top like normal. Nothing pilled, nothing slid. SPF 50 under my normal routine." },
          { time: "0:35 – 0:45", label: "Close with the habit", body: "End with the behaviour change — you're now doing SPF daily.", keyLine: "I've been doing SPF every single day for six weeks. That's never happened before." },
        ],
        notes: "The texture demonstration at 0:12 is the most important visual moment. Pump a proper amount — not a tiny test dot.",
      },
      specs: { length: "40-50 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "TikTok + Instagram", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Morning routine, natural bedroom or bathroom light. The SPF application should happen in context — after cleansing. Show real skin, not filtered skin.",
      productNotes: "Daily Shield SPF 50 in a 50ml frosted white pump bottle. The formula appears white in the bottle — it disappears on application. Show the pump, the texture on fingertips, and the absorption on skin. No price or code mentions.",
      avoid: "No white cast comparisons to named competitors. Don't say 'this cured my [skin condition].' No bare-skin before/after for SPF claims.",
      moodboard: ["@gothamista morning routine format — detailed but approachable", "TikTok GRWM SPF integration style", "Clean, editorial bathroom setup"],
    },
    submissions: [],
  },

  "lumen-acid": {
    briefPack: {
      brand: {
        name: "Lumen Co.",
        category: "Skincare · Acids",
        heroProduct: "The Acid Edit Kit ($62)",
        positioning: "A science-led indie skincare brand that believes acids are overcomplicated by the industry and underutilised by consumers. The Acid Edit Kit demystifies AHA, BHA, and PHA with a 3-product system designed for progressive use.",
      },
      persona: {
        name: "The Nervous Acid Beginner",
        distillation: "She's heard acids are amazing. She's also heard they burn and over-exfoliate. She's afraid to try.",
        feels: {
          pain: ["She's heard horror stories about acid over-exfoliation", "She doesn't understand AHA vs BHA vs PHA — the terminology feels like chemistry class"],
          desires: ["She wants the glowy skin she sees from people who use acids", "She wants someone to just tell her which one to use and when"],
          beliefs: ["She believes acids are too strong for her sensitive skin", "She believes she needs to understand the science before she can use them safely"],
        },
        vocab: [
          { hers: "I feel like I need a chemistry degree to understand acids", category: "Category intimidation" },
          { hers: "I'm scared to over-exfoliate — that's worse than not using them", category: "Fear of harm" },
          { hers: "Which acid is actually for me?", category: "Choice paralysis" },
          { hers: "I want the results but I don't want to wreck my skin barrier", category: "Outcome ambivalence" },
        ],
        lives: ["r/SkincareAddiction", "Paula's Choice skincare guide", "YouTube acid explainers", "TikTok #exfoliating"],
      },
      angle: {
        name: "Acid Mythbusting",
        tagline: "Break down AHA vs BHA vs PHA in plain language — demystify acids for the nervous buyer.",
        matters: "The acid category is inaccessible to a huge segment who are intimidated by terminology and afraid of damage. Lumen's 3-acid kit is uniquely positioned to serve this segment — but only if the creative removes the fear first.",
        beliefShift: "She currently thinks: 'Acids are complicated and risky.' We want her thinking: 'There are three types of acids, each does one simple thing, and there's a safe way to start. I can actually do this.'",
      },
      hooks: [
        { letter: "A", type: "Simplification", line: "There are three types of acids. AHAs dissolve dead skin on the surface. BHAs go into pores. PHAs do the same as AHAs but gently. That's the whole list.", note: "Start with the punchline. Demystification as the hook." },
        { letter: "B", type: "Misconception", line: "The reason most people are afraid of acids is the horror stories. The horror stories are all about over-exfoliation. Over-exfoliation is a scheduling problem, not an acid problem.", note: "Address the fear directly, reframe the cause." },
      ],
      script: {
        intro: "This is an education video, not a product demo. The product should emerge naturally from the explanation — not the other way around.",
        beats: [
          { time: "0:03 – 0:14", label: "The simple breakdown", body: "Explain AHA/BHA/PHA in one sentence each. No technical language.", keyLine: "AHA: the surface exfoliator. BHA: the pore cleaner. PHA: the sensitive-skin version of AHA. Three jobs. Three acids." },
          { time: "0:14 – 0:26", label: "Address the fear", body: "Over-exfoliation is real, but it's about frequency, not acid type. Calm the viewer.", keyLine: "The reason people wreck their skin barrier is using them every day. Start twice a week. That's the only rule that matters." },
          { time: "0:26 – 0:36", label: "Introduce the kit", body: "Show all three products. The kit is the solution to the choice paralysis.", keyLine: "This kit has all three. One for each job. You don't have to figure out which one to start with." },
          { time: "0:36 – 0:45", label: "The progression", body: "End with the progression — start slow, build up.", keyLine: "I started with the PHA twice a week. Four weeks later I added the AHA. That's the whole protocol." },
        ],
        notes: "Don't rush the explanation at 0:03–0:14. This is the most valuable minute the creator can give the viewer — make sure each acid's job is clear before moving on.",
      },
      specs: { length: "42-50 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "TikTok", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Conversational education. Film in your skincare space. The products should be visible and handled naturally. No dramatic filming — no quick cuts, no hype energy. Slow and clear wins for education content.",
      productNotes: "The Acid Edit Kit contains three 30ml frosted glass vials: AHA Glow (blue label), BHA Clear (green label), PHA Gentle (pink label). Show all three at once at the 0:26 mark.",
      avoid: "No fear language about acids without immediately neutralising it. No skin barrier horror content. Don't name competitor products. Don't recommend specific frequencies beyond 'start twice a week'.",
      moodboard: ["@labmuffinbeautyscience TikTok education format — simple, visual, no nonsense", "Chemistry teacher energy but make it beauty — clear analogies over terminology", "Product-on-shelf education setup"],
    },
    submissions: [],
  },

  "lumen-intro": {
    briefPack: {
      brand: {
        name: "Lumen Co.",
        category: "Skincare · Starter Kit",
        heroProduct: "Starter Kit ($54)",
        positioning: "Lumen Co. is a science-backed indie skincare brand entering the awareness phase. The Starter Kit — cleanser, hydrating toner, and lightweight moisturizer — is the entry point for consumers ready to graduate from drugstore basics without spending Sephora-tier money.",
      },
      persona: {
        name: "The Skincare Upgrader",
        distillation: "She's outgrown her drugstore routine. She doesn't know where to start with something better.",
        feels: {
          pain: ["Her current products work but don't deliver the skin she sees on skincare TikTok", "Every 'luxury' brand she's looked at is over $100 for one product"],
          desires: ["She wants a simple, effective routine without the research rabbit hole", "She wants results she can point to without a 10-step system"],
          beliefs: ["She believes good skincare has to be expensive", "She believes indie brands are risky — what if they don't work?"],
        },
        vocab: [
          { hers: "I've been using the same cleanser since high school", category: "Routine stagnation" },
          { hers: "I don't want to spend $80 on a moisturizer that might not work", category: "Premium risk aversion" },
          { hers: "I need someone to just tell me what to use", category: "Choice paralysis" },
          { hers: "Skincare TikTok is overwhelming — everyone says something different", category: "Category noise fatigue" },
        ],
        lives: ["TikTok #skincareroutine", "r/SkincareAddiction beginner posts", "YouTube skincare beginner guides", "Wirecutter skincare reviews"],
      },
      angle: {
        name: "Science-Backed Simplicity",
        tagline: "The lab brand you can actually afford.",
        matters: "The skincare upgrader segment is large and underserved — they want better without the premium price and without the research overwhelm. Lumen's starter kit bridges drugstore and luxury.",
        beliefShift: "She currently thinks: 'Good skincare = expensive skincare. Indie brands are a gamble.' We want her thinking: 'This brand is built on actual science, costs half what Sephora charges, and the kit does the deciding for me.'",
      },
      hooks: [
        { letter: "A", type: "Positioning", line: "This is the brand I wish existed when I was trying to upgrade from drugstore skincare. Lab-formulated, simple, and not $80 a bottle.", note: "Lead with the position — bridges the drugstore-to-luxury gap clearly." },
        { letter: "B", type: "Value", line: "I spent three months researching skincare. This kit would have saved me the research and probably $200.", note: "Retroactive value — speaks directly to the overwhelm she's felt." },
      ],
      script: {
        intro: "Film as a genuine introduction — as if you're telling a friend who's been asking about skincare where to start.",
        beats: [
          { time: "0:03 – 0:12", label: "The gap it fills", body: "Name the problem — too advanced for drugstore, can't justify Sephora prices.", keyLine: "There's a huge gap between Cetaphil and La Mer. Lumen lives in it. Science-backed, not status-branded." },
          { time: "0:12 – 0:24", label: "The kit itself", body: "Show all three products. Explain briefly what each does.", keyLine: "Cleanser, hydrating toner, lightweight moisturizer. That's a complete routine. You don't need five other things." },
          { time: "0:24 – 0:36", label: "The science bit", body: "Reference one key ingredient or formulation choice — one fact that signals this is serious.", keyLine: "The cleanser is pH-balanced. The toner has panthenol. The moisturizer has ceramides. That's your barrier." },
          { time: "0:36 – 0:45", label: "The close", body: "End with the decision simplicity.", keyLine: "I've been using it for two months. My skin barrier is actually healthy for the first time. And I didn't have to read 40 Reddit threads to get here." },
        ],
        notes: "Don't oversell the science — one clear fact is more credible than a list of ingredients. The tone should be 'I did the research so you don't have to.'",
      },
      specs: { length: "40-48 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "Meta", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Skincare shelf or bathroom setup — products arranged naturally, not styled. The intro should feel like you're showing someone your routine, not presenting a product.",
      productNotes: "Starter Kit: Daily Cleanse (150ml pump, matte white bottle), Barrier Toner (100ml spray, clear bottle), Lightweight Moisturizer (50ml jar, frosted glass). Show all three together at the start.",
      avoid: "No 'holy grail' language. No claims about treating specific skin conditions. Don't compare directly to named luxury brands by price. No polished product photography aesthetic.",
      moodboard: ["Skincare shelf tour format — @skin.by.tiph IG style, organized but real", "Routine walkthrough energy — products used in sequence, not posed", "Direct-to-camera explanation — friend telling you what to buy, not influencer presenting"],
    },
    submissions: [
      { id: "sub-c1", creatorId: "jade-liu", creatorName: "Jade Liu", title: "Brand Intro — Hook A", submittedAt: "Dec 12, 2025", duration: "45s", status: "approved", revisions: [] },
      { id: "sub-c2", creatorId: "jade-liu", creatorName: "Jade Liu", title: "Brand Intro — Hook B", submittedAt: "Dec 13, 2025", duration: "44s", status: "approved", revisions: [{ note: "The value comparison at 0:36 felt slightly rehearsed — re-film that beat more conversationally. Everything else perfect.", requestedAt: "Dec 14, 2025", resolvedAt: "Dec 15, 2025" }] },
    ],
  },

  "bloomline-founder": {
    briefPack: {
      brand: {
        name: "Bloomline",
        category: "Skincare · Core Routine",
        heroProduct: "Core Routine Set ($79)",
        positioning: "An indie skincare brand built on founder transparency. Every product comes with a 'what this does' and 'what this doesn't do' section. The brand differentiator is radical honesty.",
      },
      persona: {
        name: "The Trust-First Buyer",
        distillation: "She's been deceived by brand marketing so many times she now defaults to scepticism. She buys from brands that feel honest.",
        feels: {
          pain: ["She's bought products based on marketing claims that turned out to be empty", "She spends hours researching brands before buying anything"],
          desires: ["She wants a brand she can just trust without the research process", "She wants a founder she can actually believe in"],
          beliefs: ["She believes most skincare brands are more marketing than product", "She believes honesty is rare in the beauty industry — and valuable when it exists"],
        },
        vocab: [
          { hers: "I read every ingredient list before I buy", category: "Pre-purchase due diligence" },
          { hers: "If a brand won't tell me what the product can't do, I don't trust what it says it can", category: "Transparency demand" },
          { hers: "I found this brand because someone I trust recommended it", category: "Social proof dependency" },
          { hers: "The founder actually talked about the reformulation publicly — that's rare", category: "Brand honesty appreciation" },
        ],
        lives: ["r/SkincareAddiction", "INCI Decoder power users", "Brand founder newsletters", "Ethical beauty review blogs"],
      },
      angle: {
        name: "Founder Transparency",
        tagline: "Founder's honest story — transparency as the brand differentiator.",
        matters: "Bloomline's brand identity is radical honesty. The creative should channel that — a conversation that acknowledges what the product doesn't do alongside what it does. The founder's story told through the creator's discovery of it is the format.",
        beliefShift: "She currently thinks: 'Another skincare brand with claims I can't trust.' We want her thinking: 'This brand publishes what their products can't do. That's the thing that makes me actually trust what they say they can.'",
      },
      hooks: [
        { letter: "A", type: "Discovery", line: "I found a skincare brand that lists what its products can't do on the packaging. That's the one I trust.", note: "Lead with the unusual differentiator. Let the listener complete the logic." },
        { letter: "B", type: "Founder story", line: "The founder started this brand because she was tired of being lied to by the skincare industry. She built the honest version.", note: "Founder narrative builds immediate emotional connection." },
      ],
      script: {
        intro: "Tell the Bloomline story through your experience of discovering it. This isn't a product demo — it's a trust transfer.",
        beats: [
          { time: "0:03 – 0:12", label: "The discovery", body: "How you found Bloomline and what made it different — the 'what this doesn't do' packaging moment.", keyLine: "I was looking at the back of the box and they had a section called 'what this doesn't do.' I'd never seen that before." },
          { time: "0:12 – 0:24", label: "The founder story", body: "Brief summary of the founding story — built on the frustration of being misled by mainstream skincare.", keyLine: "The founder started this because she knew half the claims in the industry were unsupported. She built the version she'd actually trust." },
          { time: "0:24 – 0:36", label: "The product itself", body: "Show the Core Routine Set — cleanser, serum, moisturizer.", keyLine: "The routine set has three products. They do what they say. I've been using it for six weeks." },
          { time: "0:36 – 0:45", label: "The trust close", body: "End with why you tell people about this specifically.", keyLine: "I recommend brands that earn my trust. Bloomline earned it by being honest about what it can't do." },
        ],
        notes: "The packaging moment at 0:03 is the hook within the hook — hold the box in frame so the viewer can see 'what this doesn't do' even if they can't read it clearly.",
      },
      specs: { length: "40-48 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "Instagram", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Thoughtful and sincere. Not fast-paced. Film at home. Steady camera. The creator should feel like a trusted friend sharing a genuine discovery, not performing enthusiasm.",
      productNotes: "Core Routine Set in a white-and-beige box, matte finish. Inside: Daily Cleanse (100ml), Repair Serum (30ml dropper), Barrier Moisturizer (50ml jar). The 'what this doesn't do' copy is on the side panel of each product — make sure it's briefly visible.",
      avoid: "No superlatives — 'best', 'holy grail', 'amazing', 'obsessed'. No energy or enthusiasm performance. Don't oversell the results — the angle is trust, not transformation. Don't mention competitor brands by name.",
      moodboard: ["Slow, considered skincare discovery — Instagram story review style", "Brand investigation energy — 'let me show you what I found' format", "Trust-first voice — like Wirecutter reviewing beauty products, not an influencer"],
    },
    submissions: [
      { id: "sub-d1", creatorId: "jade-liu", creatorName: "Jade Liu", title: "Founder Transparency — Hook A", submittedAt: "Jan 10, 2026", duration: "43s", status: "pending", revisions: [] },
    ],
  },

  "saltsea-costperuse": {
    briefPack: {
      brand: {
        name: "Salt & Sea",
        category: "Body Care · Premium Scrub",
        heroProduct: "Sea Salt Scrub ($38)",
        positioning: "A premium body care brand for consumers who take their skin seriously head-to-toe. The Sea Salt Scrub is mineral-rich, refillable, and priced at a premium — but the refill system makes it cheaper per use than most drugstore alternatives.",
      },
      persona: {
        name: "The Value-Conscious Premium Buyer",
        distillation: "She wants premium quality but thinks carefully about what she spends. She's not against the price — she needs the math to work first.",
        feels: {
          pain: ["She feels guilty spending $38 on a body scrub when she can get one at Target for $12", "She doesn't know if premium body care actually makes a difference"],
          desires: ["She wants body care that genuinely works, not just smells good", "She wants to feel good about spending more when the quality justifies it"],
          beliefs: ["She believes price-per-use math matters more than sticker price", "She believes premium packaging sometimes hides mediocre product"],
        },
        vocab: [
          { hers: "Is this actually worth the price?", category: "Value interrogation" },
          { hers: "I need the math to make sense before I spend that much", category: "Cost justification" },
          { hers: "I'd rather spend more once than buy three cheap ones that don't work", category: "Premium value logic" },
          { hers: "Show me how far it actually lasts", category: "Longevity demand" },
        ],
        lives: ["Wirecutter beauty reviews", "r/femalefashionadvice body care threads", "TikTok #productreview worth it?", "Buy-it-for-life subreddits"],
      },
      angle: {
        name: "Cost Per Use Math",
        tagline: "Show the price-per-use math — reframe the premium cost as a value argument.",
        matters: "The $38 price creates sticker shock for a value-conscious segment. The creative does the math publicly — a jar lasts 6–8 weeks, making the cost-per-use competitive. This reframe works best when it feels like the creator did the math themselves.",
        beliefShift: "She currently thinks: '$38 for a body scrub is expensive — I'll pass.' We want her thinking: 'I've been buying three $12 scrubs a year. This is the same price and genuinely better. The math actually works.'",
      },
      hooks: [
        { letter: "A", type: "Math reveal", line: "I calculated the cost per use on this $38 body scrub. It's cheaper than what I was buying at Target.", note: "Lead with the surprising conclusion. Let the video prove it." },
        { letter: "B", type: "Objection address", line: "I thought $38 for a body scrub was insane. Then I counted how many times I used it.", note: "Start with her objection, resolve it with data." },
      ],
      script: {
        intro: "This video should feel like you're doing the math live, not presenting a pre-made conclusion. The calculation is the content.",
        beats: [
          { time: "0:03 – 0:12", label: "Set the price objection", body: "Acknowledge the sticker price directly. Don't minimize it.", keyLine: "$38. I know. I had the same reaction. That's a lot for a body scrub." },
          { time: "0:12 – 0:26", label: "Show the jar size", body: "Hold up the jar. Open it — show how much product is inside.", keyLine: "Here's how much is in this jar. I've been using it 3 times a week for six weeks. This is how much is left." },
          { time: "0:26 – 0:36", label: "Do the math", body: "Calculate out loud. 6 weeks × 3 times = 18 uses. $38 ÷ 18 = $2.11 per use.", keyLine: "That's $2 per use. The Target one I was buying? $12 for about 8 uses. Not actually cheaper — but the quality is different." },
          { time: "0:36 – 0:45", label: "The quality point", body: "End with the quality difference that makes the comparison favor Salt & Sea.", keyLine: "It's also refillable. So the second jar costs less. And the product itself is mineral-dense, not mostly filler." },
        ],
        notes: "The math beat at 0:26 should feel live and slightly messy — like you're actually doing it. Pre-calculating and presenting it cleanly makes it feel rehearsed.",
      },
      specs: { length: "40-48 seconds", aspect: "9:16 vertical", format: "MP4 or MOV, 1080×1920 min", platforms: "Instagram + TikTok", deliverables: "2 hook variants = 2 full videos total" },
    },
    references: {
      directions: "Authentic product usage environment — bathroom, shower area. Handle the jar naturally — it should feel like you've used it many times. The math section should feel slightly off-the-cuff, not scripted.",
      productNotes: "Sea Salt Scrub in a 250ml amber glass jar with a wide mouth. The texture is visibly granular. Open the jar on camera and show the product. Show scoop application — the brand provides a bamboo spatula.",
      avoid: "Don't exaggerate longevity claims beyond what you've personally experienced. Don't say 'worth every penny.' Don't position it as a luxury indulgence — the angle is value math. No competitor brand names.",
      moodboard: ["Wirecutter-style product review format — honest, data-driven, no fluff", "Cost-per-use TikTok approach", "Real usage environment — wet bathroom surfaces, natural post-shower lighting"],
    },
    submissions: [],
  },
};
