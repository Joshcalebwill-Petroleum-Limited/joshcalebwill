export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
}

export const productCategories = [
  { id: "all", label: "All" },
  { id: "safety", label: "Safety" },
  { id: "piping-hoses", label: "Piping & Hoses" },
  { id: "instrumentation", label: "Instrumentation" },
  { id: "lubricants", label: "Lubricants" },
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Jumbo Tunnelling Drilling Rig",
    category: "safety",
    description:
      "Mining drill rigs specifically designed for blast hole drilling to increase production and reduce downtime.",
    price: 50000.99,
    oldPrice: 78100.99,
    image:
      "https://www.hardrockdrills.com/wp-content/uploads/2018/06/KJ311-1.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Industrial Hoses & Fittings",
    category: "piping-hoses",
    description:
      "Forged steel, aluminum, and flat steel with plastic cover or butterfly T-type fittings for industrial use.",
    price: 30000.32,
    oldPrice: 58100.95,
    image:
      "https://advanceglobalsupplies.net/wp-content/uploads/2013/09/hoses-2.jpg",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Pressure Measurement Instruments",
    category: "instrumentation",
    description:
      "Field instruments for pressure, flow and temperature — selection, specification and system support.",
    price: 135000.99,
    image:
      "https://iticollege.edu/wp-content/uploads/2022/06/Instrument-Technician-Course-.jpg",
    rating: 3.5,
  },
  {
    id: 4,
    name: "PPE Kit — Helmet, Sanitizer & Mask",
    category: "safety",
    description:
      "Essential personal protective equipment kit for site and operational environments.",
    price: 32000.99,
    image:
      "https://media.istockphoto.com/id/1225788986/photo/helmet-hand-sanitizer-and-face-mask.webp?a=1&s=612x612&w=0&k=20&c=nZiAtNYx67eaYmPbkOSBsr3cKLLRITj4yAShk9r22Oo=",
    rating: 3.9,
  },
  {
    id: 5,
    name: "Fire Hoses",
    category: "piping-hoses",
    description:
      "Industrial fire hoses ready for emergency response readiness.",
    price: 100000.99,
    image:
      "https://images.unsplash.com/photo-1700356848746-5f2dd76c237b?w=400&auto=format&fit=crop&q=60",
    rating: 4.2,
  },
  {
    id: 6,
    name: "Yellow Safety Helmet",
    category: "safety",
    description:
      "Hard hats for site safety — durable protection for field teams.",
    price: 100000.99,
    image:
      "https://images.unsplash.com/photo-1755377205288-f797e46983c1?w=400&auto=format&fit=crop&q=60",
    rating: 4.0,
  },
  {
    id: 7,
    name: "Crane Tower Support",
    category: "safety",
    description:
      "Equipment support solutions that improve speed and site stability.",
    price: 200000.99,
    image:
      "https://images.unsplash.com/photo-1739296449815-f2c1185cd64b?w=400&auto=format&fit=crop&q=60",
    rating: 4.0,
  },
  {
    id: 8,
    name: "Fire Extinguisher",
    category: "safety",
    description:
      "Fire extinguishers for terminals, depots and operational sites.",
    price: 52000.99,
    image:
      "https://media.istockphoto.com/id/510585846/photo/carbon-dioxide-foam-powder-and-water.jpg?s=612x612&w=0&k=20&c=K3cu91qZOkmx_Yb03nCJ70kOXijFNDJsw_iukk7B8FM=",
    rating: 4.0,
  },
  {
    id: 9,
    name: "Engine Oil",
    category: "lubricants",
    description: "Quality engine oil to keep equipment running smoothly.",
    price: 30000.99,
    image:
      "https://media.istockphoto.com/id/951321938/photo/man-checking-engine-oil-of-an-car.jpg?s=612x612&w=0&k=20&c=BQaM-xZwS_FO9y0sy2MymUG8QcnrTVs8bNjehNzF91c=",
    rating: 4.3,
  },
  {
    id: 10,
    name: "Polish Wax",
    category: "lubricants",
    description: "Polish wax and cream for vehicle and equipment care.",
    price: 30000.99,
    image:
      "https://plus.unsplash.com/premium_photo-1661443456250-5cd06d09701c?w=400&auto=format&fit=crop&q=60",
    rating: 4.3,
  },
  {
    id: 11,
    name: "Motor Oil",
    category: "lubricants",
    description: "Motor oil formulated for reliable engine performance.",
    price: 30000.99,
    image:
      "https://images.unsplash.com/photo-1635437536607-b8572f443763?w=400&auto=format&fit=crop&q=60",
    rating: 4.3,
  },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}
