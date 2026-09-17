import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { PropertyPage } from './pages/property/property';
import { AuthPage } from './pages/auth/auth';
import { BookingPage } from './pages/booking/booking';
import { PaymentPage } from './pages/payment/payment';
import { ConfirmationPage } from './pages/confirmation/confirmation';
import { MyTripsPage } from './pages/my-trips/my-trips';
import { TripDetailsPage } from './pages/trip-details/trip-details';
import { ReviewPage } from './pages/review/review';
import { HostDashboardPage } from './pages/host-dashboard/host-dashboard';
import { HostPropertiesPage } from './pages/host-properties/host-properties';
import { HostBookingsPage } from './pages/host-bookings/host-bookings';
import { VerificationPage } from './pages/verification/verification';
import { authGuard } from './guards/auth.guard';
import { hostGuard } from './guards/host.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage, title: 'StayBook — Home' },
  { path: 'properties', component: HomePage, title: 'StayBook — Properties' },
  { path: 'property', pathMatch: 'full', redirectTo: 'home' },
  { path: 'property/:id', component: PropertyPage, title: 'StayBook — Property Details' },

  // Authentication
  { path: 'auth', component: AuthPage, title: 'StayBook — Sign In' },
  { path: 'signin', component: AuthPage, title: 'StayBook — Sign In' },
  { path: 'signup', component: AuthPage, title: 'StayBook — Sign Up' },

  // Booking & Checkout Flow
  { path: 'booking', component: BookingPage, title: 'StayBook — Review Trip' },
  { path: 'payment', component: PaymentPage, title: 'StayBook — Payment' },
  { path: 'confirmation', component: ConfirmationPage, title: 'StayBook — Confirmed' },

  // Guest Routes
  { path: 'trips', component: MyTripsPage, canActivate: [authGuard], title: 'StayBook — My Trips' },
  { path: 'guest', component: MyTripsPage, canActivate: [authGuard], title: 'StayBook — Guest Trips' },
  { path: 'guest/dashboard', component: MyTripsPage, canActivate: [authGuard], title: 'StayBook — Guest Dashboard' },
  { path: 'trip-details', component: TripDetailsPage, canActivate: [authGuard], title: 'StayBook — Trip Details' },
  { path: 'trip-details/:id', component: TripDetailsPage, canActivate: [authGuard], title: 'StayBook — Trip Details' },
  { path: 'review', component: ReviewPage, canActivate: [authGuard], title: 'StayBook — Review' },
  { path: 'review/:id', component: ReviewPage, canActivate: [authGuard], title: 'StayBook — Review' },

  // Host Routes
  { path: 'host', component: HostDashboardPage, canActivate: [hostGuard], title: 'StayBook — Host Dashboard' },
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'host' },
  { path: 'host/properties', component: HostPropertiesPage, canActivate: [hostGuard], title: 'StayBook — My Properties' },
  { path: 'host/bookings', component: HostBookingsPage, canActivate: [hostGuard], title: 'StayBook — Host Bookings' },
  { path: 'host/verification', component: VerificationPage, canActivate: [hostGuard], title: 'StayBook — Property Verification' },

  // Wildcard fallback
  { path: '**', redirectTo: 'home' }
];
