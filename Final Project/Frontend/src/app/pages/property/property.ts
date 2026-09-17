import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';
import { Review } from '../../models/review';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './property.html',
  styleUrl: './property.css'
})
export class PropertyPage implements OnInit {
  private propertyService = inject(PropertyService);
  private reviewService = inject(ReviewService);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  property = signal<Property | null>(null);
  reviews = signal<Review[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  checkin = signal('2026-09-01');
  checkout = signal('2026-09-05');
  guests = signal(2);
  activeTab = signal<'overview' | 'reviews'>('overview');
  showAllAmenities = signal(false);

  tabs: ('overview' | 'reviews')[] = ['overview', 'reviews'];
  stars = [1, 2, 3, 4, 5];
  guestOptions = signal<number[]>([1, 2, 3, 4, 5]);

  highlights = [
    { icon: '🏆', title: 'Highly rated host', desc: 'Guests consistently rate this stay highly.' },
    { icon: '📍', title: 'Great location', desc: 'Explore the area and enjoy nearby attractions.' },
    { icon: '🔑', title: 'Easy check-in', desc: 'Simple arrival instructions are provided after booking.' }
  ];

  pricePerNight = computed(() => this.property()?.price ?? 0);
  cleaningFee = 50;
  serviceFee = 30;

  nights = computed(() => {
    const start = new Date(this.checkin()).getTime();
    const end = new Date(this.checkout()).getTime();
    if (!start || !end || isNaN(start) || isNaN(end)) return 1;
    const diff = Math.round((end - start) / 86_400_000);
    return diff > 0 ? diff : 1;
  });

  subtotal = computed(() => this.pricePerNight() * this.nights());
  total = computed(() => this.subtotal() + this.cleaningFee + this.serviceFee);

  displayedAmenities = computed(() => {
    const items = this.property()?.amenities ?? [];
    return this.showAllAmenities() ? items : items.slice(0, 8);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProperty(id);
      }
    });

    // Check query params for prefilled dates/guests
    this.route.queryParams.subscribe(q => {
      if (q['checkIn']) this.checkin.set(q['checkIn']);
      if (q['checkOut']) this.checkout.set(q['checkOut']);
      if (q['guests']) this.guests.set(Number(q['guests']));
    });
  }

  loadProperty(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.propertyService.getPropertyById(id).subscribe({
      next: (data) => {
        this.property.set(data);
        const max = data.maxGuests || 4;
        this.guestOptions.set(Array.from({ length: max }, (_, index) => index + 1));
        this.guests.set(Math.min(this.guests(), max));
        this.isLoading.set(false);

        // Load reviews
        this.loadReviews(id);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Property not found or server error.');
        this.isLoading.set(false);
      }
    });
  }

  loadReviews(propertyId: string): void {
    this.reviewService.getPropertyReviews(propertyId).subscribe({
      next: (res) => this.reviews.set(res || []),
      error: () => this.reviews.set([])
    });
  }

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  iconForAmenity(amenity: string): string {
    const value = amenity.toLowerCase();
    if (value.includes('wifi') || value.includes('internet')) return '📶';
    if (value.includes('air') || value.includes('ac')) return '❄️';
    if (value.includes('kitchen')) return '🍳';
    if (value.includes('pool')) return '🏊';
    if (value.includes('parking')) return '🅿️';
    if (value.includes('tv')) return '📺';
    if (value.includes('gym')) return '🏋️';
    if (value.includes('view') || value.includes('ocean') || value.includes('mountain')) return '🌊';
    if (value.includes('washer') || value.includes('dryer')) return '🧺';
    if (value.includes('fireplace')) return '🔥';
    return '✓';
  }

  setCheckin(value: string): void { this.checkin.set(value); }
  setCheckout(value: string): void { this.checkout.set(value); }
  setGuests(value: string): void { this.guests.set(Number(value)); }
  showAll(): void { this.showAllAmenities.set(true); }

  reserve(): void {
    const prop = this.property();
    if (!prop) return;
    this.router.navigate(['/booking'], {
      queryParams: {
        propertyId: prop._id,
        checkIn: this.checkin(),
        checkOut: this.checkout(),
        guests: this.guests()
      }
    });
  }
}
