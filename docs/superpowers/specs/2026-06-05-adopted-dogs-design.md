# Adopted Dogs page — design

**Date:** 2026-06-05
**Branch:** `feat/adopted-dogs-page`
**Status:** Approved (pending spec review)

## Problem

The careproject site has **58 adopted dogs**. Each already has a working detail page at
`/dogs/adopted/<name>`, but **nothing links to them**:

- `DogCard` returns `null` when `status === 'Adopted'` (`app/components/dogCard.tsx:20`).
- Every listing filters adopted dogs out (`app/dogs/dogsCollection.tsx:17`, `app/page.tsx:22`,
  the detail page's "Similar dogs" block at `app/dogs/[location]/[file]/page.tsx:74-76`).
- Adopted dogs appear only as a **non-clickable** auto-scrolling marquee ("Success Stories",
  `GallerySection` → `InfiniteGallery`) on the home page, capped at 15 images.

Result: the 58 adopted-dog pages render (HTTP 200, included in `sitemap.ts`) but are
**navigationally orphaned** — no internal links, not discoverable through the UI.

## Goal

Give adopted dogs a discoverable home and an internal link to every adopted-dog page, and make
those detail pages read as success stories rather than live adoption listings.

## Decisions (from brainstorming)

- Adopted dogs get a **dedicated `/adopted` page** ("Adopted Dogs"), reached via a **"View all
  adopted dogs"** button placed under the home-page Success Stories marquee.
- The marquee itself stays non-clickable eye-candy; the button is the entry point.
- The existing detail pages are **reused** (not recreated) and **reframed** for adopted dogs.
- No data-model changes. There is no adoption-date field, so none is shown.

## Changes

### 1. Home `GallerySection` — "View all adopted dogs" button
`app/components/sections/gallerySection.tsx`

Add a VaneUI `Button` (`tag={Link}`, `href="/adopted"`) below `<InfiniteGallery>`, mirroring the
existing "View All Dogs" button in `AvailableDogsSection`
(`app/components/sections/availableDogsSection.tsx:34-36`). Label: **"View all adopted dogs"**,
with a trailing `ArrowRight` icon to match the available-dogs button.

### 2. New route `app/adopted/page.tsx`
A server component, structured like `app/dogs/page.tsx` + the existing section layout:

- `fetchDogs()`, filter `dog.status === 'Adopted'` → all 58.
- `PageTitle` "Adopted Dogs" + a short celebratory subtitle.
- Breadcrumbs: Home › Adopted Dogs.
- A responsive grid of **clickable** adopted-dog cards, each linking to `/dogs/adopted/<name>`.
  Use the same grid component as the available-dogs section (`Grid4`) for visual consistency.
- `generateMetadata` with title `Adopted Dogs | <platform_name>` and OG image.

### 3. Render adopted dogs as cards
`app/components/dogCard.tsx`

`DogCard` currently hard-returns `null` for adopted dogs. Add an opt-in flag so adopted dogs can
render **only on `/adopted`**:

- Extend the prop shape to `DogMetadata & { adoptedView?: boolean }` (works with the existing
  spread call sites).
- When `adoptedView` is true, render the card (link + image + name/breed/age) **with the "Adopted"
  chip** instead of returning `null`.
- Default behavior (`adoptedView` absent/false) is unchanged everywhere else — adopted dogs stay
  hidden from the available listings.

### 4. Detail-page success-story reframe (adopted dogs only)
`app/dogs/[location]/[file]/page.tsx`, gated on `dog.status === 'Adopted'`:

- **Breadcrumb** middle crumb → `{ href: "/adopted", text: "Adopted Dogs" }` instead of
  `{ href: "/dogs", text: "Dogs" }`.
- A small **celebratory banner/badge** near the `PageTitle` — e.g. "Found their forever home"
  (the gallery already renders the "Adopted" status chip via `chipText`).
- **"Similar dogs"** heading → **"Dogs still looking for a home"** (the block already shows only
  *available* dogs — keep that, just reframe the heading for the adopted context).
- **Hide** the "Added at … / data may not be accurate" disclaimer block — it is meant for live
  listings, not a dog who is already home.

Available / Reserved / In-foster / Not-available dogs render exactly as today.

## Out of scope

- No changes to available-dog listings, home `dogsToShow`/carousel, or `DogsCollection` filters.
- No new dog content/markdown pages (they already exist).
- No data-model / `dogMetadata` field additions (no adoption date).
- No header/footer nav change. (Optional future nicety: a footer link to `/adopted`. Not needed —
  the home button + the `/adopted` grid already de-orphan every page.)

## Acceptance criteria

1. Home page shows a "View all adopted dogs" button under the Success Stories marquee linking to
   `/adopted`.
2. `/adopted` renders a grid of all 58 adopted dogs as clickable cards; each links to its
   `/dogs/adopted/<name>` page; page has title, subtitle, breadcrumbs, and metadata.
3. Every adopted-dog detail page is reachable by clicking through from `/adopted` (no orphans).
4. On an adopted dog's detail page: breadcrumb points to `/adopted`, a celebratory banner shows,
   the related-dogs heading reads "Dogs still looking for a home", and the inaccuracy disclaimer is
   hidden.
5. Available-dog pages and all existing listings are visually and behaviorally unchanged.
6. `npm run lint` and `npm run typecheck` pass.

## Verification

- `npx tsc --noEmit` and `npx eslint app` green.
- Manual: load `/`, click "View all adopted dogs" → `/adopted`; open several adopted dogs; confirm
  the reframe; confirm `/dogs` and home available section unchanged.
