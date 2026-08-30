export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  href: string;
  dropdownWidth?: string;
  description?: string;
  submenu?: NavItem[];
}
