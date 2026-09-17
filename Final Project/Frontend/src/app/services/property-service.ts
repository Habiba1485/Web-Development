import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/v1/properties';

  getAllProperties(): Observable<Property[]> {
    return this.httpClient
      .get<any>(this.baseUrl)
      .pipe(map((res) => res.data.properties || res.data || []));
  }

  getPropertyById(id: string): Observable<Property> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.property || res.data));
  }

  addProperty(propertyData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, propertyData);
  }

  updateProperty(id: string, propertyData: FormData): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/${id}`, propertyData);
  }

  deleteProperty(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }

  uploadPropertyVerification(id: string, formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${id}/verification`, formData);
  }
}
