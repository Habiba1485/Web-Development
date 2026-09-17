import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/v1/reviews';

  getPropertyReviews(propertyId: string): Observable<Review[]> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/property/${propertyId}`)
      .pipe(map((res) => res.data?.reviews || res.data || []));
  }

  createReview(reviewData: { property: string; rating: number; comment: string }): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, reviewData);
  }

  deleteReview(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
