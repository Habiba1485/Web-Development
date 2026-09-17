import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/v1/bookings';

  createBooking(bookingData: { property: string; checkIn: string; checkOut: string; guests: number }): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, bookingData);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/my-bookings`)
      .pipe(map((res) => res.data.bookings || res.data || []));
  }

  getHostBookings(): Observable<Booking[]> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/host-bookings`)
      .pipe(map((res) => res.data.bookings || res.data || []));
  }

  getBookingById(id: string): Observable<Booking> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.booking || res.data));
  }

  updateBookingStatus(id: string, status: 'confirmed' | 'declined' | 'completed'): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}`, { status });
  }

  cancelBooking(id: string): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
