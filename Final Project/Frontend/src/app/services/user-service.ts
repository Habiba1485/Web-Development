import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/v1/users';

  getMyProfile(): Observable<User> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/me`)
      .pipe(map((res) => res.data?.user || res.data));
  }

  updateMyProfile(userData: Partial<User>): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/me`, userData);
  }

  updateAvatar(formData: FormData): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/avatar`, formData);
  }

  uploadIdentityDocument(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/identity`, formData);
  }
}
