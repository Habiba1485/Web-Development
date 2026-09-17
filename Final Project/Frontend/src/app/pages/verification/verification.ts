import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property-service';
import { AuthService } from '../../services/auth-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './verification.html',
  styleUrl: './verification.css'
})
export class VerificationPage implements OnInit {
  private propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  properties = signal<Property[]>([]);
  selectedPropertyId = signal<string>('');
  selectedProperty = signal<Property | null>(null);

  files = signal<File[]>([]);
  error = signal('');
  isSubmitting = signal(false);
  submitted = signal(false);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadHostProperties();
  }

  loadHostProperties(): void {
    this.isLoading.set(true);
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties.set(data || []);
        this.isLoading.set(false);

        this.route.queryParams.subscribe(q => {
          if (q['propertyId'] && data.some(p => p._id === q['propertyId'])) {
            this.selectedPropertyId.set(q['propertyId']);
          } else if (data.length > 0) {
            this.selectedPropertyId.set(data[0]._id);
          }
          this.updateSelectedProperty();
        });
      },
      error: () => this.isLoading.set(false)
    });
  }

  updateSelectedProperty(): void {
    const id = this.selectedPropertyId();
    const prop = this.properties().find(p => p._id === id) || null;
    this.selectedProperty.set(prop);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selected = Array.from(input.files ?? []);
    this.error.set('');

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const invalidType = selected.find(file => !allowedTypes.includes(file.type.toLowerCase()) && !/\.(pdf|jpg|jpeg|png)$/i.test(file.name));
    const invalidSize = selected.find(file => file.size > 10 * 1024 * 1024);

    if (invalidType) {
      this.error.set('Only PDF, JPG, JPEG, and PNG files are allowed.');
      input.value = '';
      return;
    }

    if (invalidSize) {
      this.error.set('Each document must be 10 MB or smaller.');
      input.value = '';
      return;
    }

    this.files.set([...this.files(), ...selected].slice(0, 3));
    input.value = '';
  }

  removeFile(index: number): void {
    this.files.update(items => items.filter((_, i) => i !== index));
  }

  submit(): void {
    if (!this.selectedPropertyId()) {
      this.error.set('Please select a property to verify.');
      return;
    }

    if (!this.files().length) {
      this.error.set('Upload at least one verification document (ownership, license, or authorization) before submitting.');
      return;
    }

    this.error.set('');
    this.isSubmitting.set(true);

    const formData = new FormData();
    this.files().forEach(file => {
      formData.append('documents', file);
    });

    this.propertyService.uploadPropertyVerification(this.selectedPropertyId(), formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
        if (this.selectedProperty()) {
          this.selectedProperty.update(p => p ? { ...p, verificationStatus: 'pending' } : null);
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.error.set(err.error?.message || 'Failed to upload verification documents.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
