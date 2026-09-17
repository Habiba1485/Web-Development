export interface Booking {
  _id: string;
  guest: any;
  property: any;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'declined' | 'completed';
}
