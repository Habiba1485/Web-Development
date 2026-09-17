import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking-service';
import { AuthService } from '../../services/auth-service';
import { Booking } from '../../models/booking';

type Filter = 'all' | 'pending' | 'confirmed' | 'declined' | 'cancelled' | 'completed';

@Component({
  selector: 'app-host-bookings',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './host-bookings.html',
  styleUrl: './host-bookings.css'
})
export class HostBookingsPage implements OnInit {
  private bookingService = inject(BookingService);
  public authService = inject(AuthService);

  bookings = signal<Booking[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  filter = signal<Filter>('all');

  ngOnInit(): void {
    this.loadHostBookings();
  }

  loadHostBookings(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.bookingService.getHostBookings().subscribe({
      next: (data) => {
        this.bookings.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load host bookings.');
        this.isLoading.set(false);
      }
    });
  }

  visibleBookings = computed(() => {
    const f = this.filter();
    const list = this.bookings();
    return f === 'all' ? list : list.filter(b => b.status === f);
  });

  setStatus(id: string, status: 'confirmed' | 'declined'): void {
    this.bookingService.updateBookingStatus(id, status).subscribe({
      next: () => this.loadHostBookings(),
      error: (err) => alert(err.error?.message || 'Failed to update booking status.')
    });
  }

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  logout(): void {
    this.authService.logout();
  }
}
