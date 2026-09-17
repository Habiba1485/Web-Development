import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking-service';
import { AuthService } from '../../services/auth-service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.css'
})
export class TripDetailsPage implements OnInit {
  private bookingService = inject(BookingService);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  booking = signal<Booking | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBooking(id);
      } else {
        this.route.queryParams.subscribe(q => {
          if (q['bookingId']) {
            this.loadBooking(q['bookingId']);
          } else {
            this.loadFirstBooking();
          }
        });
      }
    });
  }

  loadBooking(id: string): void {
    this.isLoading.set(true);
    this.bookingService.getBookingById(id).subscribe({
      next: (data) => {
        this.booking.set(data);
        this.isLoading.set(false);
      },
      error: () => this.loadFirstBooking()
    });
  }

  loadFirstBooking(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (list) => {
        if (list && list.length > 0) {
          this.booking.set(list[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load booking details.');
        this.isLoading.set(false);
      }
    });
  }

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  cancelBooking(): void {
    const b = this.booking();
    if (!b) return;
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(b._id).subscribe({
        next: () => {
          this.loadBooking(b._id);
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to cancel booking.');
        }
      });
    }
  }

  contactHost(): void {
    const b = this.booking();
    const hostEmail = b?.property?.host?.email || 'host@staybook.com';
    alert(`Host Email: ${hostEmail}`);
  }
}
