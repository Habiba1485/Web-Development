export interface Review {
  _id: string;
  guest: any;
  property: string;
  rating: number;
  comment: string;
  createdAt?: string;
}
