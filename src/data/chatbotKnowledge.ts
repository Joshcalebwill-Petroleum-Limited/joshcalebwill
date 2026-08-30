export type ChatIntent = {
  id: string;
  /** Keywords / phrases (lowercase) that trigger this answer */
  patterns: string[];
  answer: string;
};

export const chatbotWelcome =
  "Hello! I'm the Joshcalebwill assistant. Ask me about our services, location, hours, HSE, careers, or how to contact us.";

/** Structured knowledge — easy to edit without an AI API */
export const intents: ChatIntent[] = [
  {
    id: "greeting",
    patterns: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
    ],
    answer:
      "Hi there! How can I help you today? You can ask about our services, office location, business hours, or how to get in touch.",
  },
  {
    id: "about",
    patterns: [
      "about",
      "who are you",
      "who is joshcalebwill",
      "company",
      "what is joshcalebwill",
      "tell me about",
    ],
    answer:
      "Joshcalebwill Petroleum Limited is an integrated energy services company focused on excellence across the oil & gas value chain — upstream, midstream, downstream and gas. We deliver engineering, logistics, chemical supply, pipeline, HSE and related services with a strong commitment to safety, integrity and quality.",
  },
  {
    id: "services",
    patterns: [
      "service",
      "services",
      "what do you do",
      "offerings",
      "capabilities",
      "what we do",
    ],
    answer:
      "Our main services include:\n• Exploration support\n• Haulage (diesel, petrol, kerosene, CNG & more)\n• Procurement solutions\n• Chemical supply & treatments\n• Pipeline construction & maintenance\n• Gas compression services\n• HSE consultancy\n• Lubricants\n\nVisit /what-we-do on the website for full details.",
  },
  {
    id: "haulage",
    patterns: [
      "haulage",
      "transport",
      "fuel delivery",
      "diesel",
      "petrol",
      "kerosene",
      "cng",
    ],
    answer:
      "We provide haulage for diesel, petrol, kerosene, CNG and other petroleum products. With national supply capability, 24/7 logistics support and a strong safety culture, we prioritise reliable, cost-effective delivery. See /what-we-do/haulage-services for more.",
  },
  {
    id: "hse",
    patterns: ["hse", "safety", "health", "environment policy", "safe"],
    answer:
      "Safety underpins everything we do. Our HSE approach includes safe workplaces and equipment, risk-based objectives, training, regular audits, and a no-blame culture for reporting hazards and near misses. We also offer HSE consultancy services — see /what-we-do/health-and-safety.",
  },
  {
    id: "location",
    patterns: [
      "where",
      "location",
      "address",
      "office",
      "visit",
      "located",
      "alagbole",
      "ogun",
      "map",
    ],
    answer:
      "Our head office is at:\nPlot 20B Close, United Estate, Alagbole, Ogun State, Nigeria.\n\nYou can also open the map on our Contact page: /who-we-are/contact-us",
  },
  {
    id: "hours",
    patterns: [
      "hour",
      "hours",
      "open",
      "closing",
      "business hours",
      "when are you",
    ],
    answer:
      "Office hours:\n• Monday – Friday: 9:00 AM – 5:00 PM\n• Saturday: 10:00 AM – 2:00 PM\n• Sunday: Closed",
  },
  {
    id: "contact",
    patterns: [
      "contact",
      "email",
      "phone",
      "call",
      "reach",
      "whatsapp",
      "enquire",
      "inquiry",
    ],
    answer:
      "You can reach us at:\n• Phone: +234 707 707 7529 or +234 907 120 9050\n• Email: info@joshcalebwill.com\n• WhatsApp: https://wa.me/2347077077529\n• Contact form: /who-we-are/contact-us",
  },
  {
    id: "careers",
    patterns: [
      "career",
      "careers",
      "job",
      "jobs",
      "hiring",
      "vacancy",
      "work with you",
      "employment",
    ],
    answer:
      "We're always interested in people who value safety, integrity and excellence. See current opportunities and how to apply at /who-we-are/jobs, or email your CV to info@joshcalebwill.com.",
  },
  {
    id: "market",
    patterns: [
      "market",
      "product",
      "products",
      "buy",
      "shop",
      "catalog",
      "lubricant",
      "ppe",
    ],
    answer:
      "Our Market catalog includes safety equipment, lubricants, piping, hoses and instrumentation. Browse items and send an enquiry from /market — no online payment required; our team confirms availability and pricing.",
  },
  {
    id: "sustainability",
    patterns: [
      "sustainability",
      "community",
      "communities",
      "environment",
      "esg",
      "responsible",
    ],
    answer:
      "We focus on responsible operations: environmental discipline (safe handling, logistics, incident learning) and community impact (local employment, safe operations near neighbours). Learn more at /sustainability.",
  },
  {
    id: "leadership",
    patterns: ["leadership", "leader", "md", "director", "management", "team"],
    answer:
      "Our leadership team brings decades of experience in chemical engineering, HSE, projects and operations. Meet them at /who-we-are/leadership.",
  },
  {
    id: "social",
    patterns: ["facebook", "instagram", "linkedin", "social", "follow"],
    answer:
      "Stay connected:\n• Facebook: https://web.facebook.com/profile.php?id=61581410524694\n• Instagram: https://www.instagram.com/joshcalebwillpetroluem/\n• LinkedIn: search Joshcalebwill Petroleum\n• WhatsApp: https://wa.me/2347077077529",
  },
  {
    id: "thanks",
    patterns: ["thank", "thanks", "appreciate"],
    answer:
      "You're welcome! If you need anything else about Joshcalebwill, just ask.",
  },
];

export const fallbackAnswer =
  "I'm not sure I have that detail. For the best help, please contact our team:\n• info@joshcalebwill.com\n• +234 707 707 7529\n• Contact page: /who-we-are/contact-us\n\nOr try asking about services, location, hours, HSE, careers, or the market catalog.";
