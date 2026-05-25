export interface NavigationItem {
  id: number;
  label: string;
  description?: string;
  href?: string;
  itemType: 'section' | 'link';
  status: 'active' | 'deprecated' | 'development';
  icon?: string;
  children?: NavigationItem[];
};

export interface NavigationConfig {
  navigationItems: NavigationItem[];
}