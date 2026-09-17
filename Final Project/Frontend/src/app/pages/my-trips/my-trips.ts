import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking-service';
import { AuthService } from '../../services/auth-service';
import { Booking } from '../../models/booking';

type Tab = 'upcoming' | 'completed' | 'cancelled';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css'
})
export class MyTripsPage implements OnInit {
  private bookingService = inject(BookingService);
  public authService = inject(AuthService);

  trips = signal<Booking[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  activeTab = signal<Tab>('upcoming');

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.trips.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load your trips. Please log in.');
        this.isLoading.set(false);
      }
    });
  }

  visibleTrips = computed(() => {
    const tab = this.activeTab();
    const list = this.trips();
    if (tab === 'upcoming') {
      return list.filter(t => t.status === 'confirmed' || t.status === 'pending');
    }
    if (tab === 'completed') {
      return list.filter(t => t.status === 'completed');
    }
    return list.filter(t => t.status === 'cancelled' || t.status === 'declined');
  });

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  cancelBooking(id: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(id).subscribe({
        next: () => {
          this.loadMyBookings();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to cancel booking.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
