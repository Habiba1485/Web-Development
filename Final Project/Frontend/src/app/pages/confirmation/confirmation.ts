import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class ConfirmationPage implements OnInit {
  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);

  property = signal<Property | null>(null);
  bookingId = signal('SB-' + Math.floor(100000 + Math.random() * 900000));
  checkin = signal('2026-09-01');
  checkout = signal('2026-09-05');
  guests = signal(2);
  total = signal(0);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['bookingId']) this.bookingId.set(params['bookingId']);
      if (params['checkIn']) this.checkin.set(params['checkIn']);
      if (params['checkOut']) this.checkout.set(params['checkOut']);
      if (params['guests']) this.guests.set(Number(params['guests']));
      if (params['total']) this.total.set(Number(params['total']));

      const propId = params['propertyId'];
      if (propId) {
        this.propertyService.getPropertyById(propId).subscribe({
          next: (res) => this.property.set(res),
          error: () => this.loadFirstProperty()
        });
      } else {
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
      }
    });
  }

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }
}
