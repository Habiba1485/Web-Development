import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingPage implements OnInit {
  private propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  property = signal<Property | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  checkin = signal('2026-09-01');
  checkout = signal('2026-09-05');
  guests = signal('2');

  cleaningFee = 50;
  serviceFee = 30;

  pricePerNight = computed(() => this.property()?.price ?? 0);

  nights = computed(() => {
    const start = new Date(this.checkin()).getTime();
    const end = new Date(this.checkout()).getTime();
    if (!start || !end || isNaN(start) || isNaN(end)) return 1;
    const diff = Math.round((end - start) / 86_400_000);
    return diff > 0 ? diff : 1;
  });

  subtotal = computed(() => this.pricePerNight() * this.nights());
  total = computed(() => this.subtotal() + this.cleaningFee + this.serviceFee);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['propertyId'];
      if (params['checkIn']) this.checkin.set(params['checkIn']);
      if (params['checkOut']) this.checkout.set(params['checkOut']);
      if (params['guests']) this.guests.set(params['guests']);

      if (id) {
        this.loadProperty(id);
      } else {
        // Fallback: load first property
        this.loadFirstProperty();
      }
    });
  }

  loadProperty(id: string): void {
    this.isLoading.set(true);
    this.propertyService.getPropertyById(id).subscribe({
      next: (data) => {
        this.property.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.loadFirstProperty();
      }
    });
  }

  loadFirstProperty(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (props) => {
        if (props && props.length > 0) {
          this.property.set(props[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load property details.');
        this.isLoading.set(false);
      }
    });
  }

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  continueToPayment(): void {
    const prop = this.property();
    if (!prop) return;
    this.router.navigate(['/payment'], {
      queryParams: {
        propertyId: prop._id,
        checkIn: this.checkin(),
        checkOut: this.checkout(),
        guests: this.guests()
      }
    });
  }
}
