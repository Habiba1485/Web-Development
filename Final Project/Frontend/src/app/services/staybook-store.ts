import { Injectable, signal } from '@angular/core';

export type Property = {
  id: number;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  tag?: string | null;
  propertyType: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  hostName: string;
  hostAvatar: string;
  amenities: string[];
};

export type Booking = {
  id: string;
  propertyId: number;
  propertyTitle: string;
  location: string;
  image: string;
  checkin: string;
  checkout: string;
  guests: number;
  nights: number;
  total: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'declined';
};

@Injectable({ providedIn: 'root' })
export class StayBookStore {
  readonly properties = signal<Property[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=900&h=700&fit=crop&auto=format',
      title: 'Luxury Resort Bungalow',
      location: 'Koh Samui, Thailand',
      rating: 4.92,
      reviews: 88,
      price: 285,
      tag: 'Beachfront',
      propertyType: 'Villa',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      description: 'A quiet tropical escape with bright open-plan spaces, a private pool, and easy access to the coast.',
      hostName: 'Dewi Kusuma',
      hostAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format',
      amenities: ['High-speed WiFi', 'Air Conditioning', 'Full Kitchen', 'Private Pool', 'Free Parking', 'Smart TV', 'Ocean View', 'Washer / Dryer', 'Gym Access', 'BBQ Grill']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=700&fit=crop&auto=format',
      title: 'Vineyard Estate Villa',
      location: 'Tuscany, Italy',
      rating: 4.98,
      reviews: 211,
      price: 680,
      tag: 'Superhost',
      propertyType: 'Villa',
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      description: 'A refined countryside villa surrounded by vineyards, designed for slow mornings and long dinners.',
      hostName: 'Giulia Romano',
      hostAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format',
      amenities: ['WiFi', 'Kitchen', 'Pool', 'Parking', 'TV', 'Garden', 'Breakfast', 'Air Conditioning']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=900&h=700&fit=crop&auto=format',
      title: 'Tuscan Farmhouse Retreat',
      location: 'Chianti, Italy',
      rating: 4.89,
      reviews: 76,
      price: 340,
      propertyType: 'House',
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      description: 'Warm stone interiors, rolling countryside views, and a peaceful setting for families or friends.',
      hostName: 'Luca Bianchi',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format',
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Garden', 'Washer / Dryer', 'Fireplace']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=700&fit=crop&auto=format',
      title: 'Modern Desert Villa',
      location: 'Scottsdale, Arizona',
      rating: 4.95,
      reviews: 143,
      price: 510,
      tag: 'Superhost',
      propertyType: 'Villa',
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      description: 'A modern desert retreat with floor-to-ceiling glass, a private pool, and sunset views.',
      hostName: 'Maya Collins',
      hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format',
      amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Parking', 'Smart TV', 'Gym', 'Kitchen']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&h=700&fit=crop&auto=format',
      title: 'Private Pool Oasis',
      location: 'Palm Springs, CA',
      rating: 4.91,
      reviews: 97,
      price: 390,
      propertyType: 'House',
      guests: 5,
      bedrooms: 2,
      bathrooms: 2,
      description: 'A sun-soaked oasis with a private pool, airy interiors, and room to unwind.',
      hostName: 'Noah Williams',
      hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&auto=format',
      amenities: ['WiFi', 'Pool', 'Kitchen', 'Parking', 'TV', 'Washer / Dryer']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&h=700&fit=crop&auto=format',
      title: 'Mountain House at Dusk',
      location: 'Aspen, Colorado',
      rating: 4.96,
      reviews: 158,
      price: 520,
      tag: 'New',
      propertyType: 'House',
      guests: 7,
      bedrooms: 3,
      bathrooms: 2,
      description: 'A cozy mountain home with wide views, a fireplace, and an easy base for outdoor adventures.',
      hostName: 'Emma Reed',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
      amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Parking', 'Mountain View', 'Washer / Dryer']
    }
  ]);

  readonly bookings = signal<Booking[]>([
    {
      id: 'SB-2026-00124',
      propertyId: 1,
      propertyTitle: 'Luxury Resort Bungalow',
      location: 'Koh Samui, Thailand',
      image: 'https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=500&h=350&fit=crop&auto=format',
      checkin: 'Aug 15, 2026',
      checkout: 'Aug 22, 2026',
      guests: 2,
      nights: 7,
      total: 3093,
      status: 'confirmed'
    },
    {
      id: 'SB-2026-00112',
      propertyId: 2,
      propertyTitle: 'Vineyard Estate Villa',
      location: 'Tuscany, Italy',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=350&fit=crop&auto=format',
      checkin: 'Sep 03, 2026',
      checkout: 'Sep 08, 2026',
      guests: 4,
      nights: 5,
      total: 3548,
      status: 'completed'
    },
    {
      id: 'SB-2026-00089',
      propertyId: 4,
      propertyTitle: 'Modern Desert Villa',
      location: 'Scottsdale, Arizona',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=350&fit=crop&auto=format',
      checkin: 'Jun 12, 2026',
      checkout: 'Jun 16, 2026',
      guests: 2,
      nights: 4,
      total: 2228,
      status: 'cancelled'
    }
  ]);

  verificationStatus = signal<'not-submitted' | 'pending' | 'verified'>('not-submitted');
  verificationFiles = signal<string[]>([]);

  selectedPropertyId = signal(1);

  getProperty(id: number): Property | undefined {
    return this.properties().find((property) => property.id === id);
  }

  setVerificationFiles(names: string[]): void {
    this.verificationFiles.set(names);
    this.verificationStatus.set('pending');
  }
}
