import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePage implements OnInit {
  private propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  private router = inject(Router);

  properties = signal<Property[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  saved = signal<string[]>([]);
  location = signal('');
  checkin = signal('');
  checkout = signal('');
  guests = signal('1');
  activeCategory = signal('All');

  categories = [
    { label: 'All', icon: '✦' },
    { label: 'Villa', icon: '🏛' },
    { label: 'House', icon: '🏠' },
    { label: 'Apartment', icon: '🏢' },
    { label: 'Studio', icon: '🛋' },
    { label: 'Hotel', icon: '🏨' }
  ];

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load properties from server.');
        this.isLoading.set(false);
      }
    });
  }

  filteredProperties = computed(() => {
    const category = this.activeCategory();
    const query = this.location().trim().toLowerCase();

    return this.properties().filter((property) => {
      const matchesCategory =
        category === 'All' ||
        (property.propertyType && property.propertyType.toLowerCase() === category.toLowerCase());

      const matchesLocation =
        !query ||
        (property.location && property.location.toLowerCase().includes(query)) ||
        (property.title && property.title.toLowerCase().includes(query));

      return matchesCategory && matchesLocation;
    });
  });

  getImageUrl(img?: string): string {
    if (!img) return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `http://localhost:5000/api/v1/uploads/properties/${img}`;
  }

  toggleSave(id: string): void {
    const current = this.saved();
    this.saved.set(
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  search(): void {
    const matched = this.filteredProperties();
    if (matched.length > 0) {
      this.router.navigate(['/property', matched[0]._id], {
        queryParams: {
          checkIn: this.checkin(),
          checkOut: this.checkout(),
          guests: this.guests()
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
