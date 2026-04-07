# Implementation

## Table of Contents

- [Introduction](#introduction)
  - [System Overview](#system-overview)
  - [Dataset Description](#dataset-description)
  - [Known Issues](#known-issues)
  - [Configuration Data](#configuration-data)
- [Project Structure](#project-structure)
  - [Folder and File Overview](#folder-and-file-overview)
  - [JSLint Warnings Summary](#jslint-warnings-summary)
- [Software Architecture](#software-architecture)
  - [Architectural Style](#architectural-style)
  - [Major Components](#major-components)
  - [Component Diagram](#component-diagram)
  - [Component Interaction](#component-interaction)
  - [Design Patterns and Principles Applied](#design-patterns-and-principles-applied)
- [Bristol Open Data API](#bristol-open-data-api)
  - [Data Source Overview](#data-source-overview)
  - [Query 1: Full Dataset Load](#query-1-full-dataset-load)
  - [Query 2: Text Search Filter](#query-2-text-search-filter)
  - [Query 3: Rating Filter](#query-3-rating-filter)
  - [Query 4: Business Type Filter](#query-4-business-type-filter)
  - [Query 5: Single Record Lookup by ID](#query-5-single-record-lookup-by-id)
  - [UML Class Diagram](#uml-class-diagram)
- [Implementation Notes: Semantic Versioning](#implementation-notes-semantic-versioning)
  - [What is Semantic Versioning?](#what-is-semantic-versioning)
  - [Version Summary](#version-summary)
  - [index.html](#indexhtml)
  - [Search.html](#searchhtml)
  - [Business-Detail.html](#business-detailhtml)
  - [Rating-Guide.html](#rating-guidehtml)
  - [Main.js](#mainjs)
  - [data.js](#datajs)
  - [Style.css](#stylecss)
- [Effective Styling: Screenshots and Explanations](#effective-styling-screenshots-and-explanations)
- [Evaluating and Improving Code Quality](#evaluating-and-improving-code-quality)
- [User Guide](#user-guide)
  - [UC1: Search and Filter Food Hygiene Ratings](#uc1-search-and-filter-food-hygiene-ratings)
  - [UC2: View Detailed Business Information and Understand Ratings](#uc2-view-detailed-business-information-and-understand-ratings)

---

## Introduction

### System Overview

The Bristol Food Hygiene Ratings web application is a client-side, multi-page web application (MPA) built entirely using HTML5, CSS3, and vanilla JavaScript. It provides members of the public with a simple, accessible, and mobile-responsive interface for searching, filtering, and viewing the official food hygiene ratings for food businesses across Bristol. The application loads data from a self-contained JavaScript data module (`data.js`) that embeds all business records directly — requiring no back-end server, no database, and no user authentication of any kind.

The application consists of four pages:

- **Homepage (`index.html`):** Provides the primary search interface, a Browse by Business Type category section, a statistics bar populated from live data, and a rating summary panel.
- **Search Results Page (`Search.html`):** Displays paginated, filterable lists of business cards with a sidebar filter panel for hygiene rating and business type.
- **Business Details Page (`Business-Detail.html`):** Presents the full inspection record for a selected business, including the official FSA rating graphic, a structured data table, the rating explanation panel, and conditional status notice panels.
- **Rating Guide Page (`Rating-Guide.html`):** Explains the meaning of every rating score (0 to 5) and every special status category in plain language.

The current release is version 1.0.0, following semantic versioning conventions structured as `MAJOR.MINOR.PATCH`. Version 1.0.0 represents the first stable, fully functional public release of all planned features. Future updates that add new functionality without breaking existing behaviour would increment the MINOR version (for example 1.1.0), whilst bug fixes or small improvements to existing features would increment the PATCH version (for example 1.0.1).

---

### Dataset Description

The dataset used by this application is the Bristol Food Hygiene Ratings dataset sourced from the Open Bristol open data portal. It is embedded directly into `data.js` as a static JavaScript array (`ALL_BUSINESSES`) and contains **3,867 records**, each representing a registered food business in the Bristol area. The records are available synchronously at page load without any network request, enabling the application to function correctly regardless of whether it is opened via HTTP or directly from the file system.

Each record in the dataset contains the following nine fields, mapped from the original FSA CSV export into a normalised JavaScript object structure:

| Field Name | Data Type | Description |
|---|---|---|
| `id` | String | Unique numeric identifier for each record |
| `name` | String | Trading name of the food business |
| `address` | String | Full street address including area and city |
| `postcode` | String | Postal code of the business premises |
| `businessType` | String | Raw FSA category string (14 distinct types in the dataset) |
| `rating` | Number / null | Hygiene rating score from 0 to 5; `null` if the business is unrated |
| `ratingStatus` | String | One of: `''` (rated), `'AwaitingInspection'`, `'AwaitingPublication'`, or `'Exempt'` |
| `newRatingPending` | Boolean | Whether a new rating is currently pending publication |
| `ratingDate` | String | ISO-format date string `'YYYY/MM/DD HH:MM:SS+00'`; empty string if not yet inspected |

The distribution of rating scores across all 3,867 records is as follows:

| Rating | Label | Count | Percentage |
|---|---|---|---|
| 5 | Very Good | 2,450 | 63.4% |
| 4 | Good | 561 | 14.5% |
| 3 | Generally Satisfactory | 185 | 4.8% |
| 2 | Improvement Necessary | 27 | 0.7% |
| 1 | Major Improvement Necessary | 36 | 0.9% |
| 0 | Urgent Improvement Required | 8 | 0.2% |
| null | Unrated (Awaiting / Exempt / Pending) | 600 | 15.5% |

Of the 600 unrated businesses, 440 are marked as `AwaitingInspection` meaning they have not yet received their first inspection, 158 are classified as `Exempt` from the rating scheme, and 2 records are marked as `AwaitingPublication` (inspected but not yet formally published).

The dataset includes 14 distinct business type categories: Restaurant/Cafe/Canteen, Takeaway/sandwich shop, Pub/bar/nightclub, Retailers - other, Retailers - supermarkets/hypermarkets, Hotel/bed & breakfast/guest house, School/college/university, Mobile caterer, Manufacturers/packers, Hospitals/Childcare/Caring Premises, Other catering premises, Distributors/Transporters, Farmers/growers, and Importers/Exporters.

---

### Known Issues

The following known issues exist in the current implementation.

#### Issue 1: External Rating Graphic URLs

The official FSA rating badge images referenced by each business record are hosted on an external domain (`ratings.food.gov.uk`). If this external domain is unavailable or the image URLs change in a future FSA website update, the badge images will not load. This is handled gracefully: a fallback mechanism displays the numeric rating value as styled text if the image fails to load, satisfying functional requirement FR13.

#### Issue 2: Font Variable Mismatch

The CSS custom properties `--font-display` and `--font-body` are both set to `'Inter'` in `Style.css`. However, the Google Fonts stylesheet linked in all four HTML pages loads Fraunces and DM Sans, not Inter. Because Inter is not explicitly loaded, the browser falls back to `system-ui` and `-apple-system` for all text. The Fraunces and DM Sans imports in the HTML are therefore unused at the CSS variable level. This is a known inconsistency: the visual design is consistent across all devices because system fonts are used, but the type rendering differs from what was specified during the design phase.

#### Issue 3: Unrated Businesses

A total of 600 records in the dataset have a `null` rating field. These records carry a `ratingStatus` of `AwaitingInspection`, `Exempt`, or `AwaitingPublication`. The application handles each of these three statuses explicitly by displaying a clearly labelled status indicator and rendering the appropriate conditional notice panel on the Business Details page, rather than leaving a blank or potentially confusing value visible to the user.

#### Issue 4: Static Dataset

The dataset is a static snapshot embedded at development time and is not updated in real time. Inspection results published after the date of the dataset export are not reflected in the application. Users are informed of this limitation through a data attribution notice in the footer of every page.

---

### Configuration Data

The application requires minimal configuration.

The `serve.json` file in the project root configures the static file server used during local development. It sets the root directory to the project folder, enables clean URL handling, and ensures that the correct MIME types are served for all file types used by the application. Although `data.js` no longer uses the Fetch API (data is embedded directly), `serve.json` remains useful for ensuring all assets are served correctly over HTTP during development and testing.

The `.vscode/launch.json` file configures the VS Code debugger to launch the local server automatically when the application is opened from within the editor.

No API keys, environment variables, build tools, package managers, or compilation steps are required to run the application. It is fully self-contained and can be deployed to any static hosting environment without modification.

---

## Project Structure

### Folder and File Overview

The project follows a deliberately flat, single-level structure with all source files located in the project root directory. There is one sub-directory (`assets/`) for static media files and one hidden configuration directory (`.vscode/`) for VS Code debugger configuration. This structure was chosen to minimise the complexity of relative path references between files and to reflect the scale of the application, which does not require a build pipeline or a module bundler.

```
BRISTOL-FOOD-HYGIENE-RATINGS/
│
├── .vscode/
│   └── launch.json
│
├── assets/
│   └── [icons and images]
│
├── index.html
├── Search.html
├── Business-Detail.html
├── Rating-Guide.html
├── Main.js
├── data.js
├── Style.css
└── serve.json
```

The role of each file is described in the table below:

| File / Folder | Type | Role and Responsibilities |
|---|---|---|
| `index.html` | HTML Page | The application homepage and primary entry point. Contains the hero search bar, the Browse by Business Type category tiles, a live statistics bar, and the rating summary section. |
| `Search.html` | HTML Page | The Search Results page. Renders the filter panel (Hygiene Rating and Business Type checkboxes), the paginated results list of business cards, and both the empty-state and error-state panels. Receives the search query and any pre-applied filters via URL query parameters. |
| `Business-Detail.html` | HTML Page | The Business Details page. Displays the full inspection record for a single selected business, including the official rating graphic, all dataset fields in a structured description list, the rating explanation panel, and the three conditional notice panels (New Rating Pending, Awaiting Inspection, and Exempt). |
| `Rating-Guide.html` | HTML Page | The Rating Guide page. Provides a comprehensive explanation of all six numeric hygiene rating scores and the three special status categories. Requires no JavaScript initialisation beyond the mobile navigation toggle. |
| `Main.js` | JavaScript Module | The shared navigation module. Handles the mobile navigation toggle across all pages: creates the backdrop scrim, opens and closes the nav panel with full ARIA state management, syncs the panel's top position to the live header height, and handles resize, orientation change, and media query change events. Wrapped in an IIFE to avoid polluting the global scope. |
| `data.js` | JavaScript Module | The data and application logic module. Embeds all 3,867 business records as the `ALL_BUSINESSES` array, then provides all configuration constants, lookup tables, utility functions, and three page initialisers (`initHomepage`, `initSearchPage`, `initDetailPage`). A `DOMContentLoaded` listener auto-detects the current page and routes to the correct initialiser. |
| `Style.css` | CSS Stylesheet | The global stylesheet shared across all four pages. Defines CSS custom property variables for the design system (colours, spacing, border radii, shadows), the twelve-column CSS grid layout, all responsive media query breakpoints (desktop, tablet, mobile), and the styles for every reusable component. Organised into 35 clearly labelled sections with a table of contents at the top. |
| `serve.json` | JSON Configuration | Static file server configuration used during local development to ensure all assets are served with the correct MIME types over HTTP. |
| `.vscode/launch.json` | JSON Configuration | VS Code debugger launch configuration. Defines the local server launch settings so the developer can start a live server instance directly from the editor. |
| `assets/` | Directory | Contains all static media assets, including the application logo and the illustration icons used in the Browse by Business Type category tiles on the homepage. |

---

### JSLint Warnings Summary

All JavaScript modules were validated using JSLint to assess code quality and identify any potential issues. The table below records the number of warnings and reports generated for each module.

| Module File | Type | JSLint Warnings | JSLint Reports | Notes |
|---|---|---|---|---|
| `Main.js` | JavaScript | 0 | 0 | Wrapped in an IIFE. Uses `const` and `let` within the IIFE scope. Strict equality (`===`) used throughout. All DOM queries guarded so the script is safe on pages where elements do not exist. |
| `data.js` | JavaScript | 0 | 0 | `'use strict'` directive applied at the top of Section B. Section A uses `const` for the embedded array. Section B uses `var` declarations throughout for configuration, lookup tables, and all functions, ensuring compatibility with JSLint's strictest variable rules. |

Achieving zero warnings across both modules required several deliberate decisions. In `data.js`, all mutable configuration constants, lookup tables, utility functions, and page initialisers in Section B are declared with `var` rather than `const` or `let`. This is consistent with JSLint's strictest configuration, which in some environments flags block-scoped declarations in scripts not processed by a module bundler. The `const ALL_BUSINESSES` declaration in Section A is a single top-level array assignment, which JSLint accepts because it is the first and only statement before the strict-mode section begins. In `Main.js`, `const` and `let` are used inside the IIFE scope, which JSLint accepts because they are scoped to the function rather than the top-level window object. All comparisons in both modules use `===` (strict equality), and all template string operations are performed via concatenation to remain within JSLint's accepted syntax set.

---

## Software Architecture

### Architectural Style

The application follows a client-side, multi-page application (MPA) architectural style. All processing, data access, filtering, and rendering is performed entirely in the user's browser using JavaScript. No server-side rendering, back-end API, or database is involved. This approach was chosen because the dataset is small enough to be held entirely in browser memory at startup, and because a purely static architecture aligns with the open-data context of the project: the application can be deployed to any static hosting environment with no server-side infrastructure required.

Within this client-side architecture, the application applies a strict separation of concerns by dividing responsibilities across two distinct JavaScript modules. The data and logic layer (`data.js`) handles all data access, query logic, rendering, and page initialisation in isolation. The shared presentation layer (`Main.js`) handles mobile navigation behaviour and is entirely independent of the data layer. This means that any future change to the data format or query logic would require changes only to `data.js` and would leave `Main.js` entirely untouched.

Navigation between the four pages is handled through standard HTML hyperlinks. Page-to-page state, such as the selected business's `id`, the current search term, and any active filters, is passed via URL query parameters. This ensures that users can bookmark or share a specific search result or business detail page, and that the Back button always returns to a meaningful state.

---

### Major Components

The application is composed of five major components, each with a clearly defined and separate responsibility.

#### 1. Data and Logic Component (`data.js`)

This component forms the data and application logic layer. It is structured in two sections. Section A contains the `ALL_BUSINESSES` array — all 3,867 embedded business records. Section B contains all configuration constants, lookup tables (rating labels, business type mappings, display labels, month names), utility functions, and three page initialisers: `initHomepage()`, `initSearchPage()`, and `initDetailPage()`. A `DOMContentLoaded` event listener at the end of the file calls `detectPage()` to identify the current page by filename and routes to the correct initialiser automatically. No external call is required from any other script.

#### 2. Navigation Component (`Main.js`)

This is the shared navigation module loaded on every page. It is wrapped in an immediately invoked function expression (IIFE) to avoid polluting the global scope. It handles all mobile navigation toggle behaviour: it ensures a single backdrop element exists in the DOM, manages the open and closed states of the navigation panel with full ARIA attribute updates, syncs the panel's top position to the live header height using a CSS custom property (`--nav-top`), and handles all close triggers including Escape key, backdrop click, nav link click, outside click, resize, orientation change, and media query change events.

#### 3. View Layer (HTML Pages)

The four HTML pages form the view layer of the application. Each page provides the structural HTML skeleton, including the shared navigation bar, the page-specific content containers, and the shared footer. The pages contain no inline JavaScript logic. All behaviour is injected by `Main.js` and `data.js`, which are linked via `<script>` tags at the end of each page's `<body>`. This clean separation between structure (HTML) and behaviour (JavaScript) satisfies NFR10 and makes the codebase significantly easier to maintain and extend.

#### 4. Style Layer (`Style.css`)

A single shared stylesheet serves all four pages. It defines CSS custom properties (variables) for every design system token — the primary green colour palette, rating badge colours, status badge colours, spacing increments, border radii, card shadow values, and transition durations. It implements the twelve-column CSS grid layout used across all pages and defines three responsive breakpoints using CSS `@media` queries: desktop (1024px and above), tablet (768px to 1023px), and mobile (below 768px). The stylesheet is organised into 35 labelled sections. Using a single shared stylesheet ensures complete visual consistency and means any design system change needs to be made in only one place.

#### 5. Configuration Layer (`serve.json` and `launch.json`)

The configuration layer consists of two JSON files that configure the local development environment. `serve.json` ensures the application is served correctly over HTTP during development. `launch.json` configures VS Code to launch the local server automatically. Neither file contains any application logic and neither is deployed to production.

---

### Component Diagram

- [ ] <img width="1470" height="487" alt="Screenshot 2026-03-25 at 00 24 34" src="https://github.com/user-attachments/assets/381b8237-1e0c-4e0d-8d6e-4385a497f984" />
- [ ] Here is a link aswell: https://www.figma.com/board/dgB3ASTaaUlMJOzYjqT7Zp/Bristol-Food-Hygiene-Ratings-%E2%80%94-Component-Diagram?node-id=1-32&t=wxooYZ87ZipmGeC9-1

The diagram above illustrates the five major components and how they relate to one another at runtime. The HTML pages sit at the top of the hierarchy as the view layer. Each page loads `data.js` and `Main.js` via `<script>` tags at the end of the `<body>`. When the HTML document finishes parsing, `data.js` fires its `DOMContentLoaded` listener, calls `detectPage()` to identify the current page, and routes to the appropriate initialiser (`initHomepage`, `initSearchPage`, or `initDetailPage`). Each initialiser reads from `ALL_BUSINESSES` and writes rendered HTML directly into the DOM containers provided by the page. `Style.css` is linked by all four pages and applies presentation rules to every element, both the static HTML structure and the dynamically generated content from `data.js`. `Main.js` runs its IIFE in parallel after parsing, initialising the mobile navigation independently of the data layer. The configuration layer (`serve.json` and `launch.json`) sits entirely outside the runtime flow and is used only during local development.

---

### Component Interaction

The runtime data flow operates as follows. When a user loads a page, the browser parses the HTML file and executes the linked scripts in source order. `data.js` is listed before `Main.js` in the script order on every page, ensuring the `ALL_BUSINESSES` array and all utility functions are available before the initialisers run. On the Search Results page, `initSearchPage()` reads the URL query parameters for the search term, active rating filters, active type filters, the current page number, and the sort preference. It then applies those parameters to `ALL_BUSINESSES`, renders matching records as HTML result cards into the results list container, updates the filter panel with per-option result counts, and renders any active filter chips into the results toolbar. Filter checkbox interactions trigger event listeners that re-apply the filter and render logic without performing a full page reload.

When the user selects a result card, `data.js` appends the business's `id` value to the URL and navigates to `Business-Detail.html`. On that page, `initDetailPage()` reads the `?id=` parameter, locates the corresponding record in `ALL_BUSINESSES` using `Array.prototype.find()`, and populates the page with the full business record including all status notices and the rating explanation panel.

---

### Design Patterns and Principles Applied

| Pattern / Principle | Where Applied | Benefit |
|---|---|---|
| Separation of Concerns | `data.js` (data and logic layer) vs `Main.js` (navigation layer) vs HTML (structure) vs CSS (style) | Each concern can be modified independently without affecting the others |
| Single Responsibility | `data.js` handles all data and rendering. `Main.js` handles mobile navigation only. | Keeps each module focused, readable, and easy to test in isolation |
| URL as State | Search term, active filters, page number, sort preference, and business `id` passed via URL query parameters | Allows users to bookmark or share a specific search or business detail URL; Back button always restores a meaningful state |
| Progressive Enhancement | Rating badge falls back to numeric text if the external FSA graphic URL fails to load | Ensures the application remains fully usable even when external resources are unavailable |
| Responsive Design | CSS media queries in `Style.css` adapt the layout for desktop, tablet, and mobile viewports | Satisfies NFR2 and ensures the application is accessible across all device types |
| DRY (Don't Repeat Yourself) | Shared navigation bar, footer, stylesheet, and reusable component styles defined once across all four pages | Reduces duplication and ensures any change to a shared element propagates to every page automatically |
| Event Delegation | Single listener on the `.active-filters` container handles all chip removal clicks | Prevents duplicate listeners accumulating when chips are re-rendered; requires no JS changes when new chips are added |
| Debouncing | `debounce()` utility applied to the live search input on the search page | Prevents filtering logic firing on every keystroke; protects performance when the user types quickly |
| Input Whitelisting | `VALID_SORTS` array rejects arbitrary sort values from URL parameters or `sessionStorage` | Prevents tampered URLs from introducing unexpected sort behaviour |

---

## Bristol Open Data API

### Data Source Overview

The Bristol Food Hygiene Ratings application sources its data from the Open Bristol open data portal, which publishes the Food Hygiene Ratings dataset as a publicly accessible CSV file. Rather than issuing live HTTP requests to the portal at runtime, the application pre-processes the CSV into a structured JavaScript array (`ALL_BUSINESSES`) and embeds it directly in `data.js`. All search, filter, sort, and lookup operations are then performed in memory without any further network requests.

This architectural decision was made deliberately. Loading the entire dataset once at module parse time and filtering it in memory is significantly more efficient for this use case than issuing a separate HTTP request for every search or filter interaction. The dataset contains 3,867 records, which is well within the memory capacity of any modern browser. Embedding the data also removes the CORS restriction that prevents the Fetch API from working when the page is opened directly via the `file://` protocol, meaning the application functions correctly in all environments without requiring a running server.

The following five queries document the client-side operations that replace what would otherwise be separate API calls in a server-connected architecture.

---

### Query 1: Full Dataset Load

**Purpose:** Make all 3,867 food hygiene rating records available to the application at startup.

**Triggered by:** Module parse time — the `ALL_BUSINESSES` constant is evaluated synchronously when `data.js` is executed by the browser, before any `DOMContentLoaded` event fires.

**Implementation (`data.js`, Section A):**

```javascript
const ALL_BUSINESSES = [
  { id: '1', name: '& Cafe', address: '10-12 Gloucester Road, Bishopston, Bristol BS7 8AE',
    postcode: 'BS7 8AE', businessType: 'Restaurant/Cafe/Canteen',
    rating: 5, ratingStatus: '', newRatingPending: false,
    ratingDate: '2026/02/19 00:00:00+00' },
  /* … 3,866 further records … */
];
```

**Data available:** All 3,867 records, each containing the nine fields documented in the Dataset Description section: `id`, `name`, `address`, `postcode`, `businessType`, `rating`, `ratingStatus`, `newRatingPending`, and `ratingDate`.

**Error handling:** Because the data is embedded rather than fetched, there is no network failure path for this operation. The error state panel on the Search Results page is reserved for cases where `initSearchPage()` encounters an unexpected runtime error, at which point it catches the exception and renders a user-friendly message with a Retry button, satisfying NFR7.

---

### Query 2: Text Search Filter (Client-Side)

**Purpose:** Filter the in-memory dataset to return only the records whose `name`, `address`, `postcode`, or rating label fields contain all words in the user's search term.

**Triggered by:** The user submitting a search query via the search bar on `index.html` or `Search.html`.

**Implementation (`data.js`, `matchesBusiness()`):**

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

**Data returned:** A filtered subset of `ALL_BUSINESSES` containing only records where every word in the normalised query string appears somewhere across the combined search target. The search is case-insensitive and applies AND logic between multiple words.

**Example:** A query of `"clifton restaurant"` returns only records whose combined name, address, postcode, and rating label contain both `"clifton"` and `"restaurant"` independently, in any order.

**Postcode normalisation:** Both the search query and the record's postcode are stripped of whitespace before comparison, so `"BS11AA"` and `"BS1 1AA"` are treated as identical.

---

### Query 3: Rating Filter (Client-Side)

**Purpose:** Further filter the dataset (or the search results subset) to return only records whose `rating` field matches one or more of the user's selected rating values.

**Triggered by:** The user selecting or deselecting a Hygiene Rating checkbox in the filter panel on `Search.html`.

**Implementation (`data.js`, `applyFilters()`):**

```javascript
function applyFilters(results, params) {
  if (params.ratings.length) {
    results = results.filter(function (biz) {
      return params.ratings.indexOf(biz.rating) !== -1;
    });
  }
  /* … type filter applied next … */
  return results;
}
```

**Data returned:** A filtered subset containing only records whose `rating` value (a number 0–5, or `null`) is present in the selected ratings array. If no ratings are selected, the full unfiltered set is returned unchanged.

---

### Query 4: Business Type Filter (Client-Side)

**Purpose:** Further filter the dataset to return only records whose `businessType` field maps to one or more of the user's selected business type filter keys.

**Triggered by:** The user selecting or deselecting a Business Type checkbox in the filter panel on `Search.html`.

**Implementation (`data.js`, `applyFilters()` and `CSV_TYPE_TO_FILTER`):**

```javascript
var CSV_TYPE_TO_FILTER = {
  'Restaurant/Cafe/Canteen'           : 'restaurant',
  'Takeaway/sandwich shop'            : 'takeaway',
  'Pub/bar/nightclub'                 : 'pub-bar',
  'School/college/university'         : 'school',
  'Hotel/bed & breakfast/guest house' : 'hotel'
};

/* In applyFilters(): */
if (params.types.length) {
  results = results.filter(function (biz) {
    var key = CSV_TYPE_TO_FILTER[biz.businessType] || 'other';
    return params.types.indexOf(key) !== -1;
  });
}
```

**Data returned:** A filtered subset containing only records whose business type maps to at least one of the selected filter keys. Business types not explicitly mapped in `CSV_TYPE_TO_FILTER` fall through to the key `'other'`.

---

### Query 5: Single Record Lookup by ID (Client-Side)

**Purpose:** Retrieve the full data record for a single specific business to populate the Business Details page.

**Triggered by:** The user clicking a result card on `Search.html`, which navigates to `Business-Detail.html?id=[id]`. On page load, `initDetailPage()` reads the `id` parameter and performs the lookup.

**Implementation (`data.js`, `initDetailPage()`):**

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

**Data returned:** A single JavaScript object representing the complete record for the selected business. If no matching record is found (for example, if the URL parameter has been manually altered to an invalid value), `showBusinessSelector()` is called, which renders a demo-mode notice and a sample entry rather than throwing an unhandled error.

---

### UML Class Diagram

- [ ] <img width="1121" height="363" alt="Screenshot 2026-03-25 at 10 55 12" src="https://github.com/user-attachments/assets/a7b666b1-047c-43d6-b385-cb4cf314fb16" />

The UML class diagram above represents the structure of the JavaScript objects used throughout the application. The `DataModule` class encapsulates the embedded dataset (`ALL_BUSINESSES`) and all query and rendering logic, exposing three public page initialisers. The `NavigationModule` class (represented by `Main.js`) operates independently, with no dependency on `DataModule`. Each `FoodBusinessRecord` object conforms to the nine-field structure documented in the Dataset Description section.

---

## Implementation Notes: Semantic Versioning

### What is Semantic Versioning?

Semantic versioning (SemVer) is a widely adopted software release convention where every version number follows the format `MAJOR.MINOR.PATCH`. Each segment carries a precise and universally understood meaning:

- **MAJOR** is incremented when a change breaks backwards compatibility with the previous release. Existing code relying on the previous version would stop working correctly.
- **MINOR** is incremented when new functionality is added in a backwards-compatible way. Existing code continues to work, but new features are available. The PATCH number resets to zero.
- **PATCH** is incremented for backwards-compatible bug fixes only. No new behaviour is introduced and no existing behaviour is removed.

All seven source files in this project follow this convention. Every file header contains a `Version:` field, and every increment is justified by the specific changes made between versions. This makes it straightforward to understand the history of each file, trace the origin of any bug or feature, and communicate changes clearly to anyone reading the codebase.

---

### Version Summary

| File | Type | Current Version | Last Updated |
|---|---|---|---|
| `index.html` | HTML Page | 2.0.0 | 22/03/2026 |
| `Search.html` | HTML Page | 2.0.1 | 24/03/2026 |
| `Business-Detail.html` | HTML Page | 2.0.0 | 22/03/2026 |
| `Rating-Guide.html` | HTML Page | 2.0.4 | 31/03/2026 |
| `Main.js` | JavaScript | 1.3.0 | 03/04/2026 |
| `data.js` | JavaScript | 3.1.0 | 24/03/2026 |
| `Style.css` | CSS Stylesheet | 3.2.0 | 24/03/2026 |

---

### `index.html` — Version 2.0.0

**Role:** The application homepage. Houses the hero search bar, the Browse by Business Type category tiles, the live statistics bar, the rating summary section, and the shared site header and footer.

#### v1.0.0 — Initial release

The first stable release used a structure built almost entirely from generic elements throughout. The mobile navigation was managed by a minimal inline script block added directly to the page, and no ARIA attributes were present on any interactive elements. The page was functional but did not yet meet the accessibility requirements defined in NFR3, as colour was the sole means of conveying rating information and no skip link or keyboard support was in place.

#### v2.0.0 — Complete semantic HTML rewrite (MAJOR)

Version 2.0.0 is a ground-up rewrite of the entire page structure. Every non-semantic element was removed and replaced with a semantically correct HTML5 element. This is classified as a MAJOR increment because the changes were structural and pervasive: class names, element nesting, and the document outline all changed in ways that broke compatibility with the version 1 stylesheet. Key changes included:

- All layout landmarks replaced with `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, and `<article>` elements, each carrying the correct implicit or explicit ARIA role.
- The unordered category list converted to a `<ul>` and the ordered rating pills converted to an `<ol>`, reflecting the meaningful ascending scale of 0 to 5.
- Dataset summary figures restructured as a `<dl>` (description list) with `<dt>` and `<dd>` pairs, which is semantically correct for labelled value pairs.
- Business category icons wrapped in `<figure>` and `<figcaption>` rather than bare `<span>` elements.
- `<hgroup>` introduced to group the `<h1>` with its subtitle, preventing the subtitle from appearing as a separate entry in the document outline.
- `<mark>` used to highlight "Bristol" within the heading, `<abbr>` applied to abbreviations, `<time>` used for machine-readable date values, and `<address>` used for the footer contact block.
- `<small>` applied to all copyright and fine-print text in the footer.
- The hero validation hint changed from a generic paragraph with `role="alert"` to the semantically correct `<output>` element, which is the proper HTML element for a value that results from a user action.
- ARIA attributes added throughout: `aria-label` and `aria-labelledby` on all landmarks and sections, `aria-current="page"` on the active navigation link, `aria-hidden="true"` on all decorative images and icons, and `aria-expanded` and `aria-controls` on the mobile navigation toggle.
- A skip link added to allow keyboard and screen reader users to bypass the repeated navigation bar.
- `lang="en-GB"` set on the `<html>` element, Open Graph meta tags added (`og:type`, `og:title`, `og:description`, `og:locale`), and `<meta name="robots" content="index, follow">` included for search engine discoverability.

The magnitude of these changes, and the fact that the version 1 stylesheet would not function correctly against the new element structure, justifies incrementing the MAJOR version.

---

### `Search.html` — Version 2.0.1

**Role:** The search results page. Renders the sidebar filter panel (hygiene rating and business type checkboxes), the paginated list of result cards, and the empty-state and error-state panels. Receives the active search query and any pre-applied filters via URL query parameters.

#### v1.0.0 — Initial release

The first working version rendered results into a generic container. The filter panel was a flat list of checkboxes with no grouping, and no ARIA attributes were present. The no-results and error banners existed in the HTML but their display logic contained a regression bug introduced in a later styling pass.

#### v2.0.0 — Semantic HTML rewrite (MAJOR)

The entire page structure was replaced to match the approach applied to the other three pages. All non-semantic containers were substituted for semantically appropriate elements: the results list container became a `<ul>` populated with `<li>` elements by `data.js`, the filter form was wrapped in a `<form>` with appropriate `<fieldset>` and `<legend>` groupings, and the layout landmarks were restructured consistently with the rest of the application. ARIA live regions were added to the results container so that screen readers announce the result count after each filter interaction without a full page reload. All changes required corresponding updates to `Style.css` and `data.js`, making this a MAJOR increment.

#### v2.0.1 — Bug fix: no-results and error banner display (PATCH)

A layout regression introduced during the version 3.2.0 visual polish pass on `Style.css` caused the no-results state panel and the error banner to render alongside the results list simultaneously rather than replacing it. The CSS rules for `.no-results` and `.error-banner` had lost their `display: none` defaults. This is a PATCH increment: no new functionality was introduced and no structural changes were made. The fix restores the correct behaviour required by FR8 and NFR7.

---

### `Business-Detail.html` — Version 2.0.0

**Role:** The business details page. Displays the complete inspection record for a single selected business, including the official FSA rating badge, all dataset fields in a structured description list, the rating explanation panel, and the three conditional notice panels (New Rating Pending, Awaiting Inspection, and Exempt).

#### v1.0.0 — Initial release

The initial version established the two-column layout: the left column housing the business card and detail list, and the right column housing the rating graphic and explanation panel. The conditional notice panels were hidden elements toggled by `data.js` at runtime. Interactive elements lacked ARIA attributes throughout.

#### v2.0.0 — Semantic HTML rewrite (MAJOR)

A complete structural rewrite consistent with the approach applied across the application. The business information card became an `<article>` element, which is appropriate because it is a self-contained unit of independently meaningful content. The structured data display was converted from an HTML `<table>` to a `<dl>` with `<dt>` labels and `<dd>` values, which is semantically correct for name-value pairs and provides a better reading experience for screen reader users. Each conditional notice panel received appropriate `role` attributes and colour-coded visual treatments matching its semantic meaning. The official FSA rating image received a descriptive `alt` attribute and a programmatic fallback mechanism tied to the `onerror` event, satisfying FR13. The structural incompatibility between version 1 and version 2 makes this a MAJOR increment.

---

### `Rating-Guide.html` — Version 2.0.4

**Role:** The rating guide page. Provides a comprehensive plain-language explanation of all six numeric hygiene rating scores and the three special status categories, satisfying FR17.

#### v1.0.0 — Initial release

The first version rendered the six rating levels as a simple unstyled list with short text descriptions alongside each score. The special statuses section was a short paragraph block at the bottom of the page with no visual hierarchy or colour coding applied.

#### v2.0.0 — Semantic HTML rewrite and structured rating cards (MAJOR)

The page was completely restructured. The six rating levels were converted to an `<ol>` (ordered list), which correctly conveys that the items exist on a meaningful ascending numerical scale. Each rating entry became an `<article>` element with a colour-coded badge `<span>`, a heading, a description, and a nested "What This Means" sub-panel. The special statuses section was restructured as a `<section>` with three `<article>` cards. A green hero banner was added at the top of the page. An in-page table of contents was added using `<nav>` with anchor links to each rating section, improving keyboard navigation through the long-scrolling page. ARIA labels were applied to all landmarks. The visual complexity of these additions and the breaking change relative to the version 1 stylesheet warranted a MAJOR increment.

#### v2.0.1 — Documentation comments updated (PATCH)

The inline HTML comment block at the top of the file, which documents the semantic element decisions for each section of the page, was updated to accurately reflect the final state of version 2.0.0. Several annotations still described elements that had been replaced during the rewrite. This is a PATCH increment: only documentation comments changed, with no rendered output, behaviour, or structure modified.

#### v2.0.2 to v2.0.4 — Iterative accessibility and metadata improvements (PATCH)

Subsequent PATCH releases addressed minor accessibility corrections (improving `aria-labelledby` targets, correcting heading hierarchy within rating cards) and updated the Open Graph meta description to more accurately reflect the page content. No structural or behavioural changes were made in any of these releases.

---

### `Main.js` — Version 1.3.0

**Role:** The shared navigation module loaded on every page. Wrapped in an IIFE to avoid polluting the global scope. Handles the mobile navigation toggle exclusively: creates the backdrop scrim, manages open/closed state with full ARIA management, syncs the nav panel top position to the live header height via the `--nav-top` CSS custom property, and handles all close triggers (Escape key, backdrop click, nav link click, outside click, resize, orientation change, and media query change). Uses `const` and `let` throughout the IIFE, with all DOM queries guarded so the script exits cleanly on any page where the required elements are absent.

#### v1.0.0 — Initial release

The first release handled the mobile navigation toggle using a simpler event model with no backdrop element, no `--nav-top` CSS custom property synchronisation, and no media query change listener. The close behaviour was limited to the Escape key and the hamburger button itself.

#### v1.1.0 — Backdrop and header height sync added (MINOR)

A backdrop scrim element was introduced and inserted into the DOM programmatically. The `updateNavTop()` function was added to read the live header height and write it to `--nav-top` on `<html>`, ensuring the navigation panel always slides out from directly beneath the header regardless of header height changes. Closing the nav by clicking the backdrop was also added in this version. New functionality added without breaking the existing toggle behaviour makes this a MINOR increment.

#### v1.2.0 — Full close-trigger coverage and resize handling (MINOR)

The outside-click handler, the media query change listener, the orientation change listener, and the nav link click handler (using event delegation on the `<nav>` element) were all added. The `isMobile()` helper was introduced to centralise the breakpoint check. The `closeNav(focusToggle)` parameter was added so that keyboard-triggered closes (Escape key, backdrop click) return focus to the toggle button, satisfying WCAG 2.1 keyboard accessibility requirements. New behaviours added without breaking existing code makes this a MINOR increment.

#### v1.3.0 — Safe backdrop singleton and finalised ARIA labels (MINOR)

The backdrop creation logic was made safe against duplicate insertion: the script now checks for an existing `.nav-backdrop` element in the DOM before creating one, preventing a second backdrop appearing if the script is executed more than once (for example, during hot-reload in development). The ARIA label cycle was finalised: the toggle button's `aria-label` is updated to `"Close navigation menu"` when open and restored to `"Open navigation menu"` when closed, ensuring screen reader users always hear the correct action. The `handleResize()` function was also called once on initialisation to set the correct `--nav-top` value before the user interacts with the page. These additions extend functionality without breaking the v1.2.0 behaviour, making this a MINOR increment.

---

### `data.js` — Version 3.1.0

**Role:** The data and application logic module. Section A embeds all 3,867 business records as `ALL_BUSINESSES`. Section B provides all configuration constants, lookup tables, utility functions, and three page initialisers (`initHomepage`, `initSearchPage`, `initDetailPage`). A `DOMContentLoaded` listener at the end of the file detects the current page and routes to the correct initialiser. Exposes no global API — all coordination is achieved through direct DOM manipulation and URL query parameters.

#### v1.0.0 — CSV-based Fetch implementation

The original version loaded the dataset using the browser Fetch API against a local `Food_Hygiene_Ratings.csv` file. It parsed the raw CSV by stripping the UTF-8 BOM, splitting into rows, extracting column headers from the first row, and mapping each subsequent row into a named JavaScript object. This approach required the application to be served via a local HTTP server due to CORS restrictions on the `file://` protocol.

#### v2.0.0 — Search, filter, rendering, and pagination consolidated (MAJOR)

The filtering, result rendering, and pagination logic previously split across multiple files was consolidated entirely inside `data.js`. The `initSearchPage()`, `initHomepage()`, and `initDetailPage()` initialisers were introduced, and the `DOMContentLoaded` listener with `detectPage()` routing replaced the previous direct function call pattern. This is a MAJOR increment because the coordination model changed: other files could no longer call the previous standalone filter functions directly.

#### v3.0.0 — All records embedded; server dependency removed (MAJOR)

The Fetch-based CSV loading was replaced with the directly embedded `ALL_BUSINESSES` array containing all 3,867 records. This removed the CORS issue entirely, meaning the application could be opened by double-clicking the HTML file without requiring a running server. Because this changed the fundamental mechanism by which data reached the application and removed the `loadData()` Fetch function that had previously been the module's primary interface, this is a MAJOR increment. Additional features introduced in this version included:

- `escapeHTML()` applied to every piece of data injected into the DOM, satisfying NFR8.
- Homepage statistics bar populated from the live embedded dataset.
- Multi-word AND search, where every word in the query must independently match a record.
- Postcode normalisation so that `"BS11AA"` matches `"BS1 1AA"`.
- Search term highlighting in result card names.
- `sessionStorage` persistence so the Back button restores the exact search state.
- Dynamic page `<title>` updates with the current query and result count.
- Filter counts scoped to the active text query, with zero-count options visually dimmed.
- Sort preference remembered across navigations.

#### v3.1.0 — Robustness, accessibility, and sort improvements (MINOR)

Built on the stable v3.0.0 base without changing the public coordination model, making this a MINOR increment. Additions included:

- `debounce()` utility to prevent the filter logic firing on every individual keystroke during rapid input.
- `VALID_SORTS` whitelist rejecting arbitrary or tampered sort values from the URL or `sessionStorage`.
- `date-asc` sort option for displaying oldest inspections first, with unrated businesses placed at the end.
- Secondary sort by name to resolve ties within the same rating or date bracket alphabetically.
- Upgraded `highlightName()` that highlights all search tokens and all occurrences within a name, not just the first match.
- `matchesBusiness()` extended to search rating labels so a query of `"very good"` returns businesses rated 5.
- Richer `aria-label` on result cards, announcing both the rating and business type in a single screen reader announcement.
- `announceToScreenReader()` using an ARIA live region to announce result counts after each search or filter interaction.
- `scrollToResultsIfPaged()` to automatically scroll the results panel into view on page 2 and beyond.
- Clear-search button wired up to remove the query whilst preserving active filters.
- `updateHomepageStats()` extended with an optional "Total businesses" statistic item.

---

### `Style.css` — Version 3.2.0

**Role:** The single shared stylesheet applied to all four pages. Defines the CSS custom property design tokens, the twelve-column CSS grid layout, all three responsive breakpoints, and styles for every component across the application. The stylesheet is organised into 35 clearly labelled sections with a table of contents at the top.

#### v1.0.0 — Initial stylesheet

The first version established the CSS custom property palette and base reset. Typography used system fonts, the layout was a simple two-column flex arrangement, and no responsive breakpoints had been implemented. The stylesheet was functional for desktop-width viewports only.

#### v2.0.0 — Design system overhaul and responsive grid (MAJOR)

A full twelve-column CSS Grid system replaced the flex-based layout. Three responsive breakpoints were added using `@media` queries: desktop (1024px and above), tablet (768px to 1023px), and mobile (below 768px). The custom property set expanded substantially to cover a complete green tonal scale, rating badge colours, status badge colour sets, spacing increments, border radii, shadow values, transition durations, and semantic colour aliases. The component set grew to cover the filter panel, active filter chips, pagination controls, the business detail two-column layout, the description list, and the conditional notice panels. New class names, restructured selectors, and a fundamentally different layout model made this a MAJOR increment.

#### v3.0.0 — Semantic HTML alignment (MAJOR)

When the four HTML pages were rewritten in their version 2.0.0 releases, CSS selectors targeting generic elements by class had to be updated throughout to target the new semantic elements. For example, result card selectors were updated from generic containers to `article` elements, and description list selectors were rewritten for `dl`, `dt`, and `dd`. Because the stylesheet would not render correctly against the version 1 HTML structure, this is a MAJOR increment. Additional spacing refinements, colour adjustments for rating badges, and initial support for the rating guide hero banner were also included.

#### v3.1.0 — Rating guide page styles added (MINOR)

A complete new set of styles was added for the rating guide page: the hero banner with the green background, the introductory panel, the in-page table of contents navigation, the rating card layout with colour-coded left-border accents, the "What This Means" sub-panels, and the special statuses section. Entirely new components with no impact on existing selectors makes this a MINOR increment.

#### v3.2.0 — Visual polish pass (MINOR)

The final pre-submission pass refined existing components without introducing any new ones, making it a MINOR increment. Changes included:

- Tighter card hover and focus shadow transitions with a reduced transition duration for a snappier feel.
- Refined typography scaling for the hero heading on mobile viewports.
- Improved padding consistency across the filter panel checkboxes and active filter chips.
- Corrected `display: none` defaults on `.no-results` and `.error-banner` panels, directly resolving the `Search.html` v2.0.1 regression.
- Refined colour for rating badge text at levels 3 and 4 to meet the WCAG 2.1 Level AA contrast ratio of 4.5:1.
- Updated spacing for the business detail notice panels so they sit cleanly below the two-column layout across all three viewport sizes.

---

## Effective Styling: Screenshots and Explanations

### Homepage Hero Section

<img width="1470" height="841" alt="Screenshot 2026-04-06 at 18 10 48" src="https://github.com/user-attachments/assets/0364415b-c7ab-48df-bbe5-7638466079d0" />


The homepage opens with a full-width green hero section containing the primary search bar. The deep green colour (`#1b5e20`) was chosen deliberately because green is the universally recognised colour for food hygiene safety in the United Kingdom, matching the official Food Standards Agency rating sticker scheme used on physical food premises. This creates an immediate visual association between the application and the familiar badges found on the doors and windows of restaurants and takeaways.

The `<hgroup>` element groups the primary heading with its subtitle so they are treated as a single unit in the document outline. The `<mark>` element around "Bristol" renders in a lighter green tint (`#66bb6a`) drawn from the `--green-300` design token, drawing the eye to the geographical context without disrupting the heading's visual flow. The search input and button are sized generously using the spacing scale to ensure comfortable touch targets on mobile devices, satisfying NFR2.

Below the hero, a statistics bar shows the total number of rated businesses and the number awaiting inspection, populated in real time from the embedded dataset by `updateHomepageStats()` in `data.js`. These figures give users an immediate sense of dataset scale and reinforce transparency, which is a key business benefit identified in the project's business case.

---

### Colour-Coded Rating Badge System

<img width="1470" height="841" alt="Screenshot 2026-04-06 at 18 13 03" src="https://github.com/user-attachments/assets/560a4d2c-d3cb-4ef5-81b8-8736ad18c5d8" />
<img width="1470" height="841" alt="Screenshot 2026-04-06 at 18 13 12" src="https://github.com/user-attachments/assets/62b1eab5-7066-4f42-96ec-91c5e533b9b0" />

<img width="367" height="799" alt="Screenshot 2026-04-06 at 18 13 29" src="https://github.com/user-attachments/assets/e75642b1-651a-4dcc-b337-01464908a303" />
<img width="367" height="170" alt="Screenshot 2026-04-06 at 18 13 41" src="https://github.com/user-attachments/assets/5d4c89ad-628c-468e-be04-8f416f6a442d" />



One of the most deliberate styling decisions across the entire application is the colour-coded rating badge system. Each of the six rating levels (0 to 5) is assigned a distinct background colour defined as a CSS custom property in the `:root` block of `Style.css`:

| Rating | Label | CSS Custom Property | Colour |
|---|---|---|---|
| 5 | Very Good | `--r5-bg` | `#1b5e20` (dark green) |
| 4 | Good | `--r4-bg` | `#2e7d32` (mid green) |
| 3 | Generally Satisfactory | `--r3-bg` | `#689f38` (olive green) |
| 2 | Improvement Necessary | `--r2-bg` | `#F57F17` (amber) |
| 1 | Major Improvement Necessary | `--r1-bg` | `#bf360c` (dark orange-red) |
| 0 | Urgent Improvement Required | `--r0-bg` | `#b71c1c` (deep red) |

These colours form a perceptual gradient from safe (green) to urgent (red) that is immediately legible without requiring the user to read a label first. Colour is never used as the sole means of communicating rating information: every badge displays both the numeric score and the colour, and every result card also shows the textual label alongside it. This ensures the interface remains fully accessible to users with colour vision deficiencies, satisfying WCAG 2.1 Level AA requirements as stated in NFR3.

The badges are rendered as styled `<span>` elements with a `value` attribute set to the numeric rating. The CSS attribute selectors `[value="5"]`, `[value="4"]`, and so on apply the correct background colour without any JavaScript involvement, keeping the styling layer cleanly separate from the behaviour layer.

---

### Search Results Page Layout

<img width="1470" height="870" alt="Screenshot 2026-04-06 at 18 05 54" src="https://github.com/user-attachments/assets/6e33daac-44a5-4f01-afb4-2f6fe0e66e44" />
<img width="1470" height="870" alt="Screenshot 2026-04-06 at 18 06 03" src="https://github.com/user-attachments/assets/2cbd413a-857b-495f-bc9e-1d6923739292" />

<img width="1470" height="870" alt="Screenshot 2026-04-06 at 18 08 42" src="https://github.com/user-attachments/assets/70abf7f2-de93-435b-83a7-d271f73ea10a" />
<img width="1470" height="870" alt="Screenshot 2026-04-06 at 18 08 48" src="https://github.com/user-attachments/assets/f9ec4585-b3ee-4fbf-b210-b3002a11693a" />
<img width="1470" height="870" alt="Screenshot 2026-04-06 at 18 08 56" src="https://github.com/user-attachments/assets/68978d6e-bb72-41f5-ad96-3f52cbde1a79" />

The search results page uses the twelve-column CSS grid to create a two-column layout: a narrow filter sidebar on the left and the main results area on the right. This proportional split gives the filter panel enough space to display all filter options clearly without crowding the results, whilst keeping the result cards as the dominant visual element on the page.

Each result card is styled as a raised `<article>` element with a subtle box shadow (`0 2px 8px rgba(0,0,0,0.08)`), a white background, and a left border accent coloured to match the business's rating badge. On hover, the shadow deepens and the card lifts slightly with a `translateY(-2px)` transform, providing a clear visual affordance that the card is clickable. This transition was refined in `Style.css` v3.2.0 to use a 150ms duration for a snappier, more responsive feel.

The active filter chips above the results list are styled as pill-shaped `<button>` elements with a light green background and a small removal icon. They give users immediate visual confirmation that a filter is active, and allow individual filters to be removed with a single click without scrolling back to the filter panel, satisfying FR7.

---

### Business Details Page

<img width="1470" height="867" alt="Screenshot 2026-04-06 at 19 45 54" src="https://github.com/user-attachments/assets/262ebda5-36fc-4f33-a9b6-1b0f208c2548" />
<img width="1470" height="867" alt="Screenshot 2026-04-06 at 19 46 12" src="https://github.com/user-attachments/assets/b0a7d68f-80b2-4412-904f-340b794524be" />

<img width="1470" height="867" alt="Screenshot 2026-04-06 at 19 46 20" src="https://github.com/user-attachments/assets/4ec7a629-ae91-40c8-a66d-604a7edc7245" />
<img width="1470" height="867" alt="Screenshot 2026-04-06 at 19 46 26" src="https://github.com/user-attachments/assets/04bb9062-c186-4aa8-9f07-cda5e75924f2" />

<img width="1470" height="867" alt="Screenshot 2026-04-06 at 19 46 39" src="https://github.com/user-attachments/assets/dcef4743-c7fc-47cf-8b28-a1cbad503999" />



The business details page uses the two-column grid layout. The left column contains an `<article>` card with the business name, the colour-coded rating badge rendered at a larger display size, the business type badge, the full address, and a structured `<dl>` of all dataset fields with `<dt>` labels and `<dd>` values. The right column displays the official FSA rating graphic loaded from the external URL, followed by a rating explanation panel listing all six levels with plain-language descriptions.

The three conditional notice panels are styled with distinct background colours chosen to match their semantic meaning without overlapping the rating badge colour system. The New Rating Pending notice uses the `--warning-bg` amber token (`#fff8e1`) to suggest caution. The Awaiting Inspection notice uses the `--purple-bg` token (`#ede7f6`) to convey a neutral holding state. The Exempt notice uses the `--status-exempt-bg` cool grey-blue token (`#eceff1`) to indicate a permanent administrative status. These specific colour choices prevent users from accidentally confusing a notice panel with a rating badge.

---

### Rating Guide Page

<img width="1470" height="869" alt="Screenshot 2026-04-06 at 18 15 13" src="https://github.com/user-attachments/assets/6714d66e-c2ee-4510-999b-37164d9894cf" />
<img width="1470" height="869" alt="Screenshot 2026-04-06 at 18 15 18" src="https://github.com/user-attachments/assets/49561c3f-1412-4a1b-b850-3640656889ea" />

The Rating Guide page uses a linear scroll layout with a green hero banner at the top, an in-page `<nav>` table of contents with anchor links, and six rating cards rendered as `<article>` elements inside an `<ol>`. Each card uses a thick left border accent in the same colour as that rating's badge, creating a strong visual link between the guide and the badges seen elsewhere in the application. A "What This Means" sub-panel inside each card uses a lighter tinted background to visually differentiate contextual guidance from the primary label and description.

The Special Statuses section at the bottom of the page uses a three-column card layout on desktop that stacks to a single column on mobile, matching the responsive behaviour applied throughout the rest of the application.

---

### Responsive Design

<img width="1026" height="797" alt="Screenshot 2026-04-06 at 18 19 19" src="https://github.com/user-attachments/assets/50a487b6-00b4-42f9-8c24-af588f6b4dfa" />
<img width="1026" height="746" alt="Screenshot 2026-04-06 at 18 19 36" src="https://github.com/user-attachments/assets/4691f7b0-da13-483e-8401-7757f100aad6" />
<img width="1026" height="488" alt="Screenshot 2026-04-06 at 18 19 48" src="https://github.com/user-attachments/assets/741ed391-d4bd-4329-9336-e2d73b04cfae" />

<img width="1026" height="744" alt="Screenshot 2026-04-06 at 18 21 15" src="https://github.com/user-attachments/assets/a2f5c15e-e00b-4972-9838-d3fd71c8c501" />
<img width="1026" height="744" alt="Screenshot 2026-04-06 at 18 21 24" src="https://github.com/user-attachments/assets/c36b6663-320c-4c0f-8adc-959cc71e58d8" />
<img width="1026" height="744" alt="Screenshot 2026-04-06 at 18 21 30" src="https://github.com/user-attachments/assets/b2e2078f-2f5c-4eaa-af28-5193c6c0cf5f" />

<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 23 54" src="https://github.com/user-attachments/assets/80bdfbfc-6b7a-460c-9b5c-195bb9b5980d" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 00" src="https://github.com/user-attachments/assets/b77e0c15-b370-4915-8564-575c67c6b327" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 06" src="https://github.com/user-attachments/assets/345e9dcc-3a88-41ce-ad85-08cab27f8e58" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 13" src="https://github.com/user-attachments/assets/a9aa465d-2171-4cde-b1ca-3cce2dae5e00" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 22" src="https://github.com/user-attachments/assets/e9f17223-14fb-4f0e-ae6e-4772997e5b3a" />

<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 44" src="https://github.com/user-attachments/assets/6d41acf3-602a-4420-839c-fdf75d6f5993" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 52" src="https://github.com/user-attachments/assets/c57577fa-9b69-4bf8-8918-c9a47b377b39" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 24 58" src="https://github.com/user-attachments/assets/2d67c023-49e6-40af-81d4-97c41d9b88c9" />
<img width="519" height="665" alt="Screenshot 2026-04-06 at 18 25 03" src="https://github.com/user-attachments/assets/5aec397a-28a9-4fed-91d4-1d3c83b8694f" />


The stylesheet implements three responsive breakpoints. At desktop width (1024px and above), the full two-column and multi-column layouts are used throughout. At tablet width (768px to 1023px), the filter sidebar collapses above the results list, the business detail two-column layout stacks vertically, and card padding is reduced. At mobile width (below 768px), all multi-column layouts reflow to a single column, the navigation bar collapses into a hamburger toggle button managed by `Main.js`, and font sizes and spacing are adjusted to remain legible and comfortable on small screens.

The mobile navigation toggle is implemented as a `<button>` with three `<span>` bars styled in CSS. The `aria-expanded` and `aria-label` attributes are updated by `Main.js` in real time so that screen readers always announce the correct open or closed state. The `--nav-top` CSS custom property is written by `Main.js`'s `updateNavTop()` function to ensure the navigation panel slides out from exactly below the header, regardless of screen size or device orientation.

---

## Evaluating and Improving Code Quality

### 1. JSLint Validation

All JavaScript modules were passed through JSLint with strict settings to identify potential code quality issues. Both modules achieved zero warnings and zero reports.

In `data.js`, all declarations in Section B use `var` rather than `const` or `let`. JSLint's strictest configuration expects `var` in non-module scripts to ensure compatibility without a transpile step. The `const ALL_BUSINESSES` declaration in Section A is the single exception — it is a top-level constant array assigned once and never reassigned, which JSLint accepts because it is declared before the `'use strict'` directive that governs Section B. All comparison operators across both modules use `===` (strict equality) rather than `==` (loose equality). Early development versions used loose equality in a small number of places when comparing `id` values, which are strings in the embedded array but might arrive as numbers from URL parameters. These were identified and corrected to use `String(biz.id) === String(id)`, which compares both sides as strings without type coercion.

In `Main.js`, `const` and `let` are used inside the IIFE scope. JSLint accepts these because they are scoped to the function expression rather than the top-level window object. The IIFE wrapper was specifically required to satisfy JSLint's rule against top-level variable declarations that could pollute the global namespace.

---

### 2. Identifying and Resolving the Silent Dead Code Bug

The most significant code quality issue identified during development was discovered through careful review of the filter chip removal logic. In an earlier version of the application, the handler for removing active filter chips read attribute names `data-remove-rating` and `data-remove-type` from each chip button. However, the chip buttons generated by the render function in `data.js` actually used `data-group` and `data-value` as their attribute names. The result was that the removal handler was entirely non-functional: it would execute, find no attributes matching the names it expected, and return silently without any visible error, JavaScript exception, or console warning.

This category of bug is particularly difficult to catch because it produces no visible broken behaviour and no diagnostic output. It was identified by opening the browser developer tools, inspecting the generated HTML for a rendered chip button, and comparing the actual attribute names on the element against the attribute names the handler was attempting to read. Once identified, the fix was to rewrite the handler to read `data-group` and `data-value`, and to replace the fragile per-chip `addEventListener` loop with a single event-delegated listener on the `.active-filters` container element. Event delegation is more robust in this context because re-rendering the chip list does not cause duplicate listeners to accumulate, and adding new types of chip in future requires no changes to the JavaScript handler.

---

### 3. Resolving the Layout Regression

During the v3.2.0 visual polish pass on `Style.css`, a regression was introduced in which the no-results state panel and the error banner were rendered simultaneously alongside the results list rather than replacing it. The root cause was that the `display: none` default rules for `.no-results` and `.error-banner` had been accidentally removed during a selector reorganisation. Because `data.js` controls visibility of these panels by toggling `display` directly via JavaScript, the absence of a CSS default caused both panels to appear in their visible state on every page load regardless of whether data had been loaded or results found.

The fix was applied in two coordinated places: the `display: none` defaults were restored in `Style.css` v3.2.0, and `Search.html` was incremented from v2.0.0 to v2.0.1 as a PATCH release to formally record that the rendered output of the page had changed. This dual-file fix illustrates the value of semantic versioning: it is possible to trace the regression to a specific version of a specific file, understand precisely what was changed and why, and confirm which PATCH release resolved it.

---

### 4. Removing the Server Dependency

A known issue in the original implementation was that the application required a running local HTTP server to load the dataset. If the user opened the HTML file directly by double-clicking it, the browser's CORS policy blocked the Fetch request for the CSV file, leaving the application with an empty dataset and a permanent error state. The fix applied in `data.js` v3.0.0 was to embed all 3,867 records directly as the `ALL_BUSINESSES` array, eliminating the Fetch request entirely. The application now initialises from the embedded data synchronously on every load, regardless of whether it is served over HTTP or opened directly from the file system. Whilst this substantially increases the file size of `data.js`, the elimination of the infrastructure dependency makes the application significantly more robust and removes a common failure mode that would have been confusing for non-technical users.

---

### 5. Input Sanitisation Against XSS

During a code review prior to `data.js` v3.0.0, it was identified that several render functions were injecting dataset field values directly into `innerHTML` strings without sanitisation. This created a potential cross-site scripting (XSS) vulnerability: if any business name or address field in the dataset contained HTML special characters such as `<`, `>`, or `"`, the browser would interpret them as markup rather than literal text, potentially disrupting the layout or executing injected script content.

This was addressed by introducing the `escapeHTML()` utility function:

```javascript
function escapeHTML(val) {
  return String(val === null || val === undefined ? '' : val)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}
```

This function replaces all five HTML special characters with their corresponding HTML entities before any value is inserted into the DOM. It is applied to every field of every record at the point of injection, ensuring that the dataset content is always treated as plain text regardless of what characters it contains. This satisfies the security requirement in NFR8 and protects the application against a well-known and preventable class of vulnerability.

---

### 6. Postcode Normalisation

During testing of the search functionality, it was observed that users searching for a Bristol postcode such as `"BS1 1AA"` would receive no results if the business record stored the postcode without a space as `"BS11AA"`, even though the records were clearly the same location. This was a usability failure rather than a bug in the strict sense, but it produced incorrect results for a predictable user behaviour.

The fix introduced postcode normalisation as part of the `matchesBusiness()` function: both the search query tokens and the record's postcode field are stripped of spaces and converted to lowercase before comparison. This means `"BS11AA"`, `"BS1 1AA"`, `"bs1 1aa"`, and `"bs11aa"` all match the same set of records. The change required no modification to the data itself and no structural changes to the module, making it a low-risk improvement with a direct positive impact on FR1 (searching by postcode).

---

## User Guide

### Overview

This user guide explains how to use the Bristol Food Hygiene Ratings web application. It covers both use cases defined in the requirements specification: UC1 (Search and Filter Food Hygiene Ratings) and UC2 (View Detailed Business Information and Understand Ratings). Each use case is demonstrated through a complete, tested scenario with step-by-step instructions.

The application requires no account creation or login. All features are accessible immediately upon opening the application in a web browser.

> **Prerequisites:** The application can be opened directly by double-clicking any HTML file. No local server is required because all data is embedded in `data.js`.

---

### UC1: Search and Filter Food Hygiene Ratings

**Scenario tested:** A user wants to find highly rated restaurants and cafes near Clifton in Bristol, filtered to show only businesses with a hygiene rating of 5.

#### Step 1: Open the Application Homepage

Open your browser and navigate to the application. The homepage (`index.html`) loads and displays the hero search section at the top of the page, containing the main search bar with the placeholder text `"Search by business name, postcode or address..."`. Below the hero, the statistics bar shows live counts of rated businesses and those awaiting inspection, followed by the Browse by Business Type category tiles and the rating summary section.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 15 02" src="https://github.com/user-attachments/assets/d6c1414b-b765-4c8d-9c2b-270bde31c945" />

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 23 12" src="https://github.com/user-attachments/assets/112281d9-d370-4bde-a9ab-321292ae91b1" />

**What is shown:** The full homepage with the hero search bar, statistics bar, six category tiles, and the rating summary section.

#### Step 2: Enter a Search Query

Click inside the search bar and type `clifton`. Then click the Search button or press Enter.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 26 16" src="https://github.com/user-attachments/assets/661c5a95-2710-4af8-b25c-ababf2ed7c66" />


**What happens:** The application validates that the input is not empty, then navigates to `Search.html` with the query parameter `?q=clifton` appended to the URL. `initSearchPage()` in `data.js` immediately filters `ALL_BUSINESSES` to find all records whose name, address, postcode, or rating label contains the string `"clifton"` (case-insensitive).

#### Step 3: Review the Initial Search Results

The Search Results page displays all businesses matching the search term `"clifton"`. The results count label at the top of the results list shows the total number of matching records. Each result card displays the business name in bold, a colour-coded hygiene rating badge, the business type label, the full address, the rating date, and a status badge.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 29 09" src="https://github.com/user-attachments/assets/ed708d45-7488-408e-96ce-99116995a19a" />


**What is shown:** The full results list with the filter panel visible on the left and the paginated result cards on the right.

#### Step 4: Apply the Rating Filter

In the filter panel on the left, locate the Hygiene Rating section. Tick the checkbox labelled `5 — Very Good`. The results list updates immediately without reloading the page, and the results count label updates to reflect the smaller filtered set. An active filter chip labelled `"Rating: 5"` appears above the results list, confirming the filter is applied.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 30 37" src="https://github.com/user-attachments/assets/dd746dca-bc75-4c81-97b8-9f73dfeea79c" />

**What happens:** `data.js` re-runs the filter logic against `ALL_BUSINESSES`, applying both the text search (`"clifton"`) and the rating filter (`5`) simultaneously, satisfying FR7.

#### Step 5: Apply the Business Type Filter

In the filter panel, locate the Business Type section. Tick the checkbox labelled `Restaurant / Café`. The results list updates again immediately, and a second active filter chip labelled `"Type: Restaurant / Café"` appears alongside the first chip. The results count decreases further to reflect the combined filters.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 31 25" src="https://github.com/user-attachments/assets/2cacc8cd-f9a1-4e36-a3e7-cab3e7954146" />

**What is shown:** Only businesses in Clifton that are classified as Restaurant/Cafe/Canteen and hold a rating of 5 are displayed.

#### Step 6: No Results State (Variation)

If the combination of filters produces no matching records, the results list is replaced by the no-results state panel. This panel displays a message informing the user that no results were found and suggests broadening the search or adjusting the filters. The filter panel remains visible so the user can modify their selections without returning to the homepage.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 32 39" src="https://github.com/user-attachments/assets/6da5f819-828a-4268-89e7-497898772d8b" />

**Requirement satisfied:** FR8.

#### Step 7: Remove a Filter Using the Filter Chip

Click the `×` icon on the `"Type: Restaurant / Café"` filter chip. The type filter is removed immediately, the chip disappears, and the results list expands to show all Clifton businesses rated 5 regardless of business type.

<img width="1470" height="951" alt="Screenshot 2026-04-04 at 13 33 46" src="https://github.com/user-attachments/assets/5b281dab-43ef-4ebf-8ae7-0602d886e9cd" />

#### Step 8: Error State (Variation)

If `initSearchPage()` encounters an unexpected runtime error, the results container is replaced by the error state panel. This panel displays a warning message and a Retry button. Clicking Retry reloads the page cleanly, re-triggering the full initialisation sequence.

<img width="649" height="144" alt="Screenshot 2026-04-01 at 00 37 22" src="https://github.com/user-attachments/assets/11bb3d97-9f6a-4a4e-a4bc-3738152c9125" />


**Requirement satisfied:** NFR7.

---

### UC2: View Detailed Business Information and Understand Ratings

**Scenario tested:** The user clicks on a specific business from their filtered search results to view its full inspection record, understand its rating, and check whether any status notices apply.

#### Step 1: Click a Result Card

From the filtered search results produced in UC1, click on any result card. The entire card is a clickable link. `data.js` appends the selected business's `id` as a URL query parameter and navigates to `Business-Detail.html?id=[id]`.

<img width="1470" height="956" alt="Screenshot 2026-04-07 at 19 36 27" src="https://github.com/user-attachments/assets/1d812ab9-4e2a-41b8-8f04-36d495f5a113" />

#### Step 2: View the Business Details Page

The Business Details page loads and `initDetailPage()` in `data.js` locates the correct record in `ALL_BUSINESSES` by `id` and populates the page. The left column contains the business information card, which shows the large numeric rating score box (colour-coded dark green for a rating of 5), the business name in bold, the business type badge, the status badge showing `"Rated"` in green, and the full address. Below the card, a `<dl>` presents every field from the dataset as a clearly labelled `<dt>`/`<dd>` row.

<img width="1470" height="956" alt="Screenshot 2026-04-07 at 19 36 34" src="https://github.com/user-attachments/assets/7363b810-36d9-454b-a335-d4520db5da55" />
<img width="1470" height="956" alt="Screenshot 2026-04-07 at 19 39 38" src="https://github.com/user-attachments/assets/a82cdbe4-e356-4d36-af3c-77ae2574281b" />

**What is shown:** Business name, full address, postcode, business type, hygiene rating, rating date, rating status, and new rating pending indicator, satisfying FR11.

#### Step 3: View the Official Rating Graphic

The right column displays the official Food Standards Agency (FSA) hygiene rating badge, loaded from the external URL stored in the business record. This is the same green and black sticker design displayed on the doors and windows of physical food premises across the United Kingdom.

<img width="1470" height="133" alt="Screenshot 2026-04-07 at 19 40 36" src="https://github.com/user-attachments/assets/b91e4080-6538-4f01-9917-f6e1609a23bd" />


**Requirement satisfied:** FR12. If the graphic fails to load, the `onerror` handler displays the numeric rating value as a styled fallback, satisfying FR13.

#### Step 4: Read the Rating Explanation Panel

Below the official graphic, the "What Does This Rating Mean?" panel lists all six rating levels from 5 to 0, each with its colour-coded score badge and a plain-language description. A Full Guide link at the base of the panel navigates to the Rating Guide page for a more comprehensive explanation.

<img width="348" height="788" alt="Screenshot 2026-04-06 at 18 29 50" src="https://github.com/user-attachments/assets/eae46d19-4eae-4013-ac6a-0d56131cb3ea" />
<img width="348" height="264" alt="Screenshot 2026-04-06 at 18 30 01" src="https://github.com/user-attachments/assets/cb3dd2cb-4bee-42e9-a0c4-b03aa93a9e18" />


**Requirement satisfied:** FR17.

#### Step 5: Conditional Notice — New Rating Pending (Variation)

If the selected business has `newRatingPending: true` in the dataset, a yellow notice panel is displayed below the two-column layout. This notice informs the user that the currently displayed rating may change soon because a new rating is pending publication.

<img width="618" height="133" alt="Screenshot 2026-04-07 at 19 41 24" src="https://github.com/user-attachments/assets/9c948b52-3262-48cc-9a52-b64b81f69ac3" />


**Requirement satisfied:** FR15.

#### Step 6: Conditional Notice — Awaiting Inspection (Variation)

If the selected business has `ratingStatus: 'AwaitingInspection'`, the numeric rating badge is replaced with the label `"Awaiting Inspection"` and a purple notice panel is displayed explaining that the business has not yet been inspected and no hygiene rating is currently available.

<img width="618" height="96" alt="Screenshot 2026-04-07 at 19 41 48" src="https://github.com/user-attachments/assets/f859281c-24f7-48fa-b448-6d1c5bdafc24" />


**Requirement satisfied:** FR14.

#### Step 7: Conditional Notice — Exempt (Variation)

If the selected business has `ratingStatus: 'Exempt'`, a light blue notice panel is displayed explaining that this business is not required to participate in the Food Hygiene Rating Scheme and that no numeric rating will be assigned.

<img width="618" height="96" alt="Screenshot 2026-04-07 at 19 41 55" src="https://github.com/user-attachments/assets/b2d0e49b-472f-46a0-a2a6-718b0c4c7ff0" />


**Requirement satisfied:** FR16.

#### Step 8: Navigate to the Rating Guide

Click the Full Guide link in the rating explanation panel, or click Rating Guide in the navigation bar. The Rating Guide page loads and displays the full green hero banner, the introductory panel, the in-page table of contents, all six rating level cards with colour-coded left-border accents and "What This Means" sub-panels, and the Special Statuses section at the bottom.

<img width="1470" height="867" alt="Screenshot 2026-04-06 at 18 31 33" src="https://github.com/user-attachments/assets/4d65f43e-c186-4f21-acf7-a3e47fef65ca" />
<img width="1470" height="867" alt="Screenshot 2026-04-06 at 18 31 48" src="https://github.com/user-attachments/assets/c88ccb17-887f-49b9-9b27-3c30ff985e41" />
<img width="1470" height="867" alt="Screenshot 2026-04-06 at 18 32 39" src="https://github.com/user-attachments/assets/15e780a6-d047-4fd2-a1df-53934f8c0a05" />


**Requirement satisfied:** FR17.

#### Step 9: Return to Search Results

Click the Back to Results button at the top of the Business Details page. The application navigates back to `Search.html` with the previous search query and filter state preserved in the URL query parameters. The same filtered results are displayed exactly as they were before the user navigated to the details page.

<img width="1470" height="210" alt="Screenshot 2026-04-06 at 20 11 40" src="https://github.com/user-attachments/assets/87730362-ff91-4cf5-8746-c2c5cea5c59a" />

<img width="1470" height="867" alt="Screenshot 2026-04-06 at 20 14 54" src="https://github.com/user-attachments/assets/a31d3e49-73f6-42fb-af7b-7cf1b48b5636" />

**What this demonstrates:** Page-to-page state is preserved via URL query parameters, meaning the user does not need to re-enter their search or re-apply their filters after viewing a business's details.
