export interface Property {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  host: any;
  rating: number;
  isAvailable: boolean;
  verificationStatus?: 'not_submitted' | 'pending' | 'verified' | 'rejected';
  verificationDocuments?: string[];
}
