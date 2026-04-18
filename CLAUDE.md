# CLAUDE.md

## Project Context

This is a Next.js-based NGO platform for ARTHO’S.

Core goals:

* Enable donations (no payment gateway)
* Register volunteers and donors
* Show transparent statistics
* Manage content (blogs, gallery)
* Provide admin-controlled data

---

## How to Approach Tasks

When working on this project:

1. Understand feature context
2. Reuse existing patterns
3. Keep implementation simple
4. Focus on user clarity

---

## Architecture Overview

### App Structure

All routes are inside:

```
src/app
```

* UI → `page.tsx`
* API → `route.ts`

---

### Separation of Concerns

* UI → `/components`
* Data → `/models`
* Logic → `/lib` or `/utils`
* API → `/app/api`

Never mix all layers in one file.

---

### Data Flow

Form → API → Database → Response → UI feedback

---

## Common Development Tasks

### Adding a Form

* Create UI page
* Add validation
* Create API route
* Store in MongoDB
* Return structured response

---

### Adding a Model

* Define schema in `/models`
* Export properly
* Follow naming consistency

---

### Adding an API

* Place in `src/app/api/.../route.ts`
* Handle POST and GET
* Validate request body

---

### Admin Features

* Protect routes
* Add under `/admin`
* Connect APIs
* Implement CRUD

---

## Design System

### Color Palette

```
primary: #1F6F3D
primaryDark: #14532D
secondary: #E8D3A5
accent: #C9A86A
white: #FFFFFF
dark: #1A1A1A
```

---

### Usage Rules

Background:

* Default → `secondary`
* Alternate sections → `white`

Buttons:

* Default → `primary`
* Hover → `primaryDark`

Text:

* Headings → `primary`
* Body → `dark`

Cards:

* Background → white
* Border → light accent
* Shadow → subtle

---

### Layout Strategy

* Warm beige base
* Green for actions
* White for content separation

---

## Design Philosophy

* Minimal
* Warm
* Human-centered
* Trust-oriented

---

## Performance Guidelines

* Use server components when possible
* Optimize images via Cloudinary
* Avoid unnecessary re-renders

---

## Security Guidelines

* Validate all inputs
* Protect admin routes
* Use environment variables
* Never expose secrets

---

## Mistakes to Avoid

* Mixing frontend/backend logic
* Skipping validation
* Hardcoding values
* Ignoring responsiveness
* Using random colors

---

## Output Expectations

All code must be:

* Clean
* Production-ready
* Consistent
* Minimal but complete

---

## Final Rule

If unsure:

* Use beige background
* Use green for actions
* Use white for content

Consistency is more important than creativity.

---
