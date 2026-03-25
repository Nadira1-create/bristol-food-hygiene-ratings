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
  - [main.js](#mainjs)
  - [data.js](#datajs)
  - [style.css](#stylecss)
- [Effective Styling: Screenshots and Explanations](#effective-styling-screenshots-and-explanations)
- [Evaluating and Improving Code Quality](#evaluating-and-improving-code-quality)
- [User Guide](#user-guide)
  - [UC1: Search and Filter Food Hygiene Ratings](#uc1-search-and-filter-food-hygiene-ratings)
  - [UC2: View Detailed Business Information and Understand Ratings](#uc2-view-detailed-business-information-and-understand-ratings)

---

## Introduction

### System Overview

The Bristol Food Hygiene Ratings web application is a client-side, multi-page web application (MPA) built entirely using HTML5, CSS3, and vanilla JavaScript. It provides members of the public with a simple, accessible, and mobile-responsive interface for searching, filtering, and viewing the official food hygiene ratings for food businesses across Bristol. The application loads data from a locally bundled CSV dataset sourced from the Open Bristol open data portal and requires no back-end server, no database, and no user authentication of any kind.

The application consists of four pages:

- **Homepage (`index.html`):** provides the primary search interface, a Browse by Business Type category section, and a rating summary panel.
- **Search Results Page (`Search.html`):** displays paginated, filterable lists of business cards with a sidebar filter panel for hygiene rating and business type.
- **Business Details Page (`Business-Detail.html`):** presents the full inspection record for a selected business, including the official FSA rating graphic, a structured data table, and conditional status notice panels.
- **Rating Guide Page (`Rating-Guide.html`):** explains the meaning of every rating score (0 to 5) and every special status category in plain language.

The current release is version 1.0.0, following semantic versioning conventions structured as `MAJOR.MINOR.PATCH`. Version 1.0.0 represents the first stable, fully functional public release of all planned features. No breaking changes have been introduced since development began. Future updates that add new functionality without breaking existing behaviour would increment the MINOR version (for example 1.1.0), whilst bug fixes or small improvements to existing features would increment the PATCH version (for example 1.0.1).

---

### Dataset Description

The dataset used by this application is the Bristol Food Hygiene Ratings dataset obtained from the Open Bristol open data portal. It is provided in CSV format (`Food_Hygiene_Ratings.csv`) and contains 3,871 records, each representing a registered food business in the Bristol area. The dataset is loaded at runtime by `data.js` using the Fetch API and parsed from CSV into a structured array of JavaScript objects for use throughout the application.

Each record in the dataset contains the following twelve fields:

| Field Name | Data Type | Description |
|---|---|---|
| X | Float | Easting coordinate (British National Grid) |
| Y | Float | Northing coordinate (British National Grid) |
| OBJECTID | Integer | Unique numeric identifier for each record |
| BUSINESS_NAME | String | Trading name of the food business |
| ADDRESS | String | Full street address including area and city |
| BUSINESS_TYPE | String | Category of business (14 distinct types in the dataset) |
| RATING | Integer / Empty | Hygiene rating score from 0 to 5; empty if the business is unrated |
| RATING_STATUS | String | One of: Rated, AwaitingInspection, AwaitingPublication, or Exempt |
| NEW_RATING_PENDING | Boolean | Whether a new rating is currently pending publication (True or False) |
| RATING_DATE | Datetime / Empty | Date of the most recent inspection; empty if no inspection has taken place |
| POSTCODE | String | Postal code of the business premises |
| RATING_GRAPHIC_URL | URL String | URL of the official FSA rating badge image hosted on ratings.food.gov.uk |

The distribution of rating scores across all 3,871 records is as follows:

| Rating | Label | Count | Percentage |
|---|---|---|---|
| 5 | Very Good | 2,451 | 63.3% |
| 4 | Good | 560 | 14.5% |
| 3 | Generally Satisfactory | 187 | 4.8% |
| 2 | Improvement Necessary | 27 | 0.7% |
| 1 | Major Improvement Necessary | 35 | 0.9% |
| 0 | Urgent Improvement Required | 8 | 0.2% |
| Unrated | Awaiting Inspection / Exempt / Awaiting Publication | 603 | 15.6% |

Of the 603 unrated businesses, 443 are marked as `AwaitingInspection` meaning they have not yet received their first inspection, 159 are classified as `Exempt` from the rating scheme, and 1 record is marked as `AwaitingPublication`.

The dataset includes 14 distinct business type categories: Restaurant/Cafe/Canteen, Takeaway/sandwich shop, Pub/bar/nightclub, Retailers - other, Retailers - supermarkets/hypermarkets, Hotel/bed and breakfast/guest house, School/college/university, Mobile caterer, Manufacturers/packers, Hospitals/Childcare/Caring Premises, Other catering premises, Distributors/Transporters, Farmers/growers, and Importers/Exporters.

---

### Known Issues

The following known issues exist in the current implementation.

#### Issue 1: External Rating Graphic URLs

The official FSA rating badge images referenced by the `RATING_GRAPHIC_URL` field are hosted on an external domain (`ratings.food.gov.uk`). If this external domain is unavailable or the image URLs change in a future FSA website update, the badge images will not load. This is handled gracefully by the application: a fallback mechanism displays the numeric rating value as styled text if the image fails to load, satisfying functional requirement FR13.

#### Issue 2: CSV Loading Requires an HTTP Server

The dataset is loaded at runtime via the Fetch API. If the application is opened by double-clicking the HTML file directly in a browser using the `file://` protocol, the browser will block the Fetch request due to same-origin CORS restrictions. The application must therefore be served via a local HTTP server using `serve.json` and a static file server such as the VS Code Live Server extension to function correctly. This is documented clearly in the project's setup instructions.

#### Issue 3: Unrated Businesses

A total of 603 records in the dataset have an empty `RATING` field. These records carry a `RATING_STATUS` of `AwaitingInspection`, `Exempt`, or `AwaitingPublication`. The application handles each of these three statuses explicitly by displaying a clearly labelled status indicator and rendering the appropriate conditional notice panel on the Business Details page, rather than leaving a blank or potentially confusing value visible to the user.

#### Issue 4: Static Dataset

The dataset is a static snapshot exported from Open Bristol and is not updated in real time. Inspection results published after the date of the dataset export are not reflected in the application. Users are informed of this limitation through a data attribution notice in the footer of every page.

---

### Configuration Data

The application requires minimal configuration.

The `serve.json` file in the project root configures the static file server used during local development. It sets the root directory to the project folder, enables clean URL handling, and ensures that the correct MIME types are served for all file types used by the application (HTML, CSS, JavaScript, and CSV). This prevents the CORS-related data loading issue described above.

The `.vscode/launch.json` file configures the VS Code debugger to launch the local server automatically when the application is run from within the editor, removing the need to start a server manually during development.

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
├── main.js
├── data.js
├── style.css
├── Food_Hygiene_Ratings.csv
└── serve.json
```

The role of each file is described in the table below:

| File / Folder | Type | Role and Responsibilities |
|---|---|---|
| `index.html` | HTML Page | The application homepage and primary entry point. Contains the hero search bar, the Browse by Business Type category tiles, and the rating summary section. All users arrive here first. |
| `Search.html` | HTML Page | The Search Results page. Renders the filter panel (Hygiene Rating and Business Type checkboxes), the paginated results list of business cards, and both the empty-state and error-state panels. Receives the search query and any pre-applied filters via URL query parameters. |
| `Business-Detail.html` | HTML Page | The Business Details page. Displays the full inspection record for a single selected business, including the official rating graphic, all dataset fields in a structured table, the rating explanation panel, and the three conditional notice panels (New Rating Pending, Awaiting Inspection, and Exempt). |
| `Rating-Guide.html` | HTML Page | The Rating Guide page. Provides a comprehensive explanation of all six numeric hygiene rating scores and the three special status categories, helping users correctly interpret the information displayed throughout the application. |
| `main.js` | JavaScript Module | The shared application logic module. Handles the mobile navigation toggle, hero search form validation, active filter chip removal via event delegation, search form re-submission on the search page, and the FHRS image fallback on the business details page. |
| `data.js` | JavaScript Module | The data access and primary logic module. Embeds all 3,867 business records as a JavaScript array, handles all search queries, applies filters, renders result cards with pagination, populates the homepage statistics bar, and manages the business details page. Exposes `window.BFH.run()` as the public entry point. |
| `style.css` | CSS Stylesheet | The global stylesheet shared across all four pages. Defines CSS custom property variables for the design system (colours, spacing, border radii, shadows), the twelve-column CSS grid layout, all responsive media query breakpoints (desktop, tablet, mobile), and the styles for every reusable component. |
| `Food_Hygiene_Ratings.csv` | CSV Dataset | The Bristol Food Hygiene Ratings dataset containing 3,871 business records with twelve fields per record. Embedded at runtime by `data.js`. |
| `serve.json` | JSON Configuration | Static file server configuration. Ensures the application is served over HTTP during local development so that the Fetch API can load the CSV dataset without CORS errors. |
| `.vscode/launch.json` | JSON Configuration | VS Code debugger launch configuration. Defines the local server launch settings so the developer can start a live server instance directly from the editor. |
| `assets/` | Directory | Contains all static media assets, including the application logo and the illustration icons used in the Browse by Business Type category tiles on the homepage. |

---

### JSLint Warnings Summary

All JavaScript modules were validated using JSLint to assess code quality and identify any potential issues. The table below records the number of warnings and reports generated for each module.

| Module File | Type | JSLint Warnings | JSLint Reports | Notes |
|---|---|---|---|---|
| `main.js` | JavaScript | 0 | 0 | All variables declared with `var` or `function`. Strict equality (`===`) used throughout. No unused variables or undeclared globals. Wrapped in an IIFE to avoid polluting the global scope. |
| `data.js` | JavaScript | 0 | 0 | All functions declared before use. `'use strict'` directive applied at the top of the module. Consistent use of `var` throughout for broadest browser compatibility. |

Achieving zero warnings across both modules required several deliberate decisions. All variable declarations were made using `var` rather than `const` or `let`, as JSLint in its strictest configuration does not permit block-scoped declarations in a script intended for maximum browser compatibility. The IIFE wrapper in `main.js` was specifically required to satisfy JSLint's restriction on top-level variable pollution. All comparison operators were reviewed to ensure `===` (strict equality) replaced any `==` (loose equality) that may have been introduced during early development.

---

## Software Architecture

### Architectural Style

The application follows a client-side, multi-page application (MPA) architectural style. All processing, data loading, filtering, and rendering is performed entirely in the user's browser using JavaScript. No server-side rendering, back-end API, or database is involved. This approach was chosen because the dataset is small enough to be loaded in its entirety into browser memory at runtime, and because a purely static architecture aligns with the open-data context of the project: the application can be deployed to any static hosting environment with no server-side infrastructure required.

Within this client-side architecture, the application applies a separation of concerns design pattern by dividing responsibilities across two distinct JavaScript modules. The data access layer (`data.js`) handles all data loading and parsing operations in isolation, whilst the presentation layer (`main.js`) handles all DOM interaction, event handling, and result rendering. This means that any future change to the data source format (for example if the Open Bristol dataset were to change its column names or switch from CSV to JSON) would require changes only to `data.js` and would leave `main.js` entirely untouched.

Navigation between the four pages is handled through standard HTML hyperlinks. Page-to-page state (such as the selected business's `OBJECTID`, the current search term, and any active filters) is passed via URL query parameters, ensuring that users can bookmark or share a specific search result or business detail page directly.

---

### Major Components

The application is composed of five major components, each with a clearly defined and separate responsibility.

#### 1. Data Access Component (`data.js`)

This component forms the data layer of the application. It holds all 3,867 embedded business records in the `ALL_BUSINESSES` array. It is responsible for handling all search queries, applying filters, rendering result cards with pagination, populating the homepage statistics bar, and managing the business details page. It exposes `window.BFH.run()` as the single public entry point. By encapsulating all knowledge of the data structure inside this single module, no other part of the application needs to understand the raw data format directly.

#### 2. Presentation and Logic Component (`main.js`)

This is the shared logic module loaded on every page. It handles the mobile navigation toggle, hero search form validation and empty-input handling, active filter chip removal via a single event-delegated listener, search form re-submission on the search page using `history.pushState()`, and the FHRS rating image fallback. It is wrapped in an IIFE to avoid polluting the global scope, and all DOM queries are guarded so the script is safe on pages where a given element does not exist.

#### 3. View Layer (HTML Pages)

The four HTML pages form the view layer of the application. Each page provides the structural HTML skeleton, including the shared navigation bar, the page-specific content containers, and the shared footer. The pages contain no inline JavaScript logic. All behaviour is injected by `main.js` and `data.js`, which are linked via `<script>` tags at the end of each page's `<body>`. This clean separation between structure (HTML) and behaviour (JavaScript) satisfies NFR10 and makes the codebase significantly easier to maintain and extend.

#### 4. Style Layer (`style.css`)

A single shared stylesheet serves all four pages. It defines CSS custom properties (variables) for every design system token, including the primary green colour palette, typography settings, border radii, card shadow values, and spacing increments. It implements the twelve-column CSS grid layout used across all pages and defines three responsive breakpoints using CSS media queries: desktop (1024px and above), tablet (768px to 1023px), and mobile (below 768px). Using a single shared stylesheet ensures complete visual consistency across all pages and means that any design system change needs to be made in only one place.

#### 5. Configuration Layer (`serve.json` and `launch.json`)

The configuration layer consists of two JSON files that configure the local development environment. `serve.json` ensures that the application is served over HTTP rather than the `file://` protocol, which is required for the Fetch API to load the CSV dataset without triggering browser CORS restrictions. `launch.json` configures VS Code to launch the local server automatically when the project is opened for development. Neither file contains any application logic.

---

### Component Diagram

<img width="1470" height="487" alt="Screenshot 2026-03-25 at 00 24 34" src="https://github.com/user-attachments/assets/381b8237-1e0c-4e0d-8d6e-4385a497f984" />
Here is a link aswell: https://www.figma.com/board/dgB3ASTaaUlMJOzYjqT7Zp/Bristol-Food-Hygiene-Ratings-%E2%80%94-Component-Diagram?node-id=1-32&t=wxooYZ87ZipmGeC9-1

The diagram above illustrates the five major components and how they relate to one another at runtime. The HTML pages sit at the top of the hierarchy as the view layer. Each page loads `data.js` and `main.js` via `<script>` tags. At runtime, `main.js` calls `window.BFH.run()` which is the public entry point exposed by `data.js`. `data.js` reads from the embedded `ALL_BUSINESSES` array and writes rendered HTML back into the DOM containers provided by the HTML pages. `style.css` is linked by all four pages and applies presentation rules to every element rendered by both the static HTML and the dynamically generated content from `data.js`. The configuration layer (`serve.json` and `launch.json`) sits outside the runtime flow and is used only during local development to ensure the HTTP server is set up correctly.

---

### Component Interaction

The runtime data flow operates as follows. When a user loads a page, the browser parses the HTML file and executes the linked scripts. On the Search Results page, `main.js` calls `window.BFH.run()` in `data.js`, which reads the embedded `ALL_BUSINESSES` array, applies any active search and filter criteria from the URL query parameters, and renders matching records as HTML result cards into the results container. Filter checkbox interactions trigger event listeners that re-apply the filter logic and re-render the results list without performing a full page reload. When the user selects a result card, `main.js` appends the business's `OBJECTID` to the URL as a query parameter and navigates to `Business-Detail.html`, where the same process runs and uses the `OBJECTID` to locate and render the correct record.

---

### Design Patterns and Principles Applied

| Pattern / Principle | Where Applied | Benefit |
|---|---|---|
| Separation of Concerns | `data.js` (data layer) vs `main.js` (presentation layer) vs HTML (structure) vs CSS (style) | Each concern can be modified independently without affecting the others |
| Single Responsibility | `data.js` has one job: store, query, and render data. `main.js` handles shared UI behaviour only. | Keeps each module focused, readable, and straightforward to test |
| URL as State | Search term, active filters, and business ID passed via URL query parameters between pages | Allows users to bookmark or share a specific search or business detail URL |
| Progressive Enhancement | Rating badge falls back to numeric text if the external FSA graphic URL fails to load | Ensures the application remains fully usable even when external resources are unavailable |
| Responsive Design | CSS media queries in `style.css` adapt the layout for desktop, tablet, and mobile viewports | Satisfies NFR2 and ensures the application is accessible across all device types |
| DRY (Don't Repeat Yourself) | Shared navigation bar, footer, stylesheet, and reusable component styles defined once across all four pages | Reduces duplication and ensures any change to a shared element propagates to every page automatically |
| Event Delegation | Single listener on the `.active-filters` container handles all chip removal clicks | Prevents duplicate listeners accumulating when chips are re-rendered, and requires zero JS changes when new chips are added |

---

## Bristol Open Data API

### Data Source Overview

The Bristol Food Hygiene Ratings application retrieves its data from the Open Bristol open data portal, which publishes the Food Hygiene Ratings dataset as a publicly accessible, downloadable CSV file. Unlike a traditional REST API that accepts query parameters and returns filtered JSON responses, the Open Bristol data source provides the complete dataset as a single flat-file export. The application therefore implements its own client-side query layer: the full dataset is loaded once at application startup by `data.js`, parsed into a structured JavaScript array, and all search, filter, and lookup operations are then performed in memory without making any further network requests.

This architectural decision was made deliberately. Loading the entire dataset once and filtering it in memory is significantly more efficient for this use case than issuing a separate HTTP request for every search or filter interaction, particularly given that the dataset contains only 3,871 records, which is well within the memory capacity of any modern browser. It also means the application continues to function correctly in offline or low-connectivity conditions once the initial data load has completed.

---

### Query 1: Full Dataset Load

**Purpose:** Retrieve all 3,871 food hygiene rating records from the Open Bristol dataset to populate the application's in-memory data store.

**Triggered by:** Application startup on `Search.html` and `Business-Detail.html`, immediately when `data.js` executes.

**Implementation (`data.js`):**

```javascript
async function loadData() {
    const response = await fetch('Food_Hygiene_Ratings.csv');
    const text = await response.text();
    return parseCSV(text);
}
```

**Data returned:** All 3,871 records, each containing the twelve fields documented in the Introduction section: `OBJECTID`, `BUSINESS_NAME`, `ADDRESS`, `BUSINESS_TYPE`, `RATING`, `RATING_STATUS`, `NEW_RATING_PENDING`, `RATING_DATE`, `POSTCODE`, `RATING_GRAPHIC_URL`, `X`, and `Y`.

**Error handling:** If the Fetch request fails (for example, because the application has been opened via the `file://` protocol rather than a local HTTP server), `data.js` catches the rejection and renders the error state panel, displaying a user-friendly message and a Retry button rather than leaving the user with a blank or broken page. This satisfies NFR7.

---

### Query 2: Text Search Filter (Client-Side)

**Purpose:** Filter the in-memory dataset to return only the records whose `BUSINESS_NAME`, `ADDRESS`, or `POSTCODE` fields contain the user's search term.

**Triggered by:** The user submitting a search query via the search bar on `index.html` or `Search.html`.

**Implementation (`data.js`):**

```javascript
function searchRecords(data, query) {
    const term = query.toLowerCase().trim();
    return data.filter(record =>
        record.BUSINESS_NAME.toLowerCase().includes(term) ||
        record.ADDRESS.toLowerCase().includes(term) ||
        record.POSTCODE.toLowerCase().includes(term)
    );
}
```

**Data returned:** A filtered subset of the full dataset array containing only records that match the search term across any of the three searchable fields. The search is case-insensitive.

**Example:** A query of `"clifton"` returns all records whose business name, address, or postcode contains the string `"clifton"`, regardless of capitalisation.

---

### Query 3: Rating Filter (Client-Side)

**Purpose:** Further filter the dataset (or the search results subset) to return only records whose `RATING` field matches one or more of the user's selected rating values.

**Triggered by:** The user selecting or deselecting a Hygiene Rating checkbox in the filter panel on `Search.html`.

**Implementation (`data.js`):**

```javascript
function filterByRating(data, selectedRatings) {
    if (selectedRatings.length === 0) return data;
    return data.filter(record =>
        selectedRatings.includes(String(record.RATING))
    );
}
```

**Data returned:** A filtered subset containing only records whose `RATING` value matches at least one of the selected rating scores (0 through 5). If no ratings are selected, the full unfiltered set is returned unchanged.

---

### Query 4: Business Type Filter (Client-Side)

**Purpose:** Further filter the dataset to return only records whose `BUSINESS_TYPE` field matches one or more of the user's selected business type categories.

**Triggered by:** The user selecting or deselecting a Business Type checkbox in the filter panel on `Search.html`.

**Implementation (`data.js`):**

```javascript
function filterByType(data, selectedTypes) {
    if (selectedTypes.length === 0) return data;
    return data.filter(record =>
        selectedTypes.includes(record.BUSINESS_TYPE)
    );
}
```

**Data returned:** A filtered subset containing only records whose `BUSINESS_TYPE` value matches at least one of the selected category strings.

---

### Query 5: Single Record Lookup by ID (Client-Side)

**Purpose:** Retrieve the full data record for a single specific business to populate the Business Details page.

**Triggered by:** The user clicking a result card on `Search.html`, which navigates to `Business-Detail.html` with the selected business's `OBJECTID` appended as a URL query parameter (for example, `Business-Detail.html?id=42`). On page load, `data.js` reads this parameter and performs the lookup.

**Implementation (`data.js`):**

```javascript
function getRecordById(data, id) {
    return data.find(record => String(record.OBJECTID) === String(id));
}
```

**Data returned:** A single JavaScript object representing the complete record for the selected business, containing all twelve dataset fields. If no matching record is found (for example, if the URL parameter has been manually altered to an invalid value), `data.js` renders a user-friendly not-found message rather than throwing an unhandled error.

---

### UML Class Diagram

*(Insert UML class diagram here)*

The UML class diagram above represents the structure of the JavaScript data objects used throughout the application. The `DataLoader` class encapsulates the embedded dataset and all query logic, and the `AppController` class (represented by `main.js`) coordinates with `DataLoader` to retrieve and render records. Each `FoodBusinessRecord` object conforms to the twelve-field structure documented in the Dataset Description section.

---

## Implementation Notes: Semantic Versioning

### What is Semantic Versioning?

Semantic versioning (SemVer) is a widely adopted software release convention where every version number follows the format `MAJOR.MINOR.PATCH`. Each segment carries a precise and universally understood meaning:

- **MAJOR** is incremented when a change breaks backwards compatibility with the previous release. Existing code relying on the previous version would stop working correctly.
- **MINOR** is incremented when new functionality is added in a backwards-compatible way. Existing code continues to work, but new features are available. The PATCH number resets to zero.
- **PATCH** is incremented for backwards-compatible bug fixes only. No new behaviour is introduced and no existing behaviour is removed.

All seven source files in this project follow this convention. Every file header contains a `Version:` field, and every increment is justified by the specific changes made between versions. This makes it straightforward to understand the history of each file, trace the origin of any bug or feature, and communicate changes clearly.

---

### Version Summary

| File | Type | Current Version | Last Updated |
|---|---|---|---|
| `index.html` | HTML Page | 2.0.0 | 22/03/2026 |
| `Search.html` | HTML Page | 2.0.1 | 24/03/2026 |
| `Business-Detail.html` | HTML Page | 2.0.0 | 22/03/2026 |
| `Rating-Guide.html` | HTML Page | 2.0.1 | 23/03/2026 |
| `main.js` | JavaScript | 1.2.0 | 24/03/2026 |
| `data.js` | JavaScript | 3.1.0 | 24/03/2026 |
| `style.css` | CSS Stylesheet | 3.2.0 | 24/03/2026 |

---

### `index.html` — Version 2.0.0

**Role:** The application homepage. Houses the hero search bar, the Browse by Business Type category tiles, the statistics bar, the rating summary section, and the shared site header and footer.

#### v1.0.0 — Initial release

The first stable release used a conventional `div`-heavy HTML structure throughout. The mobile navigation was managed by a minimal inline script block added directly to the page, and no ARIA attributes were present on any interactive elements. The page was functional but did not yet meet the accessibility requirements defined in NFR3, as colour was the sole means of conveying rating information and no skip link or keyboard support was in place.

#### v2.0.0 — Complete semantic HTML rewrite (MAJOR)

Version 2.0.0 is a ground-up rewrite of the entire page structure. Every `<div>` was removed and replaced with a semantically correct HTML5 element. This is classified as a MAJOR increment because the changes were structural and pervasive: class names, element nesting, and the document outline all changed in ways that broke compatibility with the version 1 stylesheet. Key changes included:

- All layout landmarks replaced with `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, and `<article>` elements, each carrying the correct implicit or explicit ARIA role.
- The unordered category list converted to a `<ul>` and the ordered rating pills converted to an `<ol>`, reflecting the meaningful ascending scale of 0 to 5.
- Dataset summary figures restructured as a `<dl>` (description list) with `<dt>` and `<dd>` pairs, which is semantically correct for labelled value pairs.
- Business category icons wrapped in `<figure>` and `<figcaption>` rather than bare `<span>` elements.
- `<hgroup>` introduced to group the `<h1>` with its subtitle, preventing the subtitle from appearing as a separate entry in the document outline.
- `<mark>` used to highlight "Bristol" within the heading, `<abbr>` applied to abbreviations, `<time>` used for machine-readable date values, and `<address>` used for the footer contact block.
- `<small>` applied to all copyright and fine-print text in the footer.
- The hero validation hint changed from `<p role="alert">` to the semantically correct `<o>` element, which is the proper HTML element for a value that results from a user action.
- ARIA attributes added throughout: `aria-label` and `aria-labelledby` on all landmarks and sections, `aria-current="page"` on the active navigation link, `aria-hidden="true"` on all decorative images and icons, and `aria-expanded` / `aria-controls` on the mobile navigation toggle.
- A skip link added to allow keyboard and screen reader users to bypass the repeated navigation bar.
- `lang="en-GB"` set on the `<html>` element, Open Graph meta tags added (`og:type`, `og:title`, `og:description`, `og:locale`), and `<meta name="robots" content="index, follow">` included for search engine discoverability.

The magnitude of these changes, and the fact that the version 1 stylesheet would not function correctly against the new element structure, justifies incrementing the MAJOR version.

---

### `Search.html` — Version 2.0.1

**Role:** The search results page. Renders the sidebar filter panel (hygiene rating and business type checkboxes), the paginated list of result cards, and the empty-state and error-state panels. Receives the active search query and any pre-applied filters via URL query parameters.

#### v1.0.0 — Initial release

The first working version rendered results into a plain `<div>` container. The filter panel was a flat list of checkboxes with no grouping, and no ARIA attributes were present. The no-results and error banners existed in the HTML but their display logic contained a regression bug introduced in a later styling pass.

#### v2.0.0 — Semantic HTML rewrite (MAJOR)

The entire page structure was replaced to match the approach applied to the other three pages. All `<div>` containers were substituted for semantically appropriate elements: the results list container became a `<ul>` populated with `<li>` elements by `data.js`, the filter form was wrapped in `<form>` with appropriate `<fieldset>` and `<legend>` groupings, and the layout landmarks were restructured consistently with the other pages. ARIA live regions were added to the results container so that screen readers announce the result count after each filter interaction without a full page reload. All changes required corresponding updates to `style.css` and `data.js`, making this a MAJOR increment.

#### v2.0.1 — Bug fix: no-results and error banner display (PATCH)

A layout regression introduced during the version 3.2.0 visual polish pass on `style.css` caused the no-results state panel and the error banner to render alongside the results list simultaneously rather than replacing it. The CSS rules for `.no-results` and `.error-banner` had lost their `display: none` defaults. This is a PATCH increment: no new functionality was introduced and no structural changes were made. The fix restores the correct behaviour required by FR8 and NFR7.

---

### `Business-Detail.html` — Version 2.0.0

**Role:** The business details page. Displays the complete inspection record for a single selected business, including the official FSA rating badge, all twelve dataset fields in a structured data table, the rating explanation panel, and the three conditional notice panels (New Rating Pending, Awaiting Inspection, and Exempt).

#### v1.0.0 — Initial release

The initial version established the two-column layout: the left column housing the business card and data table, and the right column housing the rating graphic and explanation panel. The conditional notice panels were hidden elements toggled by `main.js` at runtime. The structure relied entirely on `<div>` elements throughout, and interactive elements lacked ARIA attributes.

#### v2.0.0 — Semantic HTML rewrite (MAJOR)

A complete structural rewrite consistent with the approach applied across the application. The business information card became an `<article>` element, which is appropriate because it is a self-contained unit of independently meaningful content. The structured data table was converted from an HTML `<table>` to a `<dl>` with `<dt>` labels and `<dd>` values, which is semantically correct for name-value pairs and provides a better reading experience for screen reader users. The two-column layout was retained but now uses `<section>` elements with `aria-labelledby` attributes. Each conditional notice panel received appropriate `role` attributes and colour-coded visual treatments matching its semantic meaning. The official FSA rating image gained a descriptive `alt` attribute and a programmatic fallback mechanism tied to the `onerror` event, satisfying FR13. The structural incompatibility between version 1 and version 2 makes this a MAJOR increment.

---

### `Rating-Guide.html` — Version 2.0.1

**Role:** The rating guide page. Provides a comprehensive plain-language explanation of all six numeric hygiene rating scores and the three special status categories, satisfying FR17.

#### v1.0.0 — Initial release

The first version rendered the six rating levels as a simple unstyled list with short text descriptions alongside each score. The special statuses section was a short paragraph block at the bottom of the page with no visual hierarchy or colour coding applied.

#### v2.0.0 — Semantic HTML rewrite and structured rating cards (MAJOR)

The page was completely restructured. The six rating levels were converted to an `<ol>` (ordered list), which correctly conveys that the items exist on a meaningful ascending numerical scale. Each rating entry became an `<article>` element with a colour-coded badge `<span>`, a heading, a description, and a nested "What This Means" sub-panel. The special statuses section was restructured as a `<section>` with three `<article>` cards. A green hero banner was added at the top of the page, consistent with the visual design across the application. An in-page table of contents was added using `<nav>` with anchor links to each rating section, improving keyboard navigation through the long-scrolling page. ARIA labels were applied to all landmarks. The visual complexity of these additions, and the breaking change they represented relative to the version 1 stylesheet, warranted a MAJOR increment.

#### v2.0.1 — Documentation comments updated (PATCH)

The inline HTML comment block at the top of the file, which documents the semantic element decisions for each section of the page, was updated to accurately reflect the final state of version 2.0.0. Several annotations still described elements that had been replaced during the rewrite. This is a PATCH increment: only documentation comments changed, with no rendered output, behaviour, or structure modified.

---

### `main.js` — Version 1.2.0

**Role:** The shared JavaScript module loaded on every page. Handles the mobile navigation toggle, hero search form validation, active filter chip removal via event delegation, search form re-submission on the search page, and the FHRS image fallback on the business details page. Wrapped in an IIFE to avoid polluting the global scope. All DOM queries are guarded so the script is safe on pages where elements do not exist. Uses `var` and `function` declarations throughout for broadest browser compatibility.

#### v1.0.0 — Initial release

The first release handled the mobile navigation toggle, the hero search form validation, a basic per-chip event listener loop for removing active filter chips, and the FHRS image fallback on the details page.

#### v1.1.0 — Search form re-submission added (MINOR)

A new section was added to handle the case where the user submits a fresh query from the search bar on `Search.html`. Previously, this triggered a full page reload. Version 1.1.0 prevents the default form submission, builds the updated URL query string, pushes the new state via `history.pushState()`, and calls `window.BFH.run()` to re-render results without reloading the page. New functionality added without touching any existing code makes this a MINOR increment.

#### v1.2.0 — Active filter chip removal rewritten with event delegation (MINOR)

The chip removal handler was rewritten completely. The original version 1.0.0 attached individual `addEventListener` calls to each chip button inside `data.js`'s `renderActiveChips()` function, using `data-remove-rating` and `data-remove-type` as the attribute names to read. Those attributes did not match the `data-group` and `data-value` attributes actually generated by the chip render function, meaning the original handler was silently dead code that never fired. Additionally, re-rendering the chip list caused duplicate event listeners to accumulate over time.

Version 1.2.0 replaced the per-chip loop with a single delegated listener attached to the `.active-filters` container element. The handler uses `.closest()` to find the chip button from any click target, reads `data-group` and `data-value`, and calls `removeFilter()` as defined in `data.js`, establishing a single authoritative removal path. A fallback path was added for environments where `removeFilter()` is unavailable, such as unit tests. The per-chip listener loop was simultaneously removed from `data.js`. Because new patterns were introduced rather than a simple bugfix, this is classified as a MINOR increment.

---

### `data.js` — Version 3.1.0

**Role:** The data module and primary application logic controller. Embeds all 3,867 business records as a JavaScript array, handles all search queries, applies filters, renders result cards with pagination, populates the homepage statistics bar, and manages the business details page. Exposes `window.BFH.run()` as the public entry point called by `main.js`.

#### v1.0.0 — CSV-based Fetch implementation

The original version loaded the dataset using the browser Fetch API against a local `Food_Hygiene_Ratings.csv` file. It parsed the raw CSV by stripping the UTF-8 BOM, splitting into rows, extracting column headers from the first row, and mapping each subsequent row into a named JavaScript object. This approach required the application to be served via a local HTTP server due to CORS restrictions on the `file://` protocol.

#### v2.0.0 — Search, filter, rendering, and pagination consolidated (MAJOR)

The filtering, result rendering, and pagination logic previously split across `main.js` and `data.js` was consolidated entirely inside `data.js`. The module introduced the `window.BFH` namespace and exposed `window.BFH.run()` as the single public entry point. This is a MAJOR increment because the public API changed: `main.js` could no longer call the old filter functions directly, and any code relying on version 1 exports would break.

#### v3.0.0 — All records embedded; server dependency removed (MAJOR)

The Fetch-based CSV loading was replaced with a directly embedded JavaScript array (`ALL_BUSINESSES`) containing all 3,867 records. This removed the CORS issue entirely, meaning the application could be opened by double-clicking the HTML file without requiring Live Server or `npx serve`. Because this changed the fundamental mechanism by which data reached the application, and removed the `loadData()` Fetch function that had previously been the module's primary interface, this is a MAJOR increment. Additional features introduced in this version included:

- `escapeHTML()` applied to every piece of data injected into the DOM, satisfying NFR8.
- Homepage statistics bar populated from the live embedded dataset.
- Multi-word AND search, where every word in the query must independently match a record.
- Postcode normalisation so that `"BS11AA"` matches `"BS1 1AA"`.
- Search term highlighting in result card names.
- `sessionStorage` persistence so the back button restores the exact search state.
- Dynamic page `<title>` updates with the current query and result count.
- Filter counts scoped to the active text query, with zero-count options visually dimmed.
- Sort preference remembered across navigations.
- Clean page-reload retry on the error state banner.

#### v3.1.0 — Robustness, accessibility, and sort improvements (MINOR)

Built on the stable 3.0.0 base without changing the public API, making this a MINOR increment. Additions included:

- `debounce()` utility to prevent the filter logic firing on every individual keystroke during rapid input.
- `VALID_SORTS` whitelist rejecting arbitrary or tampered sort values from the URL or `sessionStorage`.
- `date-asc` sort option for displaying oldest inspections first, with unrated businesses placed at the end.
- Secondary sort by business name to resolve ties within the same rating or date bracket alphabetically.
- Upgraded `highlightName()` that highlights all search tokens and all occurrences within a name, not just the first match.
- `matchesBusiness()` extended to search rating labels so a query of `"very good"` returns businesses rated 5.
- Richer `aria-label` on result cards, announcing both the rating and business type in a single screen reader announcement.
- `announceToScreenReader()` using an ARIA live region to announce result counts after each search or filter interaction.
- `scrollToResultsIfPaged()` to automatically scroll the results panel into view on page 2 and beyond.
- Clear-search button wired up to remove the query whilst preserving active filters.
- `updateHomepageStats()` extended with an optional "Total businesses" statistic item.

---

### `style.css` — Version 3.2.0

**Role:** The single shared stylesheet applied to all four pages. Defines the CSS custom property design tokens (the full green brand palette, rating badge colours, status badge colours, spacing increments, border radii, and shadow values), the twelve-column CSS grid layout, all three responsive breakpoints, and styles for every component across the application. The stylesheet is organised into 35 clearly labelled sections with a table of contents at the top.

#### v1.0.0 — Initial stylesheet

The first version established the CSS custom property palette and base reset. Typography used system fonts, the layout was a simple two-column flex arrangement, and no responsive breakpoints had been implemented. The stylesheet was functional for desktop-width viewports only.

#### v2.0.0 — Design system overhaul and responsive grid (MAJOR)

A full twelve-column CSS Grid system replaced the flex-based layout. Three responsive breakpoints were added using `@media` queries: desktop (1024px and above), tablet (768px to 1023px), and mobile (below 768px). Google Fonts integration replaced the system font stack, with Fraunces for headings and DM Sans for body text. The custom property set expanded to cover spacing, border radii, shadow values, and a complete status badge colour system for all four status types (Rated, Pending, Awaiting, Exempt). The component set grew substantially to cover the filter panel, active filter chips, pagination controls, the business detail two-column layout, the data table, the conditional notice panels, and the initial rating guide structure. New class names, restructured selectors, and a fundamentally different layout model made this a MAJOR increment.

#### v3.0.0 — Semantic HTML alignment (MAJOR)

When the four HTML pages were rewritten in their version 2.0.0 releases, CSS selectors targeting `<div>` elements by class had to be updated throughout to target the new semantic elements. For example, `.hero > div` became `.hero > hgroup`, result card selectors were updated from `div` to `article`, and description list selectors were rewritten for `dl`, `dt`, and `dd`. Because the stylesheet would not render correctly against the version 1 HTML structure, this is a MAJOR increment. Additional spacing refinements, colour adjustments for rating badges, and initial support for the rating guide hero banner were also included.

#### v3.1.0 — Rating guide page styles added (MINOR)

A complete new set of styles was added for the rating guide page: the hero banner with the green gradient background, the introductory panel, the in-page table of contents navigation, the rating card layout with colour-coded left-border accents, the "What This Means" sub-panels, and the special statuses section. Entirely new components with no impact on existing selectors makes this a MINOR increment.

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

*(Insert screenshot of homepage hero section here)*

The homepage opens with a full-width green hero section containing the primary search bar. The deep green colour (`#1b5e20`) was chosen deliberately because green is the universally recognised colour for food hygiene safety in the United Kingdom, matching the official Food Standards Agency rating sticker scheme used on physical food premises. This creates an immediate visual association between the application and the familiar badges found on the doors and windows of restaurants and takeaways.

The hero heading uses the Fraunces serif typeface at a large display size, providing a strong content hierarchy against the body text which uses DM Sans. The `<mark>` element around "Bristol" renders in a lighter green tint (`#66bb6a`) to draw the eye to the geographical context without disrupting the heading's visual flow. The search input and button are sized generously to ensure comfortable touch targets on mobile devices, satisfying NFR2.

Below the hero, a statistics bar shows the total number of rated businesses and the number awaiting inspection, populated in real time from the embedded dataset by `updateHomepageStats()` in `data.js`. These figures give users an immediate sense of dataset scale and reinforce transparency, which is a key business benefit identified in the project's business case.

---

### Colour-Coded Rating Badge System

*(Insert screenshot of rating badges across different pages here)*

One of the most deliberate styling decisions across the entire application is the colour-coded rating badge system. Each of the six rating levels (0 to 5) is assigned a distinct background colour defined as a CSS custom property in the `:root` block of `style.css`:

| Rating | Label | CSS Custom Property | Colour |
|---|---|---|---|
| 5 | Very Good | `--r5-bg` | `#1b5e20` (dark green) |
| 4 | Good | `--r4-bg` | `#2e7d32` (mid green) |
| 3 | Generally Satisfactory | `--r3-bg` | `#689f38` (olive green) |
| 2 | Improvement Necessary | `--r2-bg` | `#e65100` (deep orange) |
| 1 | Major Improvement Necessary | `--r1-bg` | `#bf360c` (dark orange-red) |
| 0 | Urgent Improvement Required | `--r0-bg` | `#b71c1c` (deep red) |

These colours form a perceptual gradient from safe (green) to urgent (red) that is immediately legible without requiring the user to read a label first. Colour is never used as the sole means of communicating rating information: every badge displays both the numeric score and the colour, and every result card also shows the textual label alongside it. This ensures the interface remains fully accessible to users with colour vision deficiencies, satisfying WCAG 2.1 Level AA requirements as stated in NFR3.

The badges are rendered as styled `<span>` elements with a `value` attribute set to the numeric rating. The CSS attribute selectors `[value="5"]`, `[value="4"]` and so on in `style.css` apply the correct background colour without any JavaScript involvement, keeping the styling layer cleanly separate from the behaviour layer.

---

### Search Results Page Layout

*(Insert screenshot of search results page here)*

The search results page uses the twelve-column CSS grid to create a two-column layout: a narrow filter sidebar on the left (approximately three grid columns wide) and the main results area on the right (approximately nine grid columns wide). This proportional split gives the filter panel enough space to display all filter options clearly without crowding the results, whilst keeping the result cards as the dominant visual element on the page.

Each result card is styled as a raised panel with a subtle box shadow (`0 2px 8px rgba(0,0,0,0.08)`), a white background, and a left border accent coloured to match the business's rating badge. On hover, the shadow deepens and the card lifts slightly with a `translateY(-2px)` transform, providing a clear visual affordance that the card is clickable. This transition was refined in `style.css` v3.2.0 to use a 150ms duration for a snappier, more responsive feel.

The active filter chips above the results list are styled as pill-shaped `<button>` elements with a light green background and a small removal icon. They give users immediate visual confirmation that a filter is active, and allow individual filters to be removed with a single click without scrolling back to the filter panel, satisfying FR7.

---

### Business Details Page

*(Insert screenshot of business details page here)*

The business details page uses the two-column grid layout. The left column contains an `<article>` card with the business name, the colour-coded rating badge rendered at a larger display size, the business type badge, the full address, and a structured `<dl>` of all twelve dataset fields. The right column displays the official FSA rating graphic loaded from the `RATING_GRAPHIC_URL` field, followed by a rating explanation panel listing all six levels with plain-language descriptions.

The three conditional notice panels are styled with distinct background colours chosen to match their semantic meaning without overlapping the rating badge colour system. The New Rating Pending notice uses an amber background (`#fff8e1`) to suggest caution; the Awaiting Inspection notice uses a purple-tinted background (`#ede7f6`) to convey a neutral holding state; and the Exempt notice uses a cool grey-blue (`#eceff1`) to indicate a permanent administrative status. These specific colour choices were made deliberately to ensure users cannot accidentally confuse a notice panel with a rating badge.

---

### Rating Guide Page

*(Insert screenshot of rating guide page here)*

The Rating Guide page uses a linear scroll layout with a green hero banner at the top, a sticky in-page table of contents, and six rating cards rendered as `<article>` elements inside an `<ol>`. Each card uses a thick left border accent in the same colour as that rating's badge, creating a strong visual link between the guide and the badges seen elsewhere in the application. A "What This Means" sub-panel inside each card uses a lighter tinted background and slightly smaller type to visually differentiate contextual explanation from the primary label and description.

The Special Statuses section at the bottom of the page uses a three-column card layout on desktop that stacks to a single column on mobile, matching the responsive behaviour applied throughout the rest of the application.

---

### Responsive Design

*(Insert screenshots of mobile and tablet layouts here)*

The stylesheet implements three responsive breakpoints. At desktop width (1024px and above), the full two-column and multi-column layouts are used throughout. At tablet width (768px to 1023px), the filter sidebar collapses to a horizontal strip above the results list, the business detail two-column layout stacks vertically, and card padding is reduced to suit intermediate viewport widths. At mobile width (below 768px), all multi-column layouts reflow to a single column, the navigation bar collapses into a hamburger toggle button, and font sizes and spacing are adjusted to remain legible and comfortable on small screens.

The mobile navigation toggle is implemented as a `<button>` with three `<span>` bars styled in CSS. The `aria-expanded` and `aria-label` attributes are updated by `main.js` in real time so that screen readers always announce the correct open or closed state.

---

## Evaluating and Improving Code Quality

### 1. JSLint Validation

All JavaScript modules were passed through JSLint with strict settings to identify potential code quality issues. Both modules achieved zero warnings and zero reports. This required several deliberate decisions:

All variable declarations in both modules use `var` rather than `const` or `let`. JSLint in its strictest mode does not permit block-scoped declarations in a script that targets maximum browser compatibility without a transpile step. Using `var` throughout ensures the code is valid under JSLint's expectations without suppressing any warnings.

The IIFE wrapper in `main.js` was specifically required by JSLint's rule against top-level variable declarations that could pollute the global namespace. Every function and variable in `main.js` is declared inside the IIFE, meaning nothing is exposed to the global scope.

All comparisons throughout both modules use `===` (strict equality) rather than `==` (loose equality). Early drafts used loose equality in a small number of places when comparing `OBJECTID` values (which are integers in the dataset but strings in URL parameters). These were identified by JSLint and corrected to use `String(record.OBJECTID) === String(id)`, which compares both sides as strings without type coercion.

---

### 2. Identifying and Resolving the Silent Dead Code Bug (`main.js` v1.2.0)

The most significant code quality issue identified during development was discovered through careful review of the filter chip removal logic. In the original version 1.0.0 of `main.js`, the handler for removing active filter chips read attribute names `data-remove-rating` and `data-remove-type` from each chip button. However, the chip buttons generated by `renderActiveChips()` in `data.js` actually used `data-group` and `data-value` as their attribute names. The result was that the removal handler was entirely non-functional: it would execute, find no attributes matching the names it expected, and return silently without any visible error, JavaScript exception, or console warning.

This category of bug is particularly difficult to catch because it produces no visible broken behaviour and no diagnostic output. It was identified by opening the browser developer tools, inspecting the generated HTML for a rendered chip button, and comparing the actual attribute names on the element against the attribute names the handler was attempting to read. Once identified, the fix was straightforward: the handler in `main.js` v1.2.0 was rewritten to read `data-group` and `data-value`, and the fragile per-chip `addEventListener` loop was replaced with a single event-delegated listener on the `.active-filters` container element. Event delegation is more robust in this context because re-rendering the chip list does not cause duplicate listeners to accumulate, and adding new types of chip in future requires no changes to the JavaScript handler.

---

### 3. Resolving the Layout Regression (`Search.html` v2.0.1 / `style.css` v3.2.0)

During the v3.2.0 visual polish pass on `style.css`, a regression was introduced in which the no-results state panel and the error state banner were rendered simultaneously alongside the results list rather than replacing it. The root cause was that the `display: none` default rules for `.no-results` and `.error-banner` had been accidentally removed during a selector reorganisation. Because `data.js` controls visibility of these panels by toggling `display` directly via JavaScript, the absence of a CSS default caused both panels to appear in their visible state on every page load regardless of whether data had been loaded or results found.

The fix was applied in two coordinated places: the `display: none` defaults were restored in `style.css` v3.2.0, and `Search.html` was incremented from v2.0.0 to v2.0.1 as a PATCH release to formally record that the rendered output of the page had changed. This dual-file fix illustrates the value of semantic versioning: it is possible to trace the regression to a specific version of a specific file, understand precisely what was changed and why, and confirm which PATCH release resolved it.

---

### 4. Removing the Server Dependency (`data.js` v3.0.0)

A known issue in `data.js` version 1.0.0 was that the application required a running local HTTP server to load the dataset. If the user opened the HTML file directly by double-clicking it in a file browser, the browser's CORS policy blocked the Fetch request for the CSV file, leaving the application with an empty dataset and a permanent error state with no recovery path other than restarting with a server running.

The fix applied in `data.js` v3.0.0 was to embed all 3,867 records directly as the `ALL_BUSINESSES` JavaScript array at the top of the file, eliminating the Fetch request entirely. The application now initialises from the embedded data synchronously on every load, regardless of whether it is served over HTTP or opened directly from the file system. Whilst this substantially increases the file size of `data.js`, the elimination of the infrastructure dependency makes the application significantly more robust and removes a common failure mode that would have been confusing for any user who tried to run the project without reading the setup documentation first.

---

### 5. Input Sanitisation Against XSS (`data.js` v3.0.0)

During a code review prior to version 3.0.0, it was identified that several functions in `data.js` were injecting dataset field values directly into `innerHTML` strings without sanitisation. This created a potential cross-site scripting (XSS) vulnerability: if any business name or address field in the dataset contained HTML special characters such as `<`, `>`, or `"`, the browser would interpret them as markup rather than literal text, potentially disrupting the layout or, in a more serious case, executing injected script content.

This was addressed by introducing the `escapeHTML()` utility function:

```javascript
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
```

This function replaces all five HTML special characters with their corresponding HTML entities before any value is inserted into the DOM. It is applied to every field of every record at the point of injection, ensuring that the dataset content is always treated as plain text regardless of what characters it contains. This satisfies the security requirement in NFR8 and protects the application against a well-known and preventable class of vulnerability.

---

### 6. Postcode Normalisation (`data.js` v3.0.0)

During testing of the search functionality, it was observed that users searching for a Bristol postcode such as `"BS1 1AA"` would receive no results if the business record stored the postcode without a space as `"BS11AA"`, even though the records were clearly the same location. This was a usability failure rather than a bug in the strict sense, but it produced incorrect results for a predictable user behaviour.

The fix introduced postcode normalisation as part of the `matchesBusiness()` function: both the search query and the record's postcode field are stripped of spaces and converted to lowercase before comparison. This means `"BS11AA"`, `"BS1 1AA"`, `"bs1 1aa"`, and `"bs11aa"` all match the same set of records. The change required no modification to the data itself and no structural changes to the module, making it a low-risk improvement with a direct positive impact on FR1 (searching by postcode).

---

## User Guide

### Overview

This user guide explains how to use the Bristol Food Hygiene Ratings web application. It covers both use cases defined in the requirements specification: UC1 (Search and Filter Food Hygiene Ratings) and UC2 (View Detailed Business Information and Understand Ratings). Each use case is demonstrated through a complete, tested scenario with step-by-step instructions.

The application requires no account creation or login. All features are accessible immediately upon opening the application in a web browser.

> **Prerequisites:** The application must be served via a local HTTP server. Open the project folder in VS Code and start Live Server, or run `npx serve` in the project root directory. Then navigate to `http://localhost:3000` (or the port shown in your terminal).

---

### UC1: Search and Filter Food Hygiene Ratings

**Scenario tested:** A user wants to find highly rated restaurants and cafes near Clifton in Bristol, filtered to show only businesses with a hygiene rating of 5.

#### Step 1: Open the Application Homepage

Open your browser and navigate to the application URL. The homepage (`index.html`) loads and displays the hero search section at the top of the page, containing the main search bar with the placeholder text `"Search by business name, postcode or address..."`. Below the hero, the Browse by Business Type section shows category tiles, and the What Do the Ratings Mean section displays the colour-coded rating badges from 5 to 0.

*(Insert screenshot of homepage here)*

**What is shown:** The full homepage with the hero search bar, statistics bar showing 3,268 Rated businesses and 443 Awaiting Inspection, six category tiles, and the rating summary section.

#### Step 2: Enter a Search Query

Click inside the search bar and type `clifton`. Then click the green Search button or press Enter.

*(Insert screenshot of search bar with "clifton" typed)*

**What happens:** The application validates that the input is not empty, then navigates to `Search.html` with the query parameter `?q=clifton` appended to the URL. The Search Results page loads and `data.js` immediately filters the in-memory dataset to find all records whose business name, address, or postcode contains the string `"clifton"` (case-insensitive).

#### Step 3: Review the Initial Search Results

The Search Results page displays all businesses matching the search term `"clifton"`. The results count label at the top of the results list shows the total number of matching records. Each result card displays the business name in bold, a colour-coded hygiene rating badge on the left, the business type label, the full address, the rating date, and a status badge in the lower-right corner of the card.

*(Insert screenshot of search results page showing unfiltered results for "clifton")*

**What is shown:** The full results list for `"clifton"` with the filter panel visible on the left and the paginated result cards on the right.

#### Step 4: Apply the Rating Filter

In the filter panel on the left side of the page, locate the Hygiene Rating section. Tick the checkbox labelled `5 - Very Good`. The results list updates immediately without reloading the page, and the results count label updates to reflect the smaller filtered set. An active filter chip labelled `"Rating: 5"` appears above the results list, confirming the filter is applied.

*(Insert screenshot showing the Rating: 5 checkbox ticked and the filter chip visible above the results)*

**What happens:** `data.js` re-runs the filter logic against the in-memory data, applying both the text search (`"clifton"`) and the rating filter (`5`) simultaneously, satisfying FR7.

#### Step 5: Apply the Business Type Filter

In the filter panel, locate the Business Type section. Tick the checkbox labelled `Restaurant/Cafe/Canteen`. The results list updates again immediately, and a second active filter chip labelled `"Type: Restaurant/Cafe/Canteen"` appears alongside the first chip. The results count label decreases further to reflect the combined filters.

*(Insert screenshot showing both filter chips active and the narrowed results list)*

**What is shown:** Only businesses in Clifton that are classified as Restaurant/Cafe/Canteen and hold a rating of 5 are displayed.

#### Step 6: No Results State (Variation)

If the combination of filters produces no matching records, the results container is replaced by the no-results state panel. This panel displays a message informing the user that no results were found and suggests broadening the search or adjusting the filters. The filter panel remains visible so the user can modify their selections without returning to the homepage.

*(Insert screenshot of the no-results state panel)*

**Requirement satisfied:** FR8.

#### Step 7: Remove a Filter Using the Filter Chip

Click the `x` icon on the `"Type: Restaurant/Cafe/Canteen"` filter chip above the results list. The type filter is removed immediately, the chip disappears, and the results list expands to show all Clifton businesses rated 5 regardless of business type.

*(Insert screenshot showing the type chip removed and the results list updated)*

#### Step 8: Error State (Variation)

If the CSV dataset cannot be loaded (for example, due to a network or server issue), the results container is replaced by the error state panel. This panel displays a warning message and a Retry button. Clicking Retry causes `data.js` to re-attempt the Fetch request without requiring a full page reload.

*(Insert screenshot of the error state panel with the Retry button)*

**Requirement satisfied:** NFR7.

---

### UC2: View Detailed Business Information and Understand Ratings

**Scenario tested:** The user clicks on a specific business from their filtered search results to view its full inspection record, understand its rating, and check whether any status notices apply.

#### Step 1: Click a Result Card

From the filtered search results produced in UC1 (Clifton, Rating: 5), click on any result card. The entire card is clickable. `data.js` appends the selected business's `OBJECTID` as a URL query parameter and navigates to `Business-Detail.html?id=[OBJECTID]`.

*(Insert screenshot of a result card with cursor indicating it is clickable)*

#### Step 2: View the Business Details Page

The Business Details page loads and displays the full inspection record for the selected business. The left column contains the business information card, which shows the large numeric rating score box (colour-coded dark green for a rating of 5), the business name in bold, the business type badge, the status badge showing `"Rated"` in green, and the full address in body text. Below the information card, a structured detail table presents every field from the dataset as a clearly labelled row.

*(Insert screenshot of the Business Details page showing the left column)*

**What is shown:** Business name, full address, postcode, business type, hygiene rating, rating date, rating status, and new rating pending indicator, satisfying FR11.

#### Step 3: View the Official Rating Graphic

The right column of the Business Details page displays the official Food Standards Agency (FSA) hygiene rating badge, loaded from the `RATING_GRAPHIC_URL` field in the dataset. This is the same green and black sticker design that is displayed on the doors and windows of physical food premises across the United Kingdom, providing a familiar visual reference for users.

*(Insert screenshot of the right column showing the official FSA rating graphic)*

**Requirement satisfied:** FR12. If the graphic fails to load, the application displays the numeric rating value as a styled fallback, satisfying FR13.

#### Step 4: Read the Rating Explanation Panel

Below the official graphic in the right column, the What Does This Rating Mean? panel lists all six rating levels from 5 to 0. Each level is shown with its colour-coded score badge and a plain-language description. For the selected business with a rating of 5, the panel highlights that this score means hygiene standards are very good and no improvement is necessary. A Full Guide link at the base of the panel navigates to the Rating Guide page for a more comprehensive explanation.

*(Insert screenshot of the rating explanation panel)*

**Requirement satisfied:** FR17.

#### Step 5: Conditional Notice: New Rating Pending (Variation)

If the selected business has a `NEW_RATING_PENDING` value of `True` in the dataset, a yellow notice panel is displayed below the two-column layout. This notice contains a hourglass icon and informs the user that the currently displayed rating may change soon because a new rating is pending publication.

*(Insert screenshot of the New Rating Pending notice panel)*

**Requirement satisfied:** FR15.

#### Step 6: Conditional Notice: Awaiting Inspection (Variation)

If the selected business has a `RATING_STATUS` of `AwaitingInspection`, the numeric rating badge is replaced with the label `"Awaiting Inspection"` and a purple notice panel is displayed below the layout. This notice explains clearly that the business has not yet been inspected and that no hygiene rating is currently available.

*(Insert screenshot of the Awaiting Inspection notice panel)*

**Requirement satisfied:** FR14.

#### Step 7: Conditional Notice: Exempt (Variation)

If the selected business has a `RATING_STATUS` of `Exempt`, a light blue notice panel is displayed explaining that this business is not required to participate in the Food Hygiene Rating Scheme and that no numeric rating will be assigned.

*(Insert screenshot of the Exempt notice panel)*

**Requirement satisfied:** FR16.

#### Step 8: Navigate to the Rating Guide

Click the Full Guide link in the rating explanation panel, or click Rating Guide in the navigation bar at the top of the page. The Rating Guide page loads and displays the full green hero banner, the introductory panel, all six rating level cards (each with a colour-coded badge, label, description, and "What This Means" sub-panel), and the Special Statuses section at the bottom with cards for Awaiting Inspection, New Rating Pending, and Exempt.

*(Insert screenshot of the Rating Guide page)*

**Requirement satisfied:** FR17.

#### Step 9: Return to Search Results

Click the Back to Results button at the top of the Business Details page (above the two-column layout). The application navigates back to `Search.html` with the previous search query and filter state preserved in the URL query parameters. The same filtered results are displayed exactly as they were before the user navigated to the details page.

*(Insert screenshot of the Back to Results button and the restored results page)*

**What this demonstrates:** Page-to-page state is preserved via URL query parameters, meaning the user does not need to re-enter their search or re-apply their filters after viewing a business's details. This satisfies the design decision documented in the design phase: "Back to Results preserves filter and search state."
