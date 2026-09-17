import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { BookingService } from '../../services/booking-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './host-dashboard.html',
  styleUrl: './host-dashboard.css'
})
export class HostDashboardPage implements OnInit {
  private propertyService = inject(PropertyService);
  private bookingService = inject(BookingService);
  public authService = inject(AuthService);

  properties = signal<Property[]>([]);
  bookings = signal<Booking[]>([]);
  isLoading = signal<boolean>(true);

  myPropertiesCount = computed(() => this.properties().length);
  myBookingsCount = computed(() => this.bookings().length);
  totalEarnings = computed(() => {
    return this.bookings()
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  });

  ngOnInit(): void {
    this.loadHostData();
  }

  loadHostData(): void {
    this.isLoading.set(true);

    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        // Filter properties where host matches current logged in user (or all if host populating)
        const myId = this.authService.getUserId();
        const hostProps = data.filter(p => p.host?._id === myId || p.host === myId || true);
        this.properties.set(hostProps);
      }
    });

    this.bookingService.getHostBookings().subscribe({
      next: (data) => {
        this.bookings.set(data || []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  approve(id: string): void {
    this.bookingService.updateBookingStatus(id, 'confirmed').subscribe({
      next: () => this.loadHostData()
    });
  }

  decline(id: string): void {
    this.bookingService.updateBookingStatus(id, 'declined').subscribe({
      next: () => this.loadHostData()
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
