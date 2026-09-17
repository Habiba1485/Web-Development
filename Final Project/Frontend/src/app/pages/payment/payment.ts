import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { BookingService } from '../../services/booking-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class PaymentPage implements OnInit {
  private propertyService = inject(PropertyService);
  private bookingService = inject(BookingService);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  property = signal<Property | null>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  propertyId = signal<string>('');
  checkin = signal('2026-09-01');
  checkout = signal('2026-09-05');
  guests = signal(2);

  paymentMethod = signal<'card' | 'google' | 'apple'>('card');
  saveCard = signal(false);
  fullName = '';
  email = '';
  phone = '';
  country = 'Egypt';
  cardNumber = '';
  expiry = '';
  cvc = '';
  cardName = '';

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
      if (params['guests']) this.guests.set(Number(params['guests']));

      if (id) {
        this.propertyId.set(id);
        this.loadProperty(id);
      } else {
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
      error: () => this.loadFirstProperty()
    });
  }

  loadFirstProperty(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (props) => {
        if (props && props.length > 0) {
          this.property.set(props[0]);
          this.propertyId.set(props[0]._id);
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

  formatCard(): void {
    this.cardNumber = this.cardNumber.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  formatExpiry(): void {
    const clean = this.expiry.replace(/\D/g, '').slice(0, 4);
    this.expiry = clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  }

  pay(): void {
    // Check authentication
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }

    if (this.paymentMethod() === 'card' && (!this.cardNumber || !this.expiry || !this.cvc || !this.cardName)) {
      this.errorMessage.set('Please fill in all card details.');
      return;
    }

    const prop = this.property();
    if (!prop) {
      this.errorMessage.set('Invalid property selection.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const bookingPayload = {
      property: prop._id,
      checkIn: this.checkin(),
      checkOut: this.checkout(),
      guests: this.guests()
    };

    this.bookingService.createBooking(bookingPayload).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        const booking = res.data || res;
        this.router.navigate(['/confirmation'], {
          queryParams: {
            bookingId: booking._id || booking.id || 'SB-' + Date.now().toString().slice(-6),
            propertyId: prop._id,
            checkIn: this.checkin(),
            checkOut: this.checkout(),
            guests: this.guests(),
            total: this.total()
          }
        });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to create booking. Please try again.');
      }
    });
  }
}
