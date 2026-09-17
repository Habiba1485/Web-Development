import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../services/review-service';
import { PropertyService } from '../../services/property-service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class ReviewPage implements OnInit {
  private reviewService = inject(ReviewService);
  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  propertyId = signal<string>('');
  property = signal<Property | null>(null);

  overallRating = signal(5);
  comment = '';
  isSubmitting = signal(false);
  errorMessage = signal('');
  submitted = signal(false);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.propertyId.set(id);
        this.loadProperty(id);
      }
    });

    this.route.queryParams.subscribe(q => {
      if (q['propertyId']) {
        this.propertyId.set(q['propertyId']);
        this.loadProperty(q['propertyId']);
      }
    });
  }

  loadProperty(id: string): void {
    this.propertyService.getPropertyById(id).subscribe({
      next: (res) => this.property.set(res),
      error: () => {}
    });
  }

  setRating(num: number): void {
    this.overallRating.set(num);
  }

  submit(): void {
    if (!this.propertyId()) {
      this.errorMessage.set('Property ID is required to leave a review.');
      return;
    }
    if (!this.comment.trim()) {
      this.errorMessage.set('Please write a comment for your review.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.reviewService.createReview({
      property: this.propertyId(),
      rating: this.overallRating(),
      comment: this.comment
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitted.set(true);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to submit review. Please try again.');
      }
    });
  }
}
