export interface Leader {
  id: string;
  name: string;
  title: string;
  image?: string;
  shortBio: string;
  bio: string[];
  accent: "orange" | "red" | "blue" | "teal" | "lime" | "yellow";
  credentials?: string[];
}

export const leaders: Leader[] = [
  {
    id: "william-chukwunwude",
    name: "William Chukwunwude",
    title: "Managing Director | Chemical Engineer | HSE Expert",
    image: "/assets/leaders/leader1.png",
    shortBio:
      "Chemical Engineer with over 20 years of experience. HSE expert, mentor, and leader driving excellence across Joshcalebwill’s operations.",
    bio: [
      "William Chukwunwude is an accomplished Chemical Engineer with over 20 years of extensive experience in engineering consultancy, particularly within the oil and gas industry. He currently serves as the Managing Director, where he brings a wealth of technical expertise, leadership acumen, and a steadfast commitment to health, safety, and environmental (HSE) excellence.",
      "He holds a degree in Chemical Engineering from Enugu State University of Science and Technology (ESUT), and has since built a distinguished career consulting for both local and multinational organizations. His strategic insights and practical solutions have consistently led to operational efficiencies, regulatory compliance, and enhanced safety cultures across diverse industrial settings.",
      "A recognized HSE expert, Mr. Chukwunwude has been instrumental in the design, development, and implementation of comprehensive safety policies and procedures tailored for the oil and gas sector. His contributions in this area have earned him numerous professional awards and accolades over the years.",
      "Known for his results-driven approach and unwavering professionalism, William is passionate about driving sustainable industrial practices and ensuring workplace safety at every level.",
    ],
    accent: "orange",
    credentials: [
      "B.Eng. Chemical Engineering — ESUT",
      "20+ years industry experience",
      "HSE policy & systems specialist",
    ],
  },
  {
    id: "ferguson-noh",
    name: "Ferguson Chukwuemeka Noh",
    title: "Director, Engineering Services",
    image: "/assets/leaders/leader2.png",
    shortBio:
      "International engineering consultant with 21+ years in mechanical engineering, QA/QC, and multi-national project leadership.",
    bio: [
      "Ferguson holds a B.Eng. in Mechanical & Production Engineering from Enugu State University of Science and Technology and an MBA from Delta State University. He is a member of professional associations including the American Welding Society (AWS) and the American Society for Nondestructive Testing.",
      "He works as an International Engineering Consultant and also serves as International Liaison Officer. He is a professional with over 21 years’ experience in the field of Mechanical Engineering.",
      "He was QA/QC Coordinator with Shell Petroleum Development Company Nigeria on Swamp and Land Flowlines Replacement Projects in the Western Division (1995–2004), and QA/QC Engineer / Quality Lead at Forum Energy Technology, USA (2006–2020).",
    ],
    accent: "red",
    credentials: [
      "B.Eng. Mechanical & Production — ESUT",
      "MBA — Delta State University",
      "AWS · ASNT member",
      "Shell · Forum Energy Technology",
    ],
  },
  {
    id: "sunny-ekwealor",
    name: "Sunny Ekwealor",
    title: "Director of Finance and Administration",
    image: "/assets/leaders/leader3.png",
    shortBio:
      "ICAN Chartered Accountant with specialised oil & gas finance training from Glasgow Caledonian University.",
    bio: [
      "Sunny Ekwealor is an accomplished finance professional with extensive experience in financial management, administration, and strategic planning. As the Director of Finance and Administration, he plays a critical role in driving financial sustainability and operational efficiency across the organization.",
      "Mr. Ekwealor is a chartered accountant and a proud member of the Institute of Chartered Accountants of Nigeria (ICAN). He holds an MBA from the University of Nigeria, where he developed a strong foundation in business strategy, financial analysis, and organizational leadership.",
      "He also earned a Master’s degree in Accounting and Finance (Oil and Gas option) from Glasgow Caledonian University in Scotland, reflecting his specialized knowledge in energy sector finance. His academic background is further complemented by a Higher National Diploma in Accounting from the Institute of Management and Technology (IMT), Enugu.",
      "Sunny combines deep financial expertise with a strategic administrative vision, ensuring sound financial governance and the effective allocation of resources. He is known for his integrity, analytical rigor, and commitment to excellence.",
    ],
    accent: "blue",
    credentials: [
      "ICAN Chartered Accountant",
      "MBA — University of Nigeria",
      "MSc Accounting & Finance (Oil & Gas) — Glasgow Caledonian",
      "HND Accounting — IMT Enugu",
    ],
  },
  {
    id: "chukwudi-obiefuna",
    name: "Chukwudi Raphael Obiefuna",
    title: "Project Director",
    image: "/assets/leaders/leader5.png",
    shortBio:
      "COREN-certified Civil Engineer with 20+ years leading complex infrastructure and construction projects.",
    bio: [
      "Chukwudi Raphael Obiefuna is a seasoned Project Director with over 20 years of extensive experience in project management across both governmental and private sector initiatives. He has successfully led a wide range of high-impact infrastructure projects, including major waterway and highway design and construction.",
      "Known for his collaborative leadership style, Chukwudi brings together interdisciplinary teams comprising architects, engineers, and designers to deliver innovative and sustainable solutions. His ability to coordinate complex projects from concept to completion has earned him a reputation for excellence in execution and stakeholder engagement.",
      "He holds a Bachelor's degree in Civil Engineering from the University of Nigeria, Nsukka, and is a certified Level 3 Safety Proficiency professional by the Institute of Safety Professionals of Nigeria. Chukwudi is also a registered member of the Council for the Regulation of Engineering in Nigeria (COREN) and the Nigerian Society of Engineers.",
    ],
    accent: "teal",
    credentials: [
      "B.Eng. Civil Engineering — UNN",
      "COREN-certified Engineer",
      "Level 3 Safety Proficiency — ISPON",
      "Member, Nigerian Society of Engineers",
    ],
  },
  {
    id: "anosike-gregory",
    name: "Anosike Gregory Chukwudi",
    title: "Executive Director",
    image: "/assets/leaders/leader4.png",
    shortBio:
      "Electrical & Instrumentation Engineer with 20+ years delivering oil & gas projects from initiation to close-out.",
    bio: [
      "Anosike Gregory Chukwudi is a seasoned Executive Director with over 20 years of experience in the oil and gas sector, specializing in project initiation, planning, execution, monitoring, and control. He holds a Bachelor’s degree in Electrical and Electronics Engineering from Enugu State University of Science and Technology, and a Master’s degree in Electrical and Electronics Engineering from the University of Benin.",
      "Mr. Anosike is a proven team player with deep expertise in the coordination and supervision of multidisciplinary field operations. His leadership and technical acumen have been instrumental in the successful delivery of numerous large-scale energy projects.",
      "He is a COREN-registered Electrical Engineer and a Member of the Nigerian Society of Engineers.",
    ],
    accent: "yellow",
    credentials: [
      "B.Eng. Electrical & Electronics — ESUT",
      "M.Eng. Electrical & Electronics — University of Benin",
      "COREN-registered Electrical Engineer",
      "Member, Nigerian Society of Engineers",
    ],
  },
];
