import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-host-properties',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './host-properties.html',
  styleUrl: './host-properties.css'
})
export class HostPropertiesPage implements OnInit {
  private propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  private router = inject(Router);

  properties = signal<Property[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  showAddModal = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  // Form fields
  title = '';
  description = '';
  location = '';
  price = 150;
  propertyType = 'villa';
  bedrooms = 2;
  bathrooms = 1;
  maxGuests = 4;
  amenitiesText = 'WiFi, Air Conditioning, Kitchen, Pool';
  selectedFiles: File[] = [];

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
        this.errorMessage.set(err.error?.message || 'Failed to load properties.');
        this.isLoading.set(false);
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  createProperty(): void {
    if (!this.title || !this.description || !this.location || !this.price) {
      alert('Please fill in required property fields.');
      return;
    }

    this.isSubmitting.set(true);
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('location', this.location);
    formData.append('price', this.price.toString());
    formData.append('propertyType', this.propertyType);
    formData.append('bedrooms', this.bedrooms.toString());
    formData.append('bathrooms', this.bathrooms.toString());
    formData.append('maxGuests', this.maxGuests.toString());

    const amenitiesArray = this.amenitiesText.split(',').map(a => a.trim()).filter(Boolean);
    amenitiesArray.forEach(a => formData.append('amenities', a));

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    this.propertyService.addProperty(formData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.closeAddModal();
        this.resetForm();
        this.loadProperties();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        alert(err.error?.message || 'Failed to create property.');
      }
    });
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.location = '';
    this.price = 150;
    this.propertyType = 'villa';
    this.bedrooms = 2;
    this.bathrooms = 1;
    this.maxGuests = 4;
    this.amenitiesText = 'WiFi, Air Conditioning, Kitchen, Pool';
    this.selectedFiles = [];
  }

  deleteProperty(id: string): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => this.loadProperties(),
        error: (err) => alert(err.error?.message || 'Failed to delete property.')
      });
    }
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
