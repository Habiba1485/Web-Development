# StayBook - Vacation Rental & Booking Platform

## 📖 1. Project Description
**Problem Solved:** Finding reliable short-term accommodations is difficult for travelers, while property owners struggle to manage availability, pricing, and bookings in one secure place.

**Target Users:** Travelers (Guests) looking for places to stay, and Property Owners (Hosts) looking to rent out their spaces.

**Main Purpose:** A centralized platform where hosts can list their properties, manage availability calendars, and track earnings, while guests can search for accommodations by location/date, book stays securely, and leave reviews.

---

## 👥 2. Identify Users and Roles

### 1. Admin
* **Permissions:** Full system access.
* **Actions:** Manage users (ban/suspend), resolve booking disputes, manage platform-wide amenities (e.g., adding "WiFi" or "Pool" to the global list), and view system financial reports.

### 2. Host 
* **Permissions:** Manage their own property listings and view bookings made for their properties.
* **Actions:** Create/edit/delete property listings, set pricing and availability, accept/decline bookings, view earnings, and message guests.

### 3. Guest
* **Permissions:** Manage their own profile and booking history.
* **Actions:** Search and filter properties, create bookings, cancel bookings (within policy), leave ratings and reviews, update profile.

---

## ⚙️ 3. Define Main Features

### Authentication Features:
- [x] User Registration (with option to register as a Guest or a Host)
- [x] User Login & Logout
- [x] Email Verification
- [x] Password Reset

### Authorization Features:
- [x] Protected API Routes (e.g., only a Guest can leave a review, only Admin can access all users)
- [x] Ownership checks (Hosts can only edit their own properties; Guests can only cancel their own bookings)

### CRUD Features:
**Properties Management (Host):**
* **Create:** Add a new property (title, description, price, max guests, location).
* **Read:** View their own properties (Host) / Browse all properties (Public).
* **Update:** Change pricing, update description, block out calendar dates.
* **Delete:** Unlist/remove a property.

**Bookings Management (Guest/Host):**
* **Create:** Guest books specific dates.
* **Read:** Guest views "My Trips"; Host views "Upcoming Reservations".
* **Update:** Modify booking dates (requires host approval).
* **Delete:** Cancel a booking.

**Reviews Management (Guest):**
* **Create:** Write a review after a completed stay.
* **Read:** View reviews on a property page.
* **Delete:** Remove their own review.

---

## 📁 4. Image/File Upload Features

* **User Profile Image (Avatar):**
  * **Allowed:** JPG, PNG, WEBP
  * **Max Size:** 2 MB
  * **Uploaded by:** All Users (Admin, Host, Guest)
* **Property Image Gallery:**
  * **Allowed:** JPG, PNG (High resolution for property showcases)
  * **Max Size:** 5 MB per image (up to 5 images per property)
  * **Uploaded by:** Hosts
* **Identity Verification Document (e.g., Passport/ID):**
  * **Allowed:** PDF, JPG
  * **Max Size:** 10 MB
  * **Uploaded by:** Hosts (required before they can list a property - viewable only by Admins)

---


## 🎨 5. UI Design

Here is a preview of the StayBook interface:
[Click here to view the full UI mockups](https://app.visily.ai/projects/dee71613-4fe7-4b09-b4cf-feffcdef4df9/boards/2685205/presenter?play-mode=All+screens)
