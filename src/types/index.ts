export type PropertyType =
  | 'villa'
  | 'appartement'
  | 'terrain'
  | 'bureau'
  | 'immeuble'
  | 'local_commercial'
  | 'maison'
  | 'duplex';

export type TransactionType = 'vente' | 'location' | 'achat';

export type PropertyStatus = 'disponible' | 'vendu' | 'loue' | 'reserve';

export interface PropertyFeature {
  icon: string;
  label: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  transaction: TransactionType;
  status: PropertyStatus;
  price: number;
  priceUnit: 'FCFA' | 'EUR' | 'USD';
  priceFrequency?: 'mois' | 'an';
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  city: string;
  neighborhood: string;
  address: string;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  hasPool: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  hasBalcony: boolean;
  hasSecurity: boolean;
  hasAC: boolean;
  isFeatured: boolean;
  isLuxury: boolean;
  isNew: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  agent?: Agent;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  city: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
}

export interface CartItem {
  property: Property;
  action: 'achat' | 'location' | 'reservation';
  addedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'client' | 'admin' | 'agent';
  createdAt: string;
}

export interface FilterState {
  transaction: string;
  type: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  minSurface: string;
  maxSurface: string;
  rooms: string;
  hasPool: boolean;
  hasParking: boolean;
  hasGarden: boolean;
  searchQuery: string;
}
