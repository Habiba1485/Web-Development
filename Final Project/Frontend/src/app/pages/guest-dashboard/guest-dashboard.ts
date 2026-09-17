import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StayBookStore } from '../../services/staybook-store';

@Component({
  selector: 'app-guest-dashboard',
  imports: [RouterLink],
  templateUrl: './guest-dashboard.html',
  styleUrl: './guest-dashboard.css'
})
export class GuestDashboardPage {
  private store = inject(StayBookStore);
  trips = this.store.bookings;

  get upcomingTrip() {
    return this.trips().find((trip) => trip.status === 'confirmed');
  }
}
