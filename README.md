# ARTHO’S NGO Website

## Software Requirements Specification (SRS) / README

---

## 1. Project Overview

**Project Name:** ARTHO’S NGO Website
**Tech Stack:** Next.js (App Router), MongoDB, Cloudinary, Tailwind CSS

This project is a full-stack web platform for ARTHO’S NGO designed to:

* Showcase impact and transparency
* Enable volunteer and donation registrations
* Provide clear donation instructions (no payment gateway)
* Build credibility and engagement

---

## 2. Objectives

* Provide a professional online presence
* Increase volunteer participation
* Simplify donation processes
* Maintain transparent statistics
* Store and manage all user-submitted data

---

## 3. Pages and Routes

### Core Pages

#### `/`

* Hero section (mission statement + CTA)
* Quick navigation buttons
* Highlights of impact (stats preview)
* Featured campaigns
* Testimonials

#### `/about`

* Mission, vision, values
* Organization background
* Team overview

#### `/founder-note`

* Founder’s message
* Image and story-driven content

#### `/impact`

* Dynamic statistics:

  * Rations distributed
  * Blood donations
  * Books donated
* Charts or visual indicators
* Supporting images

---

### Participation Pages

#### `/volunteer`

* Volunteer registration form

#### `/blood-donation`

* Blood donor registration form

#### `/book-donation`

* Book donation form

---

### Donations and Contact

#### `/donate`

* Bank account details
* EasyPaisa / JazzCash information
* Contact details:

  * Phone
  * Email
  * WhatsApp
* Optional donation proof upload

---

### Content Pages

#### `/gallery`

* Image grid (Cloudinary-hosted)
* Optional categories

#### `/blog`

* Blog listing page

#### `/blog/[slug]`

* Individual blog post

---

### Admin Panel

#### `/admin`

* Protected route
* Dashboard to manage:

  * Blogs
  * Gallery images
  * Registrations
  * Statistics

---

## 4. Functional Requirements

### 4.1 Forms

All forms must:

* Validate inputs on client and server
* Show success and error messages
* Store data in MongoDB

---

### Volunteer Form

Fields:

* Name
* Email
* Phone
* City
* Skills
* Availability

---

### Blood Donation Form

Fields:

* Name
* Blood Group
* Phone
* Location
* Last Donation Date
* Emergency Availability

---

### Book Donation Form

Fields:

* Name
* Phone
* Book Category
* Quantity
* Condition
* Pickup Address

---

### Donation Proof (Optional)

Fields:

* Name
* Amount
* Method
* Screenshot upload (Cloudinary)

---

### 4.2 Blog System

* Admin can create, edit, and delete posts

Fields:

* Title
* Slug
* Content
* Cover Image (Cloudinary)
* Created Date

---

### 4.3 Gallery System

* Admin uploads images
* Images stored on Cloudinary
* Displayed in responsive grid

---

### 4.4 Statistics Management

* Admin updates statistics manually or through dashboard

Stored values:

* Rations
* Blood donations
* Books donated

---

### 4.5 Admin Authentication

* Secure login required
* Protected routes using JWT or session-based authentication

---

## 5. Database Design (MongoDB)

### Collections

#### volunteers

```
name
email
phone
city
skills
availability
createdAt
```

---

#### bloodDonors

```
name
bloodGroup
phone
location
lastDonationDate
isAvailable
createdAt
```

---

#### bookDonations

```
name
phone
category
quantity
condition
address
createdAt
```

---

#### donations

```
name
amount
method
proofImageUrl
createdAt
```

---

#### blogs

```
title
slug
content
imageUrl
createdAt
```

---

#### gallery

```
imageUrl
category
createdAt
```

---

#### stats

```
rations
bloodDonations
booksDonated
updatedAt
```

---

## 6. Cloudinary Integration

Used for:

* Blog images
* Gallery images
* Donation proof uploads

---

## 7. Component Structure

### Shared Components

* Navbar
* Footer
* Button
* FormInput
* Card
* SectionWrapper

### Feature Components

* StatsCounter
* BlogCard
* GalleryGrid
* AdminTable
* UploadWidget

---

## 8. Security Requirements

* Server-side input validation
* Rate limiting for forms
* Secure admin authentication
* Environment variables for secrets

---

## 9. Project Structure

All application code resides inside the `src` directory.

```
/src
  /app
    layout.tsx
    page.tsx

    /about
      page.tsx

    /founder-note
      page.tsx

    /impact
      page.tsx

    /volunteer
      page.tsx

    /blood-donation
      page.tsx

    /book-donation
      page.tsx

    /donate
      page.tsx

    /gallery
      page.tsx

    /blog
      page.tsx
      /[slug]
        page.tsx

    /admin
      page.tsx
      /login
        page.tsx
      /dashboard
        page.tsx
      /blogs
        page.tsx
      /gallery
        page.tsx
      /stats
        page.tsx
      /registrations
        page.tsx

    /api
      /volunteer
        route.ts
      /blood-donation
        route.ts
      /book-donation
        route.ts
      /donation
        route.ts
      /blogs
        route.ts
      /gallery
        route.ts
      /stats
        route.ts
      /auth
        route.ts

  /components
    Navbar.tsx
    Footer.tsx
    Button.tsx
    FormInput.tsx
    Card.tsx
    StatsCounter.tsx
    BlogCard.tsx
    GalleryGrid.tsx
    AdminTable.tsx
    UploadWidget.tsx

  /lib
    mongodb.ts
    cloudinary.ts
    auth.ts

  /models
    Volunteer.ts
    BloodDonor.ts
    BookDonation.ts
    Donation.ts
    Blog.ts
    Gallery.ts
    Stats.ts

  /utils
    validators.ts
    helpers.ts

  /styles
    globals.css
```
---
## 10. Design System
Color Palette

Primary:

#1F6F3D   // primary (main green)
#14532D   // primaryDark (hover / emphasis)

Secondary:

#E8D3A5   // secondary (beige background)
#C9A86A   // accent (borders / subtle contrast)

Neutral:

#FFFFFF   // white
#1A1A1A   // dark text
Tailwind Configuration

Add to tailwind.config.js:

theme: {
  extend: {
    colors: {
      primary: "#1F6F3D",
      primaryDark: "#14532D",
      secondary: "#E8D3A5",
      accent: "#C9A86A",
      light: "#FFFFFF",
      dark: "#1A1A1A",
    },
  },
},

### Usage Guidelines
Background: secondary or white
Headings: primary
Body text: dark
Buttons:
Primary: primary → hover primaryDark
Secondary: outline primary

---
