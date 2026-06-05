# Adopted Dogs Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the 58 adopted dogs a discoverable home — a `/adopted` page reached by a "View all adopted dogs" button under the home Success Stories marquee — and reframe each adopted dog's existing detail page as a success story, so no adopted-dog page stays orphaned.

**Architecture:** Pure Next.js App Router UI work using the existing VaneUI components and the existing dog data pipeline (`fetchDogs()` over `data/dogs.json`). One enabling change to `DogCard` (opt-in `adoptedView` flag), one new server-component route (`app/adopted/page.tsx`), one button added to the home gallery section, and gated tweaks to the dog detail page. No data-model changes, no new dog content.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, `@vaneui/ui`, TypeScript, Tailwind v4, `next/font`.

**Verification model (read first):** careproject has **no test runner** (`package.json` scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `generate-*`). There is no Jest/Playwright unit harness, so this plan uses **no red-green TDD**. The authoritative per-task gate is:
- `npx tsc --noEmit` → exit 0
- `npx eslint app` → exit 0
- a **manual browser check** on the dev server (`npm run dev`, default port; the user typically runs it from VS Code)

A full `npm run build` is run once at the end (it chains `lint && typecheck && next build`). Commit after each task.

---

### Task 1: Add opt-in `adoptedView` flag to `DogCard`

Today `DogCard` returns `null` for any dog whose status is `Adopted` or `Not available`, so adopted dogs can never render. Add an opt-in flag that lets adopted dogs render **only when the caller asks** (`/adopted`), leaving every existing call site unchanged.

**Files:**
- Modify: `app/components/dogCard.tsx`

- [ ] **Step 1: Update the signature and visibility logic**

Replace the current top of the component (the signature line through the `showStatus` line) with:

```tsx
export default function DogCard(dog: DogMetadata & { adoptedView?: boolean }) {
  const dogImages = dog.images.map((image) => getImageSrc(image));
  const status = dog.status
  const name = dog.name
  const breed = dog.breed
  const age = dog.age
  const gender = dog.gender
  const adoptedView = dog.adoptedView ?? false
  const isAdopted = status === 'Adopted'
  // 'Not available' is always hidden. Adopted dogs are hidden everywhere
  // EXCEPT when a caller explicitly opts in via adoptedView (the /adopted grid).
  const hidden = status === 'Not available' || (isAdopted && !adoptedView)
  const showStatus = status !== 'Available'
  return (
    hidden ? null :
```

Leave the rest of the JSX (the `<Link>` … `</Link>` block, including `{showStatus && <Chip … >{status}</Chip>}`) exactly as it is. The only changed identifier is `notAvailable` → `hidden`.

- [ ] **Step 2: Verify the previous `notAvailable` name is fully gone**

Run: `npx eslint app` and search the file — there must be no remaining reference to `notAvailable`.
Expected: eslint exit 0 (no "notAvailable is not defined").

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0. (The `& { adoptedView?: boolean }` intersection accepts the existing `{...dog}` spread calls, which simply omit the optional flag.)

- [ ] **Step 4: Commit**

```bash
git add app/components/dogCard.tsx
git commit -m "feat(dogCard): add opt-in adoptedView flag to render adopted dogs"
```

---

### Task 2: Create the `/adopted` page

A new server component that lists every adopted dog as a clickable card linking to its existing `/dogs/adopted/<name>` detail page. This is the page that de-orphans all 58 pages.

**Files:**
- Create: `app/adopted/page.tsx`

- [ ] **Step 1: Create the route file**

Create `app/adopted/page.tsx` with exactly:

```tsx
import type { Metadata } from 'next'
import { Section, Container, Col, Grid4, PageTitle, Text } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import DogCard from "@/app/components/dogCard"
import { fetchDogs } from "@/app/data/fetchData"
import { platform_name } from "@/app/data/consts"

export const metadata: Metadata = {
  title: `Adopted Dogs | ${platform_name}`,
  description: "Meet the rescued dogs who found their forever homes through the CARE Project.",
}

export default async function AdoptedDogsPage() {
  const dogs = await fetchDogs()
  const adoptedDogs = dogs.filter((d) => d.status === 'Adopted')

  return (
    <Section>
      <Container xl>
        <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/adopted", text: "Adopted Dogs" }]}/>
        <Col itemsCenter wFull>
          <PageTitle textCenter>Adopted Dogs</PageTitle>
          <Text xl textCenter secondary className="max-w-[600px]">
            Every one of these dogs found their forever home. Thank you for being part of their stories.
          </Text>
        </Col>
        <Grid4 xl wFull>
          {adoptedDogs.map((dog) => (
            <DogCard key={`${dog.location}/${dog.filename}`} {...dog} adoptedView/>
          ))}
        </Grid4>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit` then `npx eslint app`
Expected: both exit 0.

- [ ] **Step 3: Manual browser check**

With the dev server running, open `/adopted`.
Expected: a centered "Adopted Dogs" title + subtitle, a 4-column grid of all adopted dogs, each showing an "Adopted" chip, each clicking through to `/dogs/adopted/<name>`. Confirm `/dogs` and the home page available section are unchanged.

- [ ] **Step 4: Commit**

```bash
git add app/adopted/page.tsx
git commit -m "feat(adopted): add /adopted page listing all adopted dogs"
```

---

### Task 3: Add the "View all adopted dogs" button to the home gallery

**Files:**
- Modify: `app/components/sections/gallerySection.tsx`

- [ ] **Step 1: Replace the file contents**

Replace `app/components/sections/gallerySection.tsx` with:

```tsx
import InfiniteGallery from '../infiniteGallery'
import Link from 'next/link'
import {
  Button,
  Col,
  Container,
  Section,
  SectionTitle,
  Text,
} from "@vaneui/ui"
import { ArrowRight } from "react-feather"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({images}: GallerySectionProps) {
  return (
    <Section>
      <Container xl itemsCenter>
        <Col itemsCenter wFull>
          <SectionTitle>Success Stories</SectionTitle>
          <Text xl textCenter className="max-w-[600px]">
            Celebrate with us! These amazing dogs have found their forever homes through our rescue efforts.
          </Text>
        </Col>
        <InfiniteGallery images={images} className="w-full"/>
        <Button lg tag={Link} href="/adopted">
          View all adopted dogs <ArrowRight/>
        </Button>
      </Container>
    </Section>
  )
}
```

This mirrors the existing "View All Dogs" button in `app/components/sections/availableDogsSection.tsx` (`<Button lg tag={Link} href="/dogs">View All Dogs <ArrowRight/></Button>`).

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit` then `npx eslint app`
Expected: both exit 0.

- [ ] **Step 3: Manual browser check**

Open `/`. Expected: under the Success Stories marquee there is a pill button "View all adopted dogs →" that navigates to `/adopted`.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/gallerySection.tsx
git commit -m "feat(home): add 'View all adopted dogs' button under Success Stories"
```

---

### Task 4: Reframe the dog detail page for adopted dogs

Gate four small changes on `status === 'Adopted'` in `app/dogs/[location]/[file]/page.tsx`. Available/Reserved/etc. dogs are untouched.

**Files:**
- Modify: `app/dogs/[location]/[file]/page.tsx`

- [ ] **Step 1: Compute the `isAdopted` flag**

Immediately after the existing line `const showStatus = status !== 'Available'` (around line 84), add:

```tsx
  const isAdopted = status === 'Adopted'
```

- [ ] **Step 2: Point the breadcrumb at `/adopted` for adopted dogs**

Replace the existing `<Breadcrumbs … />` element with:

```tsx
          <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"},
            isAdopted ? {href: "/adopted", text: "Adopted Dogs"} : {href: "/dogs", text: "Dogs"},
            {href: `/dogs/${location}/${dog.filename.replace(".md", "")}`, text: dog.name}]}/>
```

- [ ] **Step 3: Add the celebratory banner under the title**

In the `<Col sm>` meta block, replace the line `<PageTitle>{dog.name}</PageTitle>` with:

```tsx
              <PageTitle>{dog.name}</PageTitle>
              {isAdopted &&
                <Text lg semibold accent>🐾 Found their forever home</Text>
              }
```

- [ ] **Step 4: Reframe the related-dogs heading**

Replace the line `<SectionTitle>Similar dogs</SectionTitle>` with:

```tsx
            <SectionTitle>{isAdopted ? "Dogs still looking for a home" : "Similar dogs"}</SectionTitle>
```

- [ ] **Step 5: Hide the "Added at / inaccurate data" disclaimer for adopted dogs**

Replace this existing block:

```tsx
            <Divider/>
            <Col>
              <Title xs secondary>
                Added at {getDate(dog.added)}
              </Title>
              <Text sm secondary>
                Please note that the information about the dog is collected at the time the dog was added to the
                website meaning some of the data may not be accurate.
              </Text>
            </Col>
```

with:

```tsx
            {!isAdopted &&
              <>
                <Divider/>
                <Col>
                  <Title xs secondary>
                    Added at {getDate(dog.added)}
                  </Title>
                  <Text sm secondary>
                    Please note that the information about the dog is collected at the time the dog was added to the
                    website meaning some of the data may not be accurate.
                  </Text>
                </Col>
              </>
            }
```

- [ ] **Step 6: Typecheck + lint**

Run: `npx tsc --noEmit` then `npx eslint app`
Expected: both exit 0. (If `getDate` becomes unused for some path it is still used here inside the non-adopted branch, so no unused-import error.)

- [ ] **Step 7: Manual browser check**

Open an adopted dog, e.g. `/dogs/adopted/anya`. Expected: breadcrumb reads Home › Adopted Dogs › Anya; a "🐾 Found their forever home" line under the name; the related section header reads "Dogs still looking for a home"; the "Added at / may not be accurate" note is gone. Then open an available dog (e.g. `/dogs/germasogeia/argo`) and confirm it is unchanged (breadcrumb → Dogs, disclaimer present, "Similar dogs" heading).

- [ ] **Step 8: Commit**

```bash
git add "app/dogs/[location]/[file]/page.tsx"
git commit -m "feat(dogs): reframe adopted dog detail pages as success stories"
```

---

### Task 5: Full build + manual regression, then finish

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: exit 0 (this runs `lint && typecheck && next build`). Fix any error before proceeding.

- [ ] **Step 2: Manual regression pass**

With `npm run dev` (or `npm start` after the build):
- `/` → "View all adopted dogs" button under Success Stories → `/adopted`.
- `/adopted` → grid of all adopted dogs, each links to a detail page.
- Several `/dogs/adopted/<name>` pages → success-story reframe present.
- `/dogs` and an available dog page → unchanged.

- [ ] **Step 3: Mark the plan tasks complete and report**

No code change. Summarize what shipped and confirm all acceptance criteria from the spec are met.

---

## Acceptance criteria (from spec)

1. Home page shows a "View all adopted dogs" button under the Success Stories marquee → `/adopted`. *(Task 3)*
2. `/adopted` renders a grid of all adopted dogs as clickable cards; each links to `/dogs/adopted/<name>`; page has title, subtitle, breadcrumbs, metadata. *(Tasks 1, 2)*
3. Every adopted-dog detail page is reachable by clicking through from `/adopted`. *(Tasks 1, 2)*
4. On adopted detail pages: breadcrumb → `/adopted`, celebratory banner, related heading "Dogs still looking for a home", disclaimer hidden. *(Task 4)*
5. Available-dog pages and all existing listings unchanged. *(Tasks 1 & 4 are gated; verified in Tasks 2/4/5)*
6. `npm run lint` and `npm run typecheck` pass. *(every task + Task 5)*
