import type { BlogCategory, BlogPost } from "@/lib/types";

/** Hub filter categories (chip order). */
export const blogCategories: BlogCategory[] = [
  { slug: "parenting", name: "Parenting" },
  { slug: "safety", name: "Safety" },
  { slug: "montessori", name: "Montessori" },
  { slug: "play", name: "Play" },
];

/** 6 mock posts. Each body has 4–6 blocks incl. at least one `h2` and one `ul`. */
export const blogPosts: BlogPost[] = [
  {
    slug: "language-of-play-talking-to-toddlers",
    title: "The language of play: talking with your toddler",
    excerpt:
      "Narrating play builds vocabulary faster than flashcards — and it's a lot more fun for both of you.",
    category: "parenting",
    dateISO: "2026-01-26",
    readMins: 7,
    coverTone: "neem-soft",
    coverLabel: "Talk & Play",
    coverImage: "/images/blog/language-of-play-cover.png",
    author: "Nabila Chowdhury",
    featured: true,
    body: [
      {
        type: "p",
        text: "Long before toddlers can hold a conversation, they're soaking up every word said around them. Play is the easiest place to pour language in.",
      },
      { type: "h2", text: "Narrate, don't quiz" },
      {
        type: "p",
        text: "Instead of asking 'what colour is this?', describe what your child is doing: 'You stacked the big red ring on top.' Description invites; quizzing pressures.",
      },
      {
        type: "ul",
        items: [
          "Follow their attention — talk about what they're looking at",
          "Use real words, not baby words, for objects",
          "Leave pauses — silence gives them room to answer",
        ],
      },
      {
        type: "p",
        text: "Ten minutes of narrated play a day adds up to a remarkable vocabulary by age three.",
      },
      { type: "h2", text: "Widen the words you use" },
      {
        type: "p",
        text: "Toddlers understand far more than they can say, so don't shrink your vocabulary to match their speech. Reach for the specific word — 'enormous', 'gently', 'balancing' — and let them grow into it.",
      },
      {
        type: "ul",
        items: [
          "Name feelings as they happen: 'That was frustrating, wasn't it?'",
          "Add describing words: not just 'ball', but 'the bumpy blue ball'",
          "Use position words in play: under, behind, on top, between",
        ],
      },
      { type: "h2", text: "Turn-taking is a conversation too" },
      {
        type: "p",
        text: "Rolling a ball back and forth, or handing blocks to each other, teaches the rhythm of conversation before any words are exchanged: I go, then you go, then I go again.",
      },
      {
        type: "p",
        text: "You don't need a special programme or a set of flashcards. The most powerful language tool you own is your own running commentary during ordinary play.",
      },
    ],
  },
  {
    slug: "montessori-toys-first-year",
    title: "5 Montessori toys for the first year",
    excerpt:
      "Simple, open-ended toys that match your baby's development from grasping to first steps.",
    category: "montessori",
    dateISO: "2026-05-02",
    readMins: 8,
    coverTone: "mustard",
    coverLabel: "First Year",
    coverImage: "/images/blog/montessori-first-year-cover-20260713.png",
    author: "Farhan Ahmed",
    body: [
      {
        type: "p",
        text: "Montessori toys aren't about flashing lights or batteries. They're simple objects that invite a baby to explore one idea at a time.",
      },
      { type: "h2", text: "Matching toys to milestones" },
      {
        type: "p",
        text: "In the first year a baby moves from tracking objects with their eyes, to grasping, then to sitting and pulling up. The right toy meets them where they are.",
      },
      {
        type: "ul",
        items: [
          "0–3m: high-contrast cards and a soft rattle",
          "3–6m: grasping rings and textured balls",
          "6–9m: stacking cups and an object-permanence box",
          "9–12m: a push trolley for early standing",
        ],
      },
      { type: "h2", text: "Less is more" },
      {
        type: "p",
        text: "Rotate a small set of toys instead of offering everything at once. Fewer choices help a baby focus and play for longer.",
      },
      { type: "h2", text: "The five we'd start with" },
      {
        type: "p",
        text: "If you're building a first collection from scratch, these five cover the whole first year without overlapping:",
      },
      {
        type: "ul",
        items: [
          "A wooden grasping rattle — light, easy to hold, gently noisy",
          "A set of stacking rings for early problem-solving",
          "Nesting cups that work for stacking, sorting and bath play",
          "An object-permanence box to explore 'gone' and 'back again'",
          "A push trolley or wagon for those first wobbly steps",
        ],
      },
      { type: "h2", text: "Follow the child, not the calendar" },
      {
        type: "p",
        text: "Milestones are a guide, not a schedule. Some babies grasp early and stand late; others do the reverse. Offer a toy, watch how they use it, and let their interest — not the month on the box — tell you when to move on.",
      },
      {
        type: "p",
        text: "The clearest sign a toy is right isn't a manufacturer's age label. It's a baby who returns to it again and again, working quietly at something only they can see.",
      },
    ],
  },
  {
    slug: "choosing-toys-by-age",
    title: "Choosing toys by your child's age",
    excerpt:
      "A quick framework for picking toys that are challenging enough to engage, but never frustrating.",
    category: "parenting",
    dateISO: "2026-04-20",
    readMins: 7,
    coverTone: "dusty-blue",
    coverLabel: "By Age",
    coverImage: "/images/blog/choosing-toys-by-age-cover-20260713.png",
    author: "Tasnim Akter",
    body: [
      {
        type: "p",
        text: "The best toy is one that sits just ahead of what your child can already do — interesting, but not impossible.",
      },
      { type: "h2", text: "The 'just-right' challenge" },
      {
        type: "p",
        text: "Toys that are too easy get ignored; toys that are too hard get abandoned. Aim for the sweet spot in between.",
      },
      {
        type: "ul",
        items: [
          "Babies: cause-and-effect toys that respond to a simple action",
          "Toddlers: stacking, sorting and posting toys",
          "Older toddlers: simple puzzles and pretend-play sets",
        ],
      },
      {
        type: "p",
        text: "When in doubt, watch your child for a few minutes. They'll show you what they're working on.",
      },
      { type: "h2", text: "Reading the signs of readiness" },
      {
        type: "p",
        text: "A child usually tells you they've outgrown a toy long before you notice it consciously. The toy gets used in a rougher, faster or more inventive way — or it stops being touched at all.",
      },
      {
        type: "ul",
        items: [
          "Boredom: the toy is ignored or abandoned within seconds",
          "Frustration: repeated failing, then throwing or walking away",
          "Mastery: the toy is used fluently, almost absent-mindedly",
        ],
      },
      {
        type: "p",
        text: "Mastery is your cue to introduce a slightly harder version of the same idea — bigger puzzles, more pieces, a new twist on a familiar game.",
      },
      { type: "h2", text: "Why age labels only go so far" },
      {
        type: "p",
        text: "Printed age ranges are set mostly for safety and averages, not for your particular child. Treat them as a floor for small-part safety, then trust what you see in front of you.",
      },
      {
        type: "p",
        text: "A toy that grows with your child — one that can be played with simply now and in more complex ways later — is almost always a better buy than one tuned to a single narrow age.",
      },
    ],
  },
  {
    slug: "open-ended-play-matters",
    title: "Open-ended play: why it matters",
    excerpt:
      "Blocks, scarves and cups can become a hundred different games — and that's exactly the point.",
    category: "play",
    dateISO: "2026-04-08",
    readMins: 6,
    coverTone: "terracotta",
    coverLabel: "Open Play",
    coverImage: "/images/blog/open-ended-play-cover-20260713.png",
    author: "Nabila Chowdhury",
    body: [
      {
        type: "p",
        text: "Open-ended toys have no single 'right' way to play. A wooden block can be a phone, a car, a cake or a tower.",
      },
      { type: "h2", text: "What open-ended play builds" },
      {
        type: "ul",
        items: [
          "Imagination and storytelling",
          "Problem-solving and planning",
          "Independent, screen-free focus",
        ],
      },
      {
        type: "p",
        text: "Because the child sets the goal, they stay engaged far longer than they would with a single-purpose toy.",
      },
      { type: "h2", text: "What counts as open-ended" },
      {
        type: "p",
        text: "The test is simple: can the toy become more than one thing? A block, a scarf, a wooden bowl and a basket of pinecones all pass. A plastic toy with a single button and a single sound does not.",
      },
      {
        type: "ul",
        items: [
          "Blocks and stacking pieces — towers, roads, walls, animals",
          "Scarves and cloths — capes, rivers, blankets, hiding places",
          "Cups and bowls — sorting, pouring, nesting, pretend cooking",
          "Loose natural parts — stones, shells and cones for counting",
        ],
      },
      { type: "h2", text: "How to support it without taking over" },
      {
        type: "p",
        text: "The hardest part for adults is staying quiet. Resist the urge to show the 'right' way or to narrate a better idea. Offer the materials, sit nearby, and let the child lead.",
      },
      {
        type: "p",
        text: "When play stalls, a single open question — 'I wonder what else that could be?' — reopens the door without handing over the answer.",
      },
    ],
  },
  {
    slug: "how-we-keep-toys-non-toxic",
    title: "How we keep our toys non-toxic",
    excerpt:
      "From raw timber to finished toy, here's every step we take to keep our toys safe to chew.",
    category: "safety",
    dateISO: "2026-03-25",
    readMins: 7,
    coverTone: "neem",
    coverLabel: "Non-Toxic",
    coverImage: "/images/blog/non-toxic-toys-cover-20260713.png",
    author: "Rafiul Hasan",
    body: [
      {
        type: "p",
        text: "Non-toxic isn't a label we add at the end — it's a decision made at every stage of how a toy is built.",
      },
      { type: "h2", text: "Our material rules" },
      {
        type: "ul",
        items: [
          "Sustainably sourced neem and hardwoods only",
          "Food-grade oil finishes, never varnish or paint",
          "Water-based, child-safe colours where colour is used",
        ],
      },
      { type: "h2", text: "Testing before it ships" },
      {
        type: "p",
        text: "Every batch is checked for smooth edges, secure parts and a clean finish before it reaches your home.",
      },
      { type: "h2", text: "From tree to toy" },
      {
        type: "p",
        text: "The journey starts with the timber itself. We work only with sustainably grown neem and hardwoods, seasoned slowly so the wood is stable and won't crack once it's in a child's hands.",
      },
      {
        type: "ul",
        items: [
          "Sourcing: responsibly grown neem and hardwood, no offcuts of unknown origin",
          "Shaping: sanded through progressively finer grits until glass-smooth",
          "Finishing: food-grade oil rubbed in by hand, then buffed",
          "Inspection: every piece checked by hand before it's boxed",
        ],
      },
      { type: "h2", text: "What we leave out" },
      {
        type: "p",
        text: "Just as important as what goes in is what never does: no PVC, no BPA, no phthalates, no chemical varnishes and no lead-based colours. Where we use colour at all, it's water-based and child-safe.",
      },
      {
        type: "p",
        text: "Non-toxic isn't a marketing badge for us — it's the quiet default behind every decision, because these toys are made to be chewed, dropped, loved and handed down.",
      },
    ],
  },
  {
    slug: "screen-free-play-ideas",
    title: "Screen-free play ideas for toddlers",
    excerpt:
      "Ten-minute, no-screen activities that keep toddlers busy using things you already own.",
    category: "parenting",
    dateISO: "2026-03-10",
    readMins: 8,
    coverTone: "blush",
    coverLabel: "Screen-Free",
    coverImage: "/images/blog/screen-free-play-ideas-cover-20260713.png",
    author: "Tasnim Akter",
    body: [
      {
        type: "p",
        text: "Screen-free time doesn't have to mean elaborate setups. Some of the best activities use what's already in the kitchen drawer.",
      },
      { type: "h2", text: "Easy ideas to try today" },
      {
        type: "ul",
        items: [
          "A 'posting' game with a box and bottle lids",
          "Stacking and nesting measuring cups",
          "A basket of safe household objects to explore",
          "Simple pretend play — feeding a toy or a teddy",
        ],
      },
      {
        type: "p",
        text: "Rotate two or three of these through the week so they stay fresh.",
      },
      { type: "h2", text: "For when you need five quiet minutes" },
      {
        type: "p",
        text: "Some days you just need your hands free for a moment. These setups buy you a little calm without a screen:",
      },
      {
        type: "ul",
        items: [
          "A muffin tin and a handful of pompoms to sort by colour",
          "Painter's-tape 'roads' on the floor for toy cars",
          "A bowl of water and a sponge on a towel — endless pouring",
          "Stickers and a sheet of paper, no rules attached",
        ],
      },
      { type: "h2", text: "Let boredom do its work" },
      {
        type: "p",
        text: "It's tempting to jump in the moment a toddler says they're bored. But that flat, restless feeling is the exact starting point for imagination — it's the child's brain casting around for its own idea.",
      },
      {
        type: "p",
        text: "The goal isn't to fill every minute — a little boredom sparks a lot of creativity.",
      },
    ],
  },
  {
    slug: "montessori-play-corner-at-home",
    title: "Setting up a Montessori play corner at home",
    excerpt:
      "A low shelf, a small rug and a few chosen toys — how to build a play space your child can own.",
    category: "montessori",
    dateISO: "2026-02-24",
    readMins: 7,
    coverTone: "wood",
    coverLabel: "Play Corner",
    coverImage: "/images/blog/montessori-play-corner-cover-v2.png",
    author: "Farhan Ahmed",
    body: [
      {
        type: "p",
        text: "A Montessori play corner isn't about buying furniture — it's about arranging what you have so your child can reach, choose and put back on their own.",
      },
      { type: "h2", text: "The three essentials" },
      {
        type: "ul",
        items: [
          "A low, open shelf your child can see into",
          "A small rug or mat that frames the play space",
          "Six to eight toys on display — the rest stored away",
        ],
      },
      { type: "h2", text: "Keep it child-height" },
      {
        type: "p",
        text: "Everything your child is allowed to use should be within their reach. If they need to ask for it, it may as well not be there.",
      },
      {
        type: "p",
        text: "Rotate the shelf every week or two. A 'new' toy from the cupboard is often more exciting than one from the shop.",
      },
      { type: "h2", text: "Give everything a home" },
      {
        type: "p",
        text: "In a Montessori space, every toy has one clear place to live. A tray, a basket or a marked spot on the shelf tells the child exactly where something belongs — which is what turns tidying up into part of the play rather than a chore.",
      },
      {
        type: "ul",
        items: [
          "One activity per tray or basket, not a jumble in a big box",
          "Open shelves, not toy chests you have to dig through",
          "A small basket for 'in-progress' work your child wants to return to",
        ],
      },
      { type: "h2", text: "Let it evolve" },
      {
        type: "p",
        text: "A play corner is never really finished. As your child grows, the shelf height, the toys and the amount of choice all shift with them. Watch what they reach for and what they walk past, and let the space quietly follow their lead.",
      },
      {
        type: "p",
        text: "Start small — a single shelf and a rug is plenty. The magic isn't in the furniture; it's in a space your child can call their own.",
      },
    ],
  },
  {
    slug: "caring-for-wooden-toys",
    title: "Caring for wooden toys: a simple guide",
    excerpt:
      "Wooden toys can last a generation with five minutes of care a month. Here's the whole routine.",
    category: "safety",
    dateISO: "2026-02-08",
    readMins: 6,
    coverTone: "cream",
    coverLabel: "Toy Care",
    coverImage: "/images/blog/caring-for-wooden-toys-cover.png",
    author: "Rafiul Hasan",
    body: [
      {
        type: "p",
        text: "One of the best things about wooden toys is how little care they actually need. A quick routine keeps them clean, smooth and safe to chew.",
      },
      { type: "h2", text: "The monthly five-minute routine" },
      {
        type: "ul",
        items: [
          "Wipe with a barely-damp cloth — never soak wood",
          "Air-dry fully before the toy goes back on the shelf",
          "Re-oil with a food-grade oil when the wood looks dry",
        ],
      },
      {
        type: "p",
        text: "Skip harsh sprays and disinfectants. Neem wood is naturally antibacterial, so soap and water is all it ever needs.",
      },
      {
        type: "p",
        text: "Check seams and edges while you clean — a quick look each month catches wear long before it becomes a hazard.",
      },
      { type: "h2", text: "Dealing with the everyday stuff" },
      {
        type: "p",
        text: "Wooden toys live real lives — they get drooled on, dropped and left out in the garden. Most of it wipes away, and the small marks that stay are part of a well-loved toy's story.",
      },
      {
        type: "ul",
        items: [
          "Sticky mess: a cloth wrung out in warm, soapy water, then a dry wipe",
          "A rough patch: a light pass with fine sandpaper, then re-oil",
          "Water marks: let the toy dry fully, then buff with a little oil",
        ],
      },
      { type: "h2", text: "When to retire a toy" },
      {
        type: "p",
        text: "Good wooden toys rarely wear out, but do step in if you ever spot a crack that could pinch fingers, a piece that has worked loose, or a splinter that won't sand away. Until then, a little oil and a soft cloth will keep it going for years.",
      },
      {
        type: "p",
        text: "Cared for gently, a wooden toy easily outlasts childhood — and often ends up in a keepsake box rather than a bin.",
      },
    ],
  },
  {
    slug: "neem-wood-safe-for-teething",
    title: "Why neem wood is safe for teething babies",
    excerpt:
      "Neem is naturally antibacterial and splinter-resistant — here's why it's a parent-favourite for teethers.",
    category: "safety",
    dateISO: "2026-05-12",
    readMins: 7,
    coverTone: "neem-soft",
    coverLabel: "Neem Wood",
    coverImage: "/images/blog/neem-wood-safe-for-teething.png",
    author: "Nabila Chowdhury",
    body: [
      {
        type: "p",
        text: "When a baby starts teething, everything goes straight to the mouth. That makes the material of a teether just as important as its shape.",
      },
      { type: "h2", text: "Why neem wood?" },
      {
        type: "p",
        text: "Neem is a dense hardwood with naturally antibacterial properties. It resists moisture and doesn't splinter easily, which makes it a gentle surface for sore gums.",
      },
      {
        type: "ul",
        items: [
          "Naturally antibacterial — no chemical coating needed",
          "Smooth, splinter-resistant grain",
          "Light enough for small hands to hold",
        ],
      },
      {
        type: "p",
        text: "We finish every teether with food-grade oil and nothing else, so there's no varnish or paint to worry about.",
      },
      { type: "h2", text: "What makes neem different" },
      {
        type: "p",
        text: "Neem (Azadirachta indica) has been used across South Asia for centuries — its twigs were the original toothbrush long before nylon bristles existed. That same antibacterial quality is why it stands up so well to hours of enthusiastic chewing.",
      },
      {
        type: "p",
        text: "Because the wood is dense and close-grained, it doesn't soak up saliva the way softer woods do. It stays firm, keeps its shape, and won't turn soft or fuzzy at the edges after weeks of daily use.",
      },
      { type: "h2", text: "How to choose a safe teether" },
      {
        type: "p",
        text: "Not every wooden teether is made to the same standard. Before you hand one to a baby, run through a quick checklist:",
      },
      {
        type: "ul",
        items: [
          "One solid piece of wood — no glued joints that can loosen",
          "A food-grade oil finish, never paint, lacquer or varnish",
          "Smooth, rounded edges with no splinters or rough spots",
          "Large enough that it can't be swallowed, light enough to lift",
        ],
      },
      { type: "h2", text: "Caring for a wooden teether" },
      {
        type: "p",
        text: "Wipe it clean with a damp cloth and let it air-dry fully — never leave it soaking or run it through the dishwasher, as prolonged water raises the grain. Every few weeks, a thin coat of food-grade oil brings back the smooth, satiny surface.",
      },
      {
        type: "p",
        text: "Looked after this way, a single neem teether will comfortably see a baby through the whole teething stage — and often gets passed down to the next little one in the family.",
      },
    ],
  },
];

/** Resolve a post by slug (used by the dynamic route). */
export const blogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

/** Human-readable category name for a slug (falls back to the slug). */
export const categoryName = (slug: string): string =>
  blogCategories.find((c) => c.slug === slug)?.name ?? slug;

/**
 * Previous / next article relative to `post`, in the blogPosts array order
 * (newest first). "Previous" = the newer post, "next" = the older one.
 */
export const adjacentPosts = (
  post: BlogPost,
): { prev?: BlogPost; next?: BlogPost } => {
  const i = blogPosts.findIndex((p) => p.slug === post.slug);
  if (i === -1) return {};
  return { prev: blogPosts[i - 1], next: blogPosts[i + 1] };
};

/**
 * Related posts: same category first, then fill with the most recent others,
 * always excluding the current post. Guarantees a non-empty result (up to limit).
 */
export const relatedPosts = (post: BlogPost, limit = 3): BlogPost[] =>
  blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(
      blogPosts
        .filter((p) => p.slug !== post.slug && p.category !== post.category)
        .sort((a, b) => b.dateISO.localeCompare(a.dateISO)),
    )
    .slice(0, limit);
