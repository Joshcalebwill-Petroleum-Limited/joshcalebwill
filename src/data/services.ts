export interface ServiceSection {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  /** alternating band style */
  variant?: "light" | "warm" | "brand" | "soft";
}

export interface ServicePageData {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow?: string;
  intro: string;
  overview: string[];
  gallery?: string[];
  sections?: ServiceSection[];
  capabilities: string[];
  outcomes: string[];
  image: string;
  accent: "orange" | "red" | "blue" | "teal" | "lime" | "yellow" | "cyan";
}

export const services: ServicePageData[] = [
  {
    slug: "exploration",
    title: "Exploration",
    shortTitle: "Exploration",
    description: "Energy exploration and resource development support.",
    eyebrow: "Upstream support",
    intro:
      "We support upstream teams with disciplined exploration services that reduce uncertainty, improve decision quality and keep programmes moving safely from concept to field.",
    overview: [
      "Joshcalebwill partners with operators and contractors to deliver exploration support that balances technical rigour with practical field execution. Our teams understand the pressures of schedules, regulatory expectations and operational risk.",
      "Whether you need early-stage advisory, logistics coordination or integrated field support, we bring experienced people and clear processes so exploration activity stays aligned with safety, quality and commercial objectives.",
    ],
    gallery: [
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-03.jpg",
      "/assets/hero/hero-04.jpg",
    ],
    capabilities: [
      "Exploration programme support and coordination",
      "Field logistics and mobilisation planning",
      "Technical liaison with multidisciplinary teams",
      "HSE integration into exploration workflows",
      "Stakeholder and site interface management",
    ],
    outcomes: [
      "Clearer operational planning",
      "Safer field mobilisation",
      "Stronger coordination across partners",
    ],
    image: "/assets/hero/hero-01.jpg",
    accent: "orange",
  },
  {
    slug: "haulage-services",
    title: "Haulage",
    shortTitle: "Haulage",
    description:
      "Haulage services for Diesel, Petrol, Kerosene, CNG and other petroleum products.",
    eyebrow: "A unique supply capability",
    intro:
      "We provide haulage services especially in the area of Diesel, Petrol, Kerosene, CNG, and other petroleum products.",
    overview: [
      "With our own import infrastructure in key demand locations and lifting rights at inland locations, we have unique national supply capability.",
      "We understand that supply resilience is of paramount importance to our customers, and our priority is to deliver.",
      "Our national footprint minimises transport distances between our storage terminals and our customers' sites, so we can ensure cost effective and reliable supply. Our 24/7 in-house logistics operation, supported by a Nigeria based customer care and scheduling team, ensures that our haulage operations match our exacting standards of reliability and service.",
    ],
    gallery: [
      "/assets/services/haulage/haulage1.png",
      "/assets/services/haulage/haulage2.png",
      "/assets/services/haulage/haulage3.png",
      "/assets/services/haulage/haulage4.png",
      "/assets/services/haulage/haulage6.png",
      "/assets/services/haulage/newHaulage1.png",
    ],
    sections: [
      {
        title: "Why buy from us?",
        paragraphs: [
          "We work to earn the long-term loyalty of each and every customer. We are determined to outperform our competitors on both cost and service.",
        ],
        variant: "warm",
      },
      {
        title: "We offer",
        subtitle: "Competitive pricing",
        paragraphs: [
          "An extensive range of fuel petroleum products including petrol, diesel, gasoil, marine gasoil and kerosene.",
        ],
        variant: "brand",
      },
      {
        title: "Proven supply resilience and reliable delivery",
        paragraphs: [
          "Our own managed supply locations across Nigeria — we're not at risk of supply disruption by other providers. A 24/7 haulage operation with real-time scheduling and a Nigeria based customer service team, to resolve issues promptly.",
        ],
        variant: "soft",
      },
      {
        title: "More on our 24/7 haulage operation",
        paragraphs: [
          "Online ordering and auto-invoicing providing error-free back-office processes. Wetstock management, allowing us to remotely monitor and manage fuel stocks at customers sites and ensure our customers never stock out. We don't own or operate any forecourts, so we're able to put the interests of our customers first — 100% of the time.",
        ],
        variant: "brand",
      },
      {
        title: "Safety",
        paragraphs: [
          "Safety underpins everything we do. We work continually to identify, assess and mitigate the risks associated with our operations.",
        ],
        variant: "warm",
      },
      {
        title: "Our approach",
        subtitle: "We create safe working environments by:",
        paragraphs: [
          "Instilling the highest possible level of safety awareness in everyone involved in storing, moving and delivering our fuel, whether that person is a member of staff or employed by a contractor or sub-contractor. Encouraging and empowering every individual working in the business to observe and report hazards, near misses or unwanted events, however small, without fear of blame.",
          "Responding quickly to identified trends and near-misses in order to prevent more significant incidents or injuries. Ensuring that every individual working in our business is properly trained for the work they do.",
        ],
        variant: "soft",
      },
      {
        title: "Driver safety",
        paragraphs: [
          "We take every possible step to ensure our drivers, vehicles and equipment are prepared for all foreseeable hazards.",
          "Our drivers carry hazardous product on the public highway and operate around members of the public at customer forecourts. It is of paramount importance that they are equipped and competent for the tasks they perform.",
          "To ensure the safety of our drivers and those around them, we provide ongoing training and assessment, exceeding industry norms, to ensure that safety standards on the road, in the terminal and at the customer site are maintained.",
          "Our drivers are best placed to observe safety hazards in our logistics operations. Many channels of communication exist within the company, both formal and informal, to ensure that individual drivers' observations and experience are shared and improvement actions put in place.",
        ],
        variant: "warm",
      },
      {
        title: "Creating a culture of incident reporting",
        paragraphs: [
          'Across the company we strongly encourage a culture of open and honest reporting of all unwanted events as part of a "no-blame" culture.',
          "We focus on capturing the near misses and hazards observations that can easily remain un-noticed and un-reported in a business. We also conduct regular audits throughout the business to identify gaps and put action plans in place to resolve.",
          "Information from these observations is vitally important for us in understanding safe working practices and in identifying and correcting potential issues that have potential to lead to serious injuries or events in the future.",
        ],
        variant: "brand",
      },
    ],
    capabilities: [
      "Diesel, petrol, kerosene & CNG haulage",
      "24/7 in-house logistics operations",
      "National supply footprint across Nigeria",
      "Real-time scheduling & customer care",
      "Wetstock management at customer sites",
    ],
    outcomes: [
      "Reliable, cost-effective supply",
      "Lower risk of stock-outs",
      "Safety-led haulage culture",
    ],
    image: "/assets/services/haulage/haulage1.png",
    accent: "red",
  },
  {
    slug: "procurement-solutions",
    title: "Procurement Solutions",
    shortTitle: "Procurement",
    description: "Strategic sourcing and supply chain support.",
    eyebrow: "Supply chain excellence",
    intro:
      "Procurement is more than buying — it is protecting schedule, quality and cost. We help clients source the right materials and services with transparency, speed and technical alignment.",
    overview: [
      "Our procurement solutions support energy operators who need dependable supply chains without compromising standards. We combine market knowledge with disciplined processes to secure fit-for-purpose goods and services.",
      "From specification support to vendor coordination, Joshcalebwill helps reduce friction in the supply chain so projects maintain momentum.",
    ],
    gallery: [
      "/assets/hero/hero-03.jpg",
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-04.jpg",
    ],
    capabilities: [
      "Strategic sourcing and vendor identification",
      "Specification and requisition support",
      "Supplier coordination and follow-through",
      "Documentation and delivery tracking",
      "Quality and compliance alignment",
    ],
    outcomes: [
      "Faster sourcing cycles",
      "Improved supplier accountability",
      "Reduced procurement bottlenecks",
    ],
    image: "/assets/hero/hero-03.jpg",
    accent: "blue",
  },
  {
    slug: "chemical-supply-and-treatments",
    title: "Chemical Supply & Treatments",
    shortTitle: "Chemicals",
    description: "Specialized industrial chemical solutions.",
    eyebrow: "Process performance",
    intro:
      "Process performance depends on the right chemistry at the right time. We supply and support industrial chemical solutions tailored to upstream, midstream and industrial operations.",
    overview: [
      "Joshcalebwill delivers chemical supply and treatment support with a focus on application quality, safe handling and operational results. Our approach prioritises product suitability, logistics reliability and field practicality.",
      "Clients trust us to help maintain production integrity while meeting safety and environmental expectations.",
    ],
    gallery: [
      "/assets/hero/hero-04.jpg",
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-03.jpg",
    ],
    capabilities: [
      "Industrial chemical supply coordination",
      "Treatment programme support",
      "Application guidance and field interface",
      "Safe handling and storage practices",
      "Documentation and product traceability",
    ],
    outcomes: [
      "More reliable chemical availability",
      "Improved treatment consistency",
      "Safer chemical handling culture",
    ],
    image: "/assets/hero/hero-04.jpg",
    accent: "teal",
  },
  {
    slug: "pipeline-construction-and-maintenance",
    title: "Pipeline Construction & Maintenance",
    shortTitle: "Pipelines",
    description: "Engineering and maintenance of pipeline systems.",
    eyebrow: "Integrity & delivery",
    intro:
      "Pipelines are the arteries of energy systems. We support construction and maintenance programmes that protect integrity, uptime and community safety across the asset lifecycle.",
    overview: [
      "Joshcalebwill provides pipeline construction and maintenance support grounded in engineering discipline and field experience. We work with project teams to deliver work packages that meet specification, schedule and HSE requirements.",
      "From construction support to ongoing integrity-focused maintenance, our teams emphasise quality workmanship and clear accountability.",
    ],
    gallery: [
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-03.jpg",
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-04.jpg",
    ],
    capabilities: [
      "Pipeline construction support services",
      "Maintenance and integrity-focused interventions",
      "Field supervision and coordination",
      "QA/QC interface and documentation",
      "HSE integration on pipeline scopes",
    ],
    outcomes: [
      "Higher work-pack quality",
      "Stronger integrity discipline",
      "Safer pipeline operations",
    ],
    image: "/assets/hero/hero-01.jpg",
    accent: "lime",
  },
  {
    slug: "gas-compression-services",
    title: "Gas Compression Services",
    shortTitle: "Gas Compression",
    description: "Efficient gas handling and compression operations.",
    eyebrow: "Reliable compression",
    intro:
      "Compression keeps gas moving efficiently and safely. We support gas compression activities with operational focus, technical coordination and a commitment to reliable performance.",
    overview: [
      "Joshcalebwill supports clients who depend on dependable gas handling and compression operations. Our teams help align equipment, procedures and field execution so compression packages perform as intended.",
      "We emphasise uptime, safety and clear operating discipline across every engagement.",
    ],
    gallery: [
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-04.jpg",
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-03.jpg",
    ],
    capabilities: [
      "Gas compression operational support",
      "Field coordination and mobilisation",
      "Maintenance interface support",
      "Performance and reliability focus",
      "Safety systems alignment",
    ],
    outcomes: [
      "Improved operational continuity",
      "Clearer field coordination",
      "Stronger safety performance",
    ],
    image: "/assets/hero/hero-02.jpg",
    accent: "yellow",
  },
  {
    slug: "health-and-safety",
    title: "HSE Consultancy",
    shortTitle: "HSE",
    description: "Health, safety and environmental assessment services.",
    eyebrow: "People first",
    intro:
      "Nothing matters more than people going home safe. Our HSE consultancy helps organisations build practical systems, stronger cultures and measurable performance in health, safety and environment.",
    overview: [
      "Joshcalebwill's HSE consultancy is led by practitioners who understand oil and gas operations. We help clients design, implement and improve systems that protect people, assets and the environment — without creating paperwork that no one uses.",
      "From policy development to field assessment, we focus on usable controls and leadership accountability.",
    ],
    gallery: [
      "/assets/hero/hero-03.jpg",
      "/assets/hero/hero-01.jpg",
      "/assets/hero/hero-04.jpg",
      "/assets/hero/hero-02.jpg",
    ],
    capabilities: [
      "HSE policy and procedure development",
      "Risk assessment and operational reviews",
      "Safety culture and leadership support",
      "Environmental assessment interface",
      "Training needs alignment and coaching",
    ],
    outcomes: [
      "Clearer HSE systems",
      "Stronger frontline ownership",
      "Improved compliance readiness",
    ],
    image: "/assets/hero/hero-03.jpg",
    accent: "cyan",
  },
  {
    slug: "lubricants",
    title: "Lubricants",
    shortTitle: "Lubricants",
    description: "Premium lubricant products and support.",
    eyebrow: "Asset care",
    intro:
      "The right lubricants protect assets and extend equipment life. We supply premium lubricant products with application support so machinery runs cleaner, longer and more efficiently.",
    overview: [
      "Joshcalebwill provides lubricant products and support for industrial and energy-sector equipment. Our focus is product suitability, supply reliability and practical guidance that helps maintenance teams protect critical assets.",
      "Clients value a partner who understands both product performance and operational constraints.",
    ],
    gallery: [
      "/assets/hero/hero-04.jpg",
      "/assets/hero/hero-02.jpg",
      "/assets/hero/hero-03.jpg",
      "/assets/hero/hero-01.jpg",
    ],
    capabilities: [
      "Premium lubricant product supply",
      "Application and product selection support",
      "Maintenance team interface",
      "Supply reliability and documentation",
      "Asset-care aligned recommendations",
    ],
    outcomes: [
      "Better equipment protection",
      "More reliable lubricant supply",
      "Clearer product application",
    ],
    image: "/assets/hero/hero-04.jpg",
    accent: "orange",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3) {
  return services.filter((s) => s.slug !== slug).slice(0, limit);
}
