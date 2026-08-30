import { NavGroup } from "@/interface/navigation";

export const navigation: NavGroup[] = [
  {
    title: "Who We Are",
    href: "/who-we-are",
    dropdownWidth: "700px",
    description:
      "Discover the values and principles that guide our company. Meet the team driving innovation and growth. And explore our journey and milestones over the years.",
    submenu: [
      {
        title: "Our Culture",
        href: "/who-we-are/our-culture",
        description:
          "Discover the values and principles that guide our company.",
      },
      {
        title: "Our Leadership",
        href: "/who-we-are/leadership",
        description: "Meet the team driving innovation and growth.",
      },
      {
        title: "Our History",
        href: "/who-we-are/our-history",
        description: "Explore our journey and milestones over the years.",
      },
      {
        title: "Contact Us",
        href: "/who-we-are/contact-us",
        description: "Get in touch with our team.",
      },
    ],
  },
  {
    title: "What We Do",
    href: "/what-we-do",
    dropdownWidth: "900px",
    description:
      "Integrated energy, procurement and engineering services. Reliable transportation and logistics solutions. Strategic sourcing and supply chain support. And we specialized industrial chemical solutions",
    submenu: [
      {
        title: "Exploration",
        href: "/what-we-do/exploration",
        description: "Energy exploration and resource development.",
      },
      {
        title: "Haulage Services",
        href: "/what-we-do/haulage-services",
        description: "Reliable transportation and logistics solutions.",
      },
      {
        title: "Procurement Solutions",
        href: "/what-we-do/procurement-solutions",
        description: "Strategic sourcing and supply chain support.",
      },
      {
        title: "Chemical Supply & Treatments",
        href: "/what-we-do/chemical-supply-and-treatments",
        description: "Specialized industrial chemical solutions.",
      },
      {
        title: "Pipeline Construction",
        href: "/what-we-do/pipeline-construction-and-maintenance",
        description: "Engineering and maintenance of pipeline systems.",
      },
      {
        title: "Gas Compression Services",
        href: "/what-we-do/gas-compression-services",
        description: "Efficient gas handling and compression operations.",
      },
      {
        title: "HSE Consultancy",
        href: "/what-we-do/health-and-safety",
        description: "Health, safety and environmental assessment services.",
      },
      {
        title: "Lubricants",
        href: "/what-we-do/lubricants",
        description: "Premium lubricant products and support.",
      },
    ],
  },
  {
    title: "Sustainability",
    href: "/sustainability",
    dropdownWidth: "700px",
    description:
      "Our commitment to environmental stewardship. And creating positive impact where we operate.",
    submenu: [
      {
        title: "Environment",
        href: "/sustainability/environment",
        description: "Our commitment to environmental stewardship.",
      },
      {
        title: "Communities",
        href: "/sustainability/communities",
        description: "Creating positive impact where we operate.",
      },
    ],
  },
  {
    title: "Careers",
    href: "/who-we-are/jobs",
  },
  {
    title: "Market",
    href: "/market",
  },
];
