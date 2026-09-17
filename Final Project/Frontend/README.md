# StayBook — Angular 22 design conversion

This project is a translation of the uploaded StayBook React/Figma Make design into Angular standalone components.

## Pages included

- `/home` — Home / search / categories / popular properties / host CTA
- `/property/1` (and `/property/:id`) — Property details, gallery, amenities, reviews, booking card
- `/auth` — Sign in / sign up with Guest or Host selection
- `/booking` — Trip review / checkout
- `/payment` — Billing + payment method + price summary
- `/confirmation` — Booking confirmation / receipt-style summary
- `/guest` — Guest dashboard
- `/trips` — My Trips
- `/trip-details` — Trip details
- `/review` — Review form and success state
- `/host` — Host dashboard overview
- `/host/properties` — Host property management
- `/host/bookings` — Host bookings and approve/decline UI
- `/host/verification` — Required property verification document upload UI

There is intentionally **no admin UI or admin route**.

## Host verification

The verification screen accepts PDF/JPG/PNG files up to 10 MB each, supports multiple selected documents, shows selected files, and moves the UI to a pending-review state after submission.

The existing StayBook backend described in the project currently has a single `identityDocument` upload endpoint. When merging this UI into that backend, wire the final verification screen to the backend route/schema you choose for property ownership/authorization documents.

## Run

```powershell
npm install
ng serve
```

Then open:

```text
http://localhost:4200/home
```

## Angular version

The package uses the Angular 22 line and standalone components with modern control-flow syntax.
