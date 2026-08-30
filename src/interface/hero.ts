export interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}
