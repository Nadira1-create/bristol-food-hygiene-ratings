# Bristol Food Hygiene Ratings Web Application

> A client-side, multi-page web application that makes Bristol's food hygiene ratings accessible, filterable, and understandable for every member of the public. No account required.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Pages](#pages)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
- [Dataset](#dataset)
- [Architecture](#architecture)
  - [Architectural Style](#architectural-style)
  - [Major Components](#major-components)
  - [Design Patterns Applied](#design-patterns-applied)
- [Data Queries](#data-queries)
- [Accessibility](#accessibility)
- [Known Issues](#known-issues)
- [Testing](#testing)
- [Version History](#version-history)
- [Design Artefacts](#design-artefacts)
- [Data Attribution](#data-attribution)
- [Module Information](#module-information)

---

## Project Overview

Food hygiene information is a matter of public health, yet accessing it for Bristol businesses remains unnecessarily difficult. The Food Standards Agency (FSA) ratings portal is not optimised for mobile use, provides limited filtering capability, and requires users to navigate multiple pages to find information about a single business.

This application bridges the gap between the publicly available Open Bristol dataset and the general public's ability to use it effectively. It provides a clean, responsive, and accessible interface through which any member of the public can:

- Search for food businesses in Bristol by name, postcode, or address
- Filter results by hygiene rating score (0 to 5) and business type
- View full inspection records including the official FSA rating graphic
- Understand what each rating score means in plain language

All features are available without registration, login, or any personal data disclosure. The application is built entirely with HTML5, CSS3, and vanilla JavaScript. There are no frameworks, no back-end server, and no database.

**Current Version:** `1.0.0`  
**Author:** Nadira Ali Robleh  
**Module:** UFCF9F-30-1 Information Systems Development  
**Date:** 06 April 2026

---

## Features

- **Full-text search:** Search by business name, postcode, or address with AND-logic multi-word support and automatic postcode normalisation
- **Rating filter:** Filter results by any combination of hygiene scores 0 through 5
- **Business type filter:** Filter by category: Restaurant/Cafe, Takeaway, Pub/Bar, School, Hotel, and more
- **Combined filters:** Apply a rating filter and a type filter simultaneously; results update instantly
- **Active filter chips:** Clearly displayed above results; remove individual filters without returning to the panel
- **Category tile navigation:** Browse by business type directly from the homepage without typing a query
- **Rating pill shortcuts:** Jump to pre-filtered results for any rating score from the homepage
- **Paginated results:** Results displayed in a paginated list for efficient browsing
- **Live statistics bar:** Homepage displays total businesses, number rated 5, number awaiting inspection, and more, derived directly from the embedded dataset
- **Business details view:** Full inspection record including all nine dataset fields, the official FSA rating sticker graphic, and a rating explanation panel
- **Conditional status notices:** Automatically displayed notices for Awaiting Inspection (purple), New Rating Pending (yellow), and Exempt (light blue) statuses
- **Rating Guide page:** Comprehensive plain-language explanations of all six rating scores and three special statuses
- **Graceful error handling:** User-friendly error panel with Retry button if page initialisation fails (NFR7)
- **Rating graphic fallback:** Numeric rating displayed as styled text if the FSA image URL fails to load (FR13)
- **State preserved on back navigation:** Search query and active filters restored from URL parameters when returning from the details page
- **Barrier-free access:** All features accessible immediately, with no account or login required

---

## Pages

| Page | File | Description |
|---|---|---|
| Homepage | `index.html` | Primary search interface with hero search bar, Browse by Business Type category tiles, live statistics bar, and rating summary |
| Search Results | `Search.html` | Paginated, filterable list of business cards with a sidebar filter panel; handles empty-state and error-state displays |
| Business Details | `Business-Detail.html` | Full inspection record for a selected business; includes official FSA rating graphic, full dataset field table, rating explanation panel, and conditional notice panels |
| Rating Guide | `Rating-Guide.html` | Plain-language guide to all six numeric rating scores (0 to 5) and all three special status categories (Awaiting Inspection, New Rating Pending, Exempt) |

---

## Project Structure

```
BRISTOL-FOOD-HYGIENE-RATINGS/
|
+-- .vscode/
|   +-- launch.json              # VS Code local server launch configuration
|
+-- assets/
|   +-- [icons and images]       # Application logo and category tile illustration icons
|
+-- index.html                   # Homepage, primary entry point
+-- Search.html                  # Search Results page
+-- Business-Detail.html         # Business Details page
+-- Rating-Guide.html            # Rating Guide page
+-- Main.js                      # Shared mobile navigation module (IIFE)
+-- data.js                      # Data layer: ALL_BUSINESSES array and all logic and page initialisers
+-- Style.css                    # Global stylesheet: design system, grid, all components
+-- serve.json                   # Static file server configuration for local development
```

### File Responsibilities

| File | Role |
|---|---|
| `index.html` | Homepage. Contains the hero search bar, Browse by Business Type tiles, live statistics bar, and the rating summary section. |
| `Search.html` | Search Results page. Renders the filter panel, paginated results list, empty-state panel, and error-state panel. Receives the search query and any pre-applied filters via URL query parameters. |
| `Business-Detail.html` | Business Details page. Displays the full inspection record, the official rating graphic, all dataset fields in a structured description list, the rating explanation panel, and all three conditional notice panels. |
| `Rating-Guide.html` | Rating Guide page. Comprehensive explanation of all six numeric scores and all three special statuses. No data initialisation required beyond the mobile navigation toggle. |
| `Main.js` | Shared navigation module. Handles the mobile navigation toggle across all pages: creates the backdrop scrim, manages ARIA states, syncs the panel position to the live header height, and handles all close triggers (Escape key, backdrop click, resize, orientation change, media query change). Wrapped in an IIFE to avoid polluting the global scope. |
| `data.js` | Data and application logic module. Section A contains the `ALL_BUSINESSES` array (3,867 records). Section B contains all configuration constants, lookup tables, utility functions, and three page initialisers (`initHomepage`, `initSearchPage`, `initDetailPage`). A `DOMContentLoaded` listener auto-detects the current page and routes to the correct initialiser. |
| `Style.css` | Global stylesheet shared across all four pages. Defines CSS custom property variables for the full design system (colours, spacing, border radii, shadows), implements the twelve-column CSS grid layout, and defines three responsive breakpoints (desktop 1024 px and above, tablet 768 to 1023 px, mobile below 768 px). Organised into 35 clearly labelled sections. |
| `serve.json` | Static file server configuration ensuring correct MIME types are served for all asset types during local development. |
| `.vscode/launch.json` | VS Code debugger configuration. Launches the local server automatically from within the editor. |
| `assets/` | All static media: application logo and illustration icons for the Browse by Business Type category tiles on the homepage. |

---

## Getting Started

### Prerequisites

- A modern web browser: **Google Chrome 122 or later** (primary) or **Mozilla Firefox 123 or later** (secondary)
- JavaScript must be enabled in the browser
- All source files must be present: `index.html`, `Search.html`, `Business-Detail.html`, `Rating-Guide.html`, `Main.js`, `data.js`, `Style.css`
- All asset files must be present in the `assets/` directory
- Optional: The [WAVE accessibility browser extension](https://wave.webaim.org/extension/) for accessibility verification

No build tools, package managers, npm packages, API keys, environment variables, or compilation steps are required. The application is fully self-contained.

### Running Locally

**Option 1: Static file server (recommended)**

If you have the `serve` package installed, run the following command from the project root directory:

```bash
serve .
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

The `serve.json` configuration file in the project root ensures all assets are served with the correct MIME types over HTTP.

**Option 2: Direct file system**

Because all data is embedded directly in `data.js` with no Fetch API calls, the application can also be opened directly from the file system without a server. Open `index.html` in your browser using File > Open, or by double-clicking the file. All four pages and all features will function correctly in this mode.

**Option 3: VS Code Live Server**

Open the project folder in VS Code. The `.vscode/launch.json` configuration will launch the local server automatically.

---

## Dataset

All food hygiene data is sourced from the **Open Bristol open data portal**, which publishes the Food Hygiene Ratings dataset as a publicly accessible CSV file maintained by Bristol City Council.

The dataset is pre-processed and embedded directly in `data.js` as a static JavaScript array (`ALL_BUSINESSES`). This means the application requires no network requests to function and works correctly whether served over HTTP or opened directly from the file system.

**Total records: 3,867**, each representing a registered food business in the Bristol area.

### Dataset Fields

Each record contains the following nine fields:

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique numeric identifier for each record |
| `name` | String | Trading name of the food business |
| `address` | String | Full street address including area and city |
| `postcode` | String | Postal code of the business premises |
| `businessType` | String | FSA category string (14 distinct types in the dataset) |
| `rating` | Number / null | Hygiene rating score 0 to 5; `null` if the business is unrated |
| `ratingStatus` | String | One of: `''` (rated), `'AwaitingInspection'`, `'AwaitingPublication'`, or `'Exempt'` |
| `newRatingPending` | Boolean | Whether a new rating is currently pending publication |
| `ratingDate` | String | ISO-format date string `'YYYY/MM/DD HH:MM:SS+00'`; empty string if not yet inspected |

### Rating Distribution

| Rating | Label | Count | Percentage |
|---|---|---|---|
| 5 | Very Good | 2,450 | 63.4% |
| 4 | Good | 561 | 14.5% |
| 3 | Generally Satisfactory | 185 | 4.8% |
| 2 | Improvement Necessary | 27 | 0.7% |
| 1 | Major Improvement Necessary | 36 | 0.9% |
| 0 | Urgent Improvement Required | 8 | 0.2% |
| null | Unrated (Awaiting / Exempt / Pending) | 600 | 15.5% |

Of the 600 unrated businesses, 440 are marked `AwaitingInspection`, 158 are `Exempt` from the rating scheme, and 2 are `AwaitingPublication` (inspected but not yet formally published).

### Business Type Categories

The dataset includes 14 distinct business type categories: Restaurant/Cafe/Canteen, Takeaway/sandwich shop, Pub/bar/nightclub, Retailers - other, Retailers - supermarkets/hypermarkets, Hotel/bed and breakfast/guest house, School/college/university, Mobile caterer, Manufacturers/packers, Hospitals/Childcare/Caring Premises, Other catering premises, Distributors/Transporters, Farmers/growers, and Importers/Exporters.

> **Note:** The dataset is a static snapshot embedded at development time. Inspection results published after the dataset export date are not reflected in the application. A data attribution notice is displayed in the footer of every page.

---

## Architecture

### Architectural Style

The application follows a **client-side, multi-page application (MPA)** architectural style. All processing, data access, filtering, and rendering is performed entirely in the user's browser using JavaScript. No server-side rendering, back-end API, or database is involved.

Navigation between pages is handled through standard HTML hyperlinks. Page-to-page state, including the selected business `id`, current search term, active filters, page number, and sort preference, is passed via **URL query parameters**. This means users can bookmark or share any specific search result or business detail URL, and the browser's Back button always restores a meaningful state.

### Major Components

#### 1. Data and Logic Component: `data.js`

The data and application logic layer, structured in two sections:

- **Section A:** The `ALL_BUSINESSES` array containing all 3,867 embedded business records, available synchronously at module parse time.
- **Section B:** All configuration constants, lookup tables (rating labels, business type mappings, display labels, month names), utility functions, and three page initialisers: `initHomepage()`, `initSearchPage()`, and `initDetailPage()`.

A `DOMContentLoaded` event listener at the end of the file calls `detectPage()` to identify the current page by filename and routes to the correct initialiser automatically.

#### 2. Navigation Component: `Main.js`

The shared navigation module, loaded on every page. Wrapped in an **immediately invoked function expression (IIFE)** to avoid polluting the global scope. Handles all mobile navigation toggle behaviour: manages open and closed states of the navigation panel with full ARIA attribute updates, syncs the panel's top position to the live header height via the `--nav-top` CSS custom property, and handles all close triggers including the Escape key, backdrop click, nav link click, outside click, resize, orientation change, and media query change events.

#### 3. View Layer: HTML Pages

The four HTML pages form the view layer. Each page provides the structural HTML skeleton, including the shared navigation bar, page-specific content containers, and shared footer, but contains no inline JavaScript logic. All behaviour is injected by `Main.js` and `data.js` via `<script>` tags at the end of each page's `<body>`. This clean separation between structure (HTML) and behaviour (JavaScript) satisfies NFR10 and makes the codebase significantly easier to maintain and extend.

#### 4. Style Layer: `Style.css`

A single shared stylesheet serving all four pages. Defines CSS custom properties for every design system token (primary green colour palette, rating badge colours, status badge colours, spacing increments, border radii, card shadow values, and transition durations). Implements the **twelve-column CSS grid layout** and three responsive breakpoints. Organised into 35 clearly labelled sections with a table of contents at the top.

#### 5. Configuration Layer: `serve.json` and `launch.json`

Two JSON files that configure the local development environment. Neither contains application logic and neither is deployed to production.

### Design Patterns Applied

| Pattern / Principle | Where Applied | Benefit |
|---|---|---|
| Separation of Concerns | `data.js` (data and logic) vs `Main.js` (navigation) vs HTML (structure) vs CSS (style) | Each concern can be modified independently without affecting the others |
| Single Responsibility | `data.js` handles all data and rendering; `Main.js` handles mobile navigation only | Keeps each module focused, readable, and easy to test in isolation |
| URL as State | Search term, active filters, page number, sort preference, and business `id` passed via URL query parameters | Allows bookmarking and sharing; the Back button always restores a meaningful state |
| Progressive Enhancement | Rating badge falls back to numeric text if the FSA graphic URL fails to load | Application remains fully usable even when external resources are unavailable |
| Responsive Design | CSS media queries in `Style.css` adapt the layout for desktop, tablet, and mobile | Satisfies NFR2 and ensures accessibility across all device types |
| DRY (Don't Repeat Yourself) | Shared navigation bar, footer, stylesheet, and reusable component styles defined once | Reduces duplication; any change to a shared element propagates to every page automatically |
| Event Delegation | Single listener on the `.active-filters` container handles all chip removal clicks | Prevents duplicate listeners accumulating on re-render; no JS changes needed when new chips are added |
| Debouncing | `debounce()` utility applied to the live search input on the search page | Prevents filtering logic firing on every keystroke; protects performance during fast typing |
| Input Whitelisting | `VALID_SORTS` array rejects arbitrary sort values from URL parameters or `sessionStorage` | Prevents tampered URLs from introducing unexpected sort behaviour |

---

## Data Queries

Because data is embedded and all operations are in-memory, the application does not issue live HTTP requests to the Open Bristol portal. The following five client-side operations replace what would otherwise be separate API calls.

### Query 1: Full Dataset Load

All 3,867 records in `ALL_BUSINESSES` are made available synchronously at module parse time, before any `DOMContentLoaded` event fires. No network failure path exists for this operation.

### Query 2: Text Search Filter

Filters the in-memory dataset to return only records whose `name`, `address`, `postcode`, or rating label fields contain **all words** in the user's search term (AND logic, case-insensitive). Postcode normalisation strips whitespace before comparison, so `"BS11AA"` and `"BS1 1AA"` are treated identically.

```javascript
function matchesBusiness(biz, tokens) {
  var label  = RATING_LABELS[biz.rating] || '';
  var target = (biz.name + ' ' + biz.address + ' ' +
                biz.postcode.replace(/\s/g, '') + ' ' + label).toLowerCase();
  return tokens.every(function (token) {
    return target.indexOf(token) !== -1;
  });
}
```

### Query 3: Rating Filter

Filters results to records whose `rating` field matches one or more of the user's selected rating values. If no ratings are selected, the full unfiltered set is returned unchanged.

```javascript
if (params.ratings.length) {
  results = results.filter(function (biz) {
    return params.ratings.indexOf(biz.rating) !== -1;
  });
}
```

### Query 4: Business Type Filter

Filters results using the `CSV_TYPE_TO_FILTER` lookup table, which maps FSA raw category strings to user-facing filter keys. Business types not explicitly mapped fall through to the key `'other'`.

```javascript
var CSV_TYPE_TO_FILTER = {
  'Restaurant/Cafe/Canteen'           : 'restaurant',
  'Takeaway/sandwich shop'            : 'takeaway',
  'Pub/bar/nightclub'                 : 'pub-bar',
  'School/college/university'         : 'school',
  'Hotel/bed & breakfast/guest house' : 'hotel'
};
```

### Query 5: Single Record Lookup by ID

Retrieves the full data record for a single business to populate the Business Details page. `initDetailPage()` reads the `?id=` parameter from the URL and locates the record using `Array.prototype.find()`. If no matching record is found (for example, if the URL has been manually altered), a demo-mode notice is displayed rather than an unhandled error.

```javascript
function initDetailPage() {
  var params = new URLSearchParams(window.location.search);
  var id     = params.get('id');
  var biz    = id
    ? ALL_BUSINESSES.find(function (b) { return b.id === id; })
    : null;

  if (biz) {
    showBusiness(biz);
  } else {
    showBusinessSelector();
  }
}
```

---

## Accessibility

The application is designed to meet **WCAG 2.1 Level AA** accessibility standards throughout.

- **Colour contrast:** All text and background colour combinations meet or exceed the WCAG 2.1 minimum ratio of 4.5:1 for normal text and 3:1 for large text
- **Colour not used alone:** Every rating badge displays both a colour and a numeric value; every status badge displays both a colour and a text label, ensuring information is accessible to users with colour vision deficiencies
- **Alternative text:** All informative images include descriptive `alt` attributes; all decorative images use `aria-hidden` and empty `alt` attributes
- **Keyboard navigation:** All interactive elements are reachable and operable via keyboard; a skip navigation link is provided to bypass the navigation bar and reach main content directly
- **ARIA state management:** The mobile navigation panel uses ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`) toggled correctly on all open and close events; the Escape key and backdrop click both manage focus correctly
- **Visible focus indicators:** Focus rings are visible on all interactive elements throughout the application
- **Screen reader compatibility:** Form inputs include visible labels and accessible error messages announced by screen readers

Accessibility was verified using the WAVE browser extension on Google Chrome 124 across all four pages (TC24, TC25). No contrast failures or ARIA errors were reported.

---

## Known Issues

### Issue 1: External Rating Graphic URLs

The official FSA rating badge images are hosted on an external domain (`ratings.food.gov.uk`). If this domain is unavailable or the image URLs change in a future FSA update, the badge images will not load. This is handled gracefully: a fallback mechanism displays the numeric rating value as styled text if the image fails to load, satisfying **FR13**.

### Issue 2: Font Variable Mismatch

The CSS custom properties `--font-display` and `--font-body` are both set to `'Inter'` in `Style.css`. However, the Google Fonts stylesheet linked in all four HTML pages loads Fraunces and DM Sans, not Inter. Because Inter is not explicitly loaded, the browser falls back to `system-ui` and `-apple-system` for all text. The Fraunces and DM Sans imports are therefore unused at the CSS variable level. Visual consistency is maintained across all devices because system fonts are used, but type rendering differs from what was specified during the design phase.

### Issue 3: Unrated Businesses

A total of 600 records in the dataset have a `null` rating field. These records carry a `ratingStatus` of `AwaitingInspection`, `Exempt`, or `AwaitingPublication`. The application handles each status explicitly by displaying a clearly labelled status indicator and rendering the appropriate conditional notice panel on the Business Details page, rather than leaving a blank value visible to the user.

### Issue 4: Static Dataset

The dataset is a static snapshot embedded at development time and is not updated in real time. Inspection results published after the dataset export date are not reflected in the application. Users are informed of this limitation through a data attribution notice in the footer of every page.

---

## Testing

All testing was performed manually against version 1.0.0 on Google Chrome 124, served via the local static file server. Date of testing: 6 April 2026.

### Test Coverage Summary

| Metric | Value |
|---|---|
| Total test cases | 30 |
| Tests passed | 28 |
| Tests not applicable (N/A) | 2 |
| Tests failed | 0 |
| Functional requirements covered | 17 / 17 (100%) |
| Non-functional requirements covered | 8 / 10 (100% in scope) |
| Use cases covered | 2 / 2 (100%) |

The two N/A entries are NFR6 (99% availability, a hosting provider concern) and NFR9 (HTTPS, an SSL certificate deployment concern). Neither represents a failure; both are outside the scope of client-side application testing.

### Test Results

| TC ID | Test Name | Requirement(s) | Status |
|---|---|---|---|
| TC1 | Homepage Loads and Renders All Sections | FR1, NFR1, NFR2, NFR10 | Pass |
| TC2 | Search Bar Accepts Input and Navigates to Results | FR1, FR2, FR3, NFR1 | Pass |
| TC3 | Empty Search Input Validation | FR9, NFR8 | Pass |
| TC4 | No Results State Displayed Correctly | FR8 | Pass |
| TC5 | Filter Results by Hygiene Rating Score | FR5, FR7 | Pass |
| TC6 | Filter Results by Business Type | FR6, FR7 | Pass |
| TC7 | Combined Rating and Business Type Filters Applied Simultaneously | FR7 | Pass |
| TC8 | Remove an Individual Filter Using the Active Filter Chip | FR5, FR6, FR7 | Pass |
| TC9 | Category Tile on Homepage as Alternative Entry Point | FR6, NFR1 | Pass |
| TC10 | Rating Pill Links on Homepage Navigate to Filtered Results | FR5, NFR1 | Pass |
| TC11 | Business Details Page Displays All Required Fields | FR11, FR12, FR17, NFR1 | Pass |
| TC12 | Rating Graphic Fallback When Image Fails to Load | FR13 | Pass |
| TC13 | Awaiting Inspection Status Notice and Badge Replacement | FR4, FR14, FR16 | Pass |
| TC14 | New Rating Pending Notice Displayed Correctly | FR15 | Pass |
| TC15 | Exempt Status Notice Displayed Correctly | FR16 | Pass |
| TC16 | Rating Guide Page Contains Full Content | FR17 | Pass |
| TC17 | Rating Guide Accessible from Three Entry Points | FR17, NFR1 | Pass |
| TC18 | Back to Results Preserves Search Query and Filter State | UC2 Step 6 | Pass |
| TC19 | All Features Accessible Without Login or Registration | FR10 | Pass |
| TC20 | Responsive Layout at Mobile Viewport (390 px) | NFR2, US8 | Pass |
| TC21 | Responsive Layout at Tablet Viewport (768 px) | NFR2 | Pass |
| TC22 | Full Keyboard Navigation Without a Mouse | NFR3 | Pass |
| TC23 | Mobile Navigation ARIA State Management | NFR3 | Pass |
| TC24 | Colour Contrast: WCAG 2.1 Level AA Compliance | NFR3 | Pass |
| TC25 | Image Alternative Text Audit | NFR3 | Pass |
| TC26 | Graceful Error State When Data Initialisation Fails | NFR7 | Pass |
| TC27 | Input Sanitisation: XSS Attack Prevention | NFR8 | Pass |
| TC28 | Navigation Bar Functions Correctly on All Pages | NFR1, NFR10 | Pass |
| TC29 | Search Results Rendered Within Two Seconds | NFR4, NFR5 | Pass |
| TC30 | Statistics Bar Values Match Known Dataset Distribution | FR3, NFR10 | Pass |

### Code Quality

Both JavaScript modules were validated using **JSLint**:

| Module | JSLint Warnings | JSLint Reports |
|---|---|---|
| `Main.js` | 0 | 0 |
| `data.js` | 0 | 0 |

`Main.js` uses `const` and `let` within the IIFE scope and strict equality (`===`) throughout. `data.js` applies the `'use strict'` directive and uses `var` declarations in Section B for JSLint compatibility, with strict equality and string concatenation (no template literals) used throughout both modules.

### Testing Scope

**In scope:**
- All 17 functional requirements (FR1 to FR17)
- All relevant non-functional requirements (NFR1 to NFR10) within the scope of client-side testing
- All use case steps and documented variations and edge-case states
- Cross-browser rendering on Google Chrome (primary) and Mozilla Firefox (secondary)
- Responsive behaviour at mobile (390 px), tablet (768 px), and desktop (1440 px) viewport widths

**Out of scope:**
- Server-side load testing and concurrent user simulation (NFR5 and NFR6 are addressed by architectural argument given the static hosting model)
- HTTPS certificate configuration (NFR9 is a deployment concern)
- Automated unit testing frameworks; all testing is manual

---

## Version History

This application follows **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Version | Type | Description |
|---|---|---|
| `1.0.0` | Major release | First stable, fully functional public release of all planned features |

Future updates that add new functionality without breaking existing behaviour would increment the MINOR version (for example `1.1.0`). Bug fixes or small improvements to existing features would increment the PATCH version (for example `1.0.1`).

---

## Design Artefacts

All wireframes, wireflow diagrams, and high-fidelity mockups were produced in **Figma**. The complete artefact set can be accessed at the links below.

| Artefact | Link |
|---|---|
| Wireflow Diagram | [View on Figma](https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?node-id=2071-507&t=36W43D7d1QbB3XwJ-1) |
| Wireframe: All Pages | [View on Figma](https://www.figma.com/design/0V6qioQcKcWNtVy9fG22DS/WireFrame-finished---Desktop?node-id=0-1&t=rGD7ReVYtfm3j7XF-1) |
| High-Fidelity Mockup: All Pages | [View on Figma](https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?t=rGD7ReVYtfm3j7XF-1) |
| Component Diagram | [View on Figma](https://www.figma.com/board/dgB3ASTaaUlMJOzYjqT7Zp/Bristol-Food-Hygiene-Ratings-%E2%80%94-Component-Diagram?node-id=1-32&t=wxooYZ87ZipmGeC9-1) |

The design process followed these steps in order: requirements review, low-fidelity wireframes, wireflow connections, design system definition, high-fidelity mockups, and design validation against the requirements specification.

---

## Portfolio Documents

| Phase | Document |
|---|---|
| 1. Planning | [docs/planning.md](docs/01-planning.md) |
| 2. Requirements | [docs/requirements.md](docs/02-requirement.md) |
| 3. Design | [docs/design.md](docs/03-design.md) |
| 4. Implementation | [docs/implementation.md](docs/04-implementation.md) |
| 5. Testing | [docs/testing.md](docs/05-testing.md) |

---

## Data Attribution

Food hygiene ratings data is sourced from the **Open Bristol open data portal**, provided by Bristol City Council under the Open Government Licence v3.0.

Rating sticker graphics are provided by the **Food Standards Agency (FSA)** and are hosted on `ratings.food.gov.uk`. These graphics are the intellectual property of the Food Standards Agency and are reproduced in accordance with the FSA's published guidance on the use of the Food Hygiene Rating Scheme branding.

---

## Module Information

| Field | Detail |
|---|---|
| Module | UFCF9F-30-1 Information Systems Development |
| Author | Nadira Ali Robleh and Susu Mohammed|
| Version | 1.0.0 |
| Application | Bristol Food Hygiene Ratings Web Application |
| Date | 06 April 2026 |
