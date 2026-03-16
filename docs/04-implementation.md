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
  - [Component Interaction](#component-interaction)
  - [Design Patterns and Principles Applied](#design-patterns-and-principles-applied)
- [Bristol Open Data API](#bristol-open-data-api)
  - [Data Source Overview](#data-source-overview)
  - [Query 1 — Full Dataset Load](#query-1--full-dataset-load)
  - [Query 2 — Text Search Filter (Client-Side)](#query-2--text-search-filter-client-side)
  - [Query 3 — Rating Filter (Client-Side)](#query-3--rating-filter-client-side)
  - [Query 4 — Business Type Filter (Client-Side)](#query-4--business-type-filter-client-side)
  - [Query 5 — Single Record Lookup by ID (Client-Side)](#query-5--single-record-lookup-by-id-client-side)
  - [UML Class Diagram](#uml-class-diagram)
- [User Guide](#user-guide)
  - [Overview](#overview)
  - [UC1: Search and Filter Food Hygiene Ratings](#uc1-search-and-filter-food-hygiene-ratings)
  - [UC2: View Detailed Business Information and Understand Ratings](#uc2-view-detailed-business-information-and-understand-ratings)

---

## Introduction

### System Overview

The Bristol Food Hygiene Ratings web application is a client-side, multi-page web application (MPA) built entirely using HTML5, CSS3, and vanilla JavaScript. It provides members of the public with a simple, accessible, and mobile-responsive interface for searching, filtering, and viewing the official food hygiene ratings for food businesses across Bristol. The application loads data from a locally bundled CSV dataset sourced from the Open Bristol open data portal and requires no back-end server, no database, and no user authentication of any kind.

The application consists of four pages:

- **Homepage (`index.html`)** — provides the primary search interface, a Browse by Business Type category section, and a rating summary panel.
- **Search Results Page (`Search.html`)** — displays paginated, filterable lists of business cards with a sidebar filter panel for hygiene rating and business type.
- **Business Details Page (`Business-Detail.html`)** — presents the full inspection record for a selected business, including the official FSA rating graphic, a structured data table, and conditional status notice panels.
- **Rating Guide Page (`Rating-Guide.html`)** — explains the meaning of every rating score (0 to 5) and every special status category in plain language.

The current release is **version 1.0.0**, following semantic versioning conventions structured as `MAJOR.MINOR.PATCH`. Version 1.0.0 represents the first stable, fully functional public release of all planned features. No breaking changes have been introduced since development began. Future updates that add new functionality without breaking existing behaviour would increment the MINOR version (for example, `1.1.0`), whilst bug fixes or small improvements to existing features would increment the PATCH version (for example, `1.0.1`).

---

### Dataset Description

The dataset used by this application is the **Bristol Food Hygiene Ratings** dataset obtained from the [Open Bristol open data portal](https://opendata.bristol.gov.uk). It is provided in CSV format (`Food_Hygiene_Ratings.csv`) and contains **3,871 records**, each representing a registered food business in the Bristol area. The dataset is loaded at runtime by `data.js` using the Fetch API and parsed from CSV into a structured array of JavaScript objects for use throughout the application.

Each record in the dataset contains the following twelve fields:

| Field Name | Data Type | Description |
|---|---|---|
| `X` | Float | Easting coordinate (British National Grid) |
| `Y` | Float | Northing coordinate (British National Grid) |
| `OBJECTID` | Integer | Unique numeric identifier for each record |
| `BUSINESS_NAME` | String | Trading name of the food business |
| `ADDRESS` | String | Full street address including area and city |
| `BUSINESS_TYPE` | String | Category of business (14 distinct types in the dataset) |
| `RATING` | Integer / Empty | Hygiene rating score from 0 to 5; empty if the business is unrated |
| `RATING_STATUS` | String | One of: `Rated`, `AwaitingInspection`, `AwaitingPublication`, or `Exempt` |
| `NEW_RATING_PENDING` | Boolean | Whether a new rating is currently pending publication (`True` or `False`) |
| `RATING_DATE` | Datetime / Empty | Date of the most recent inspection; empty if no inspection has taken place |
| `POSTCODE` | String | Postal code of the business premises |
| `RATING_GRAPHIC_URL` | URL String | URL of the official FSA rating badge image hosted on `ratings.food.gov.uk` |

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

Of the 603 unrated businesses, **443** are marked as `AwaitingInspection` meaning they have not yet received their first inspection, **159** are classified as `Exempt` from the rating scheme, and **1** record is marked as `AwaitingPublication`.

The dataset includes **14 distinct business type categories**: Restaurant/Cafe/Canteen, Takeaway/sandwich shop, Pub/bar/nightclub, Retailers - other, Retailers - supermarkets/hypermarkets, Hotel/bed and breakfast/guest house, School/college/university, Mobile caterer, Manufacturers/packers, Hospitals/Childcare/Caring Premises, Other catering premises, Distributors/Transporters, Farmers/growers, and Importers/Exporters.

---

### Known Issues

The following known issues exist in the current implementation.

**Issue 1 — External Rating Graphic URLs**

The official FSA rating badge images referenced by the `RATING_GRAPHIC_URL` field are hosted on an external domain (`ratings.food.gov.uk`). If this external domain is unavailable or the image URLs change in a future FSA website update, the badge images will not load. This is handled gracefully by the application: a fallback mechanism displays the numeric rating value as styled text if the image fails to load, satisfying functional requirement FR13.

**Issue 2 — CSV Loading Requires an HTTP Server**

The dataset is loaded at runtime via the Fetch API. If the application is opened by double-clicking the HTML file directly in a browser using the `file://` protocol, the browser will block the Fetch request due to same-origin CORS restrictions. The application must therefore be served via a local HTTP server using `serve.json` and a static file server such as the VS Code Live Server extension to function correctly. This is documented clearly in the project's setup instructions.

**Issue 3 — Unrated Businesses**

A total of 603 records in the dataset have an empty `RATING` field. These records carry a `RATING_STATUS` of `AwaitingInspection`, `Exempt`, or `AwaitingPublication`. The application handles each of these three statuses explicitly by displaying a clearly labelled status indicator and rendering the appropriate conditional notice panel on the Business Details page, rather than leaving a blank or potentially confusing value visible to the user.

**Issue 4 — Static Dataset**

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
| `Search.html` | HTML Page | The Search Results page. Renders the filter panel (Hygiene Rating and Business Type checkboxes), the paginated results list of business cards, and both the empty-state and error-state panels. Receives the search query and any pre-applied filters via URL query parameters from the homepage. |
| `Business-Detail.html` | HTML Page | The Business Details page. Displays the full inspection record for a single selected business, including the official rating graphic, all dataset fields in a structured table, the rating explanation panel, and the three conditional notice panels (New Rating Pending, Awaiting Inspection, and Exempt). |
| `Rating-Guide.html` | HTML Page | The Rating Guide page. Provides a comprehensive explanation of all six numeric hygiene rating scores and the three special status categories, helping users correctly interpret the information displayed throughout the application. |
| `main.js` | JavaScript Module | The primary application logic module. Handles DOM manipulation, search and filter event listeners, result rendering, pagination controls, URL query parameter parsing, and page-to-page state passing. Coordinates with `data.js` to retrieve and filter dataset records. |
| `data.js` | JavaScript Module | The data access module. Responsible for loading the CSV dataset via the Fetch API, parsing the raw CSV text (including BOM stripping and column header extraction) into a structured JavaScript array, and exposing the parsed data to `main.js`. Centralising all data loading here ensures `main.js` remains focused entirely on presentation logic. |
| `style.css` | CSS Stylesheet | The global stylesheet shared across all four pages. Defines CSS custom property variables for the design system (colours, spacing, border radii, shadows), the twelve-column CSS grid layout, all responsive media query breakpoints (desktop, tablet, mobile), and the styles for every reusable component including the navigation bar, footer, rating badge, status badge, result cards, and filter panel. |
| `Food_Hygiene_Ratings.csv` | CSV Dataset | The Bristol Food Hygiene Ratings dataset containing 3,871 business records with twelve fields per record. Loaded at runtime by `data.js`. |
| `serve.json` | JSON Configuration | Static file server configuration. Ensures the application is served over HTTP during local development so that the Fetch API can load the CSV dataset without CORS errors. |
| `.vscode/launch.json` | JSON Configuration | VS Code debugger launch configuration. Defines the local server launch settings so the developer can start a live server instance directly from the editor. |
| `assets/` | Directory | Contains all static media assets, including the application logo and the illustration icons used in the Browse by Business Type category tiles on the homepage. |

---

### JSLint Warnings Summary

All JavaScript modules were validated using JSLint to assess code quality and identify any potential issues. The table below records the number of warnings and reports generated for each module.

| Module File | Type | JSLint Warnings | JSLint Reports | Notes |
|---|---|---|---|---|
| `main.js` | JavaScript | 0 | 0 | All variables declared with `const` or `let`. Strict equality (`===`) used throughout. No unused variables or undeclared globals. |
| `data.js` | JavaScript | 0 | 0 | Fetch and CSV parsing logic fully conforms to JSLint requirements. |

---

## Software Architecture

### Architectural Style

The application follows a **client-side, multi-page application (MPA)** architectural style. All processing, data loading, filtering, and rendering is performed entirely in the user's browser using JavaScript. No server-side rendering, back-end API, or database is involved. This approach was chosen because the dataset is small enough to be loaded in its entirety into browser memory at runtime, and because a purely static architecture aligns with the open-data context of the project: the application can be deployed to any static hosting environment with no server-side infrastructure required.

Within this client-side architecture, the application applies a **separation of concerns** design pattern by dividing responsibilities across two distinct JavaScript modules. The data access layer (`data.js`) handles all data loading and parsing operations in isolation, whilst the presentation layer (`main.js`) handles all DOM interaction, event handling, and result rendering. This means that any future change to the data source format — for example if the Open Bristol dataset were to change its column names or switch from CSV to JSON — would require changes only to `data.js` and would leave `main.js` entirely untouched.

Navigation between the four pages is handled through standard HTML hyperlinks. Page-to-page state (such as the selected business's `OBJECTID`, the current search term, and any active filters) is passed via **URL query parameters**, ensuring that users can bookmark or share a specific search result or business detail page directly.

---

### Major Components

The application is composed of five major components, each with a clearly defined and separate responsibility.

#### 1. Data Access Component (`data.js`)

This component forms the data layer of the application. It is responsible for issuing an asynchronous Fetch API request to retrieve the CSV dataset file, parsing the raw CSV text into a structured JavaScript array of objects, and making that array available to the rest of the application. The parsing logic handles the UTF-8 BOM character at the start of the file, splits the file content into rows, extracts the column headers from the first row, and maps each subsequent data row into a named-field JavaScript object. By encapsulating all knowledge of the CSV format and file location inside this single module, no other part of the application needs to understand the raw data structure directly.

#### 2. Presentation and Logic Component (`main.js`)

This is the primary application logic module. On each page load, it reads the current URL query parameters to determine the active search term, selected filters, and (on the Business Details page) the selected business ID. It then calls `data.js` to retrieve the full dataset, applies the relevant text search and filter logic to produce a filtered subset of records, and renders the results as dynamically generated HTML into the appropriate container elements in the DOM. It also attaches event listeners to all interactive controls (search input, filter checkboxes, pagination buttons, and navigation links) and handles transitions between pages by constructing URL query strings containing the necessary state before navigating.

#### 3. View Layer (HTML Pages)

The four HTML pages form the view layer of the application. Each page provides the structural HTML skeleton, including the shared navigation bar, the page-specific content containers (such as the results list `div`, the filter panel, and the business detail card), and the shared footer. The pages contain no inline JavaScript logic. All behaviour is injected by `main.js` and `data.js`, which are linked via `<script>` tags at the end of each page's `<body>`. This clean separation between structure (HTML) and behaviour (JavaScript) satisfies non-functional requirement NFR10 and makes the codebase significantly easier to maintain and extend.

#### 4. Style Layer (`style.css`)

A single shared stylesheet serves all four pages. It defines CSS custom properties (variables) for every design system token, including the primary green colour palette, typography settings, border radii, card shadow values, and spacing increments. It implements the twelve-column CSS grid layout used across all pages, and defines three responsive breakpoints using CSS media queries: desktop (1024px and above), tablet (768px to 1023px), and mobile (below 768px). Using a single shared stylesheet ensures complete visual consistency across all pages and means that any design system change needs to be made in only one place.

#### 5. Configuration Layer (`serve.json` and `launch.json`)

The configuration layer consists of two JSON files that configure the local development environment. `serve.json` ensures that the application is served over HTTP rather than the `file://` protocol, which is required for the Fetch API to load the CSV dataset without triggering browser CORS restrictions. `launch.json` configures VS Code to launch the local server automatically when the project is opened for development. Neither file contains any application logic.

---

### Component Interaction

> *(See UML component interaction diagram in project documentation)*

The runtime data flow operates as follows. When a user loads a page, the browser parses the HTML file and executes the linked scripts. On the Search Results page, `main.js` calls `data.js`, which issues a Fetch request for the CSV file and returns the parsed data array asynchronously. Once the data is available, `main.js` reads the URL query parameters, applies any active search and filter criteria to the data array, and renders matching records as HTML result cards into the results container. Filter checkbox interactions trigger event listeners that re-apply the filter logic and re-render the results list without performing a full page reload. When the user selects a result card, `main.js` appends the business's `OBJECTID` to the URL as a query parameter and navigates to `Business-Detail.html`, where the same process runs and uses the `OBJECTID` to locate and render the correct record from the dataset.

---

### Design Patterns and Principles Applied

| Pattern / Principle | Where Applied | Benefit |
|---|---|---|
| **Separation of Concerns** | `data.js` (data layer) vs `main.js` (presentation layer) vs HTML (structure) vs CSS (style) | Each concern can be modified independently without affecting the others |
| **Single Responsibility** | `data.js` has one job: load and parse the dataset. `main.js` is focused on UI logic only. | Keeps each module focused, readable, and straightforward to test |
| **URL as State** | Search term, active filters, and business ID passed via URL query parameters between pages | Allows users to bookmark or share a specific search or business detail URL |
| **Progressive Enhancement** | Rating badge falls back to numeric text if the external FSA graphic URL fails to load | Ensures the application remains fully usable even when external resources are unavailable |
| **Responsive Design** | CSS media queries in `style.css` adapt the layout for desktop, tablet, and mobile viewports | Satisfies NFR2 and ensures the application is accessible across all device types |
| **DRY (Don't Repeat Yourself)** | Shared navigation bar, footer, stylesheet, and reusable component styles defined once and applied consistently across all four pages | Reduces duplication and ensures any change to a shared element propagates to every page automatically |

---

## Bristol Open Data API

### Data Source Overview

The Bristol Food Hygiene Ratings application retrieves its data from the Open Bristol open data portal, which publishes the Food Hygiene Ratings dataset as a publicly accessible, downloadable CSV file. Unlike a traditional REST API that accepts query parameters and returns filtered JSON responses, the Open Bristol data source provides the complete dataset as a single flat-file export. The application therefore implements its own **client-side query layer**: the full dataset is loaded once at application startup by `data.js`, parsed into a structured JavaScript array, and all search, filter, and lookup operations are then performed in memory by `main.js` without making any further network requests.

This architectural decision was made deliberately. Loading the entire dataset once and filtering it in memory is significantly more efficient for this use case than issuing a separate HTTP request for every search or filter interaction, particularly given that the dataset contains only 3,871 records, which is well within the memory capacity of any modern browser. It also means the application continues to function correctly in offline or low-connectivity conditions once the initial data load has completed.

---

### Query 1 — Full Dataset Load

**Purpose:** Retrieve all 3,871 food hygiene rating records from the Open Bristol dataset to populate the application's in-memory data store.

**Triggered by:** Application startup on `Search.html` and `Business-Detail.html`, immediately when `main.js` executes.

**Implementation (`data.js`):**

```javascript
async function loadData() {
    const response = await fetch('Food_Hygiene_Ratings.csv');
    const text = await response.text();
    return parseCSV(text);
}
```

**Data returned:** All 3,871 records, each containing the twelve fields documented in the Introduction section: `OBJECTID`, `BUSINESS_NAME`, `ADDRESS`, `BUSINESS_TYPE`, `RATING`, `RATING_STATUS`, `NEW_RATING_PENDING`, `RATING_DATE`, `POSTCODE`, `RATING_GRAPHIC_URL`, `X`, and `Y`.

**Error handling:** If the Fetch request fails (for example, because the application has been opened via the `file://` protocol rather than a local HTTP server), `data.js` catches the rejection and `main.js` renders the error state panel, displaying a user-friendly message and a Retry button rather than leaving the user with a blank or broken page. This satisfies NFR7.

---

### Query 2 — Text Search Filter (Client-Side)

**Purpose:** Filter the in-memory dataset to return only the records whose `BUSINESS_NAME`, `ADDRESS`, or `POSTCODE` fields contain the user's search term.

**Triggered by:** The user submitting a search query via the search bar on `index.html` or `Search.html`.

**Implementation (`main.js`):**

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

### Query 3 — Rating Filter (Client-Side)

**Purpose:** Further filter the dataset (or the search results subset) to return only records whose `RATING` field matches one or more of the user's selected rating values.

**Triggered by:** The user selecting or deselecting a Hygiene Rating checkbox in the filter panel on `Search.html`.

**Implementation (`main.js`):**

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

### Query 4 — Business Type Filter (Client-Side)

**Purpose:** Further filter the dataset to return only records whose `BUSINESS_TYPE` field matches one or more of the user's selected business type categories.

**Triggered by:** The user selecting or deselecting a Business Type checkbox in the filter panel on `Search.html`.

**Implementation (`main.js`):**

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

### Query 5 — Single Record Lookup by ID (Client-Side)

**Purpose:** Retrieve the full data record for a single specific business to populate the Business Details page.

**Triggered by:** The user clicking a result card on `Search.html`, which navigates to `Business-Detail.html` with the selected business's `OBJECTID` appended as a URL query parameter (for example, `Business-Detail.html?id=42`). On page load, `main.js` reads this parameter and performs the lookup.

**Implementation (`main.js`):**

```javascript
function getRecordById(data, id) {
    return data.find(record => String(record.OBJECTID) === String(id));
}
```

**Data returned:** A single JavaScript object representing the complete record for the selected business, containing all twelve dataset fields. If no matching record is found (for example, if the URL parameter has been manually altered to an invalid value), `main.js` renders a user-friendly not-found message rather than throwing an unhandled error.

---

### UML Class Diagram

> *(See UML class diagram in project documentation)*

The UML class diagram represents the structure of the JavaScript data objects produced by `data.js` after parsing the CSV dataset. Each parsed record is represented as a plain JavaScript object conforming to the structure shown. The `DataLoader` class encapsulates the Fetch and parsing logic, and the `AppController` class (represented by `main.js`) holds a reference to the loaded array of `FoodBusinessRecord` objects and exposes the four query methods documented above.

---

## User Guide

### Overview

This user guide explains how to use the Bristol Food Hygiene Ratings web application. It covers both use cases defined in the requirements specification: **UC1** (Search and Filter Food Hygiene Ratings) and **UC2** (View Detailed Business Information and Understand Ratings). Each use case is demonstrated through a complete, tested scenario with step-by-step instructions.

The application requires no account creation or login. All features are accessible immediately upon opening the application in a web browser.

> **Prerequisites:** The application must be served via a local HTTP server. Open the project folder in VS Code and start Live Server, or run `npx serve` in the project root directory. Then navigate to `http://localhost:3000` (or the port shown in your terminal).

---

### UC1: Search and Filter Food Hygiene Ratings

**Scenario tested:** A user wants to find highly-rated restaurants and cafes near Clifton in Bristol, filtered to show only businesses with a hygiene rating of 5.

#### Step 1 — Open the Application Homepage

Open your browser and navigate to the application URL. The homepage (`index.html`) loads and displays the hero search section at the top of the page, containing the main search bar with the placeholder text *"Search by business name, postcode or address..."*. Below the hero, the Browse by Business Type section shows category tiles, and the What Do the Ratings Mean section displays the colour-coded rating badges from 5 to 0.

> *(Insert screenshot of homepage here)*

**What is shown:** The full homepage with the hero search bar, statistics bar showing 3,268 Rated businesses and 443 Awaiting Inspection, six category tiles, and the rating summary section.

#### Step 2 — Enter a Search Query

Click inside the search bar and type `clifton`. Then click the green **Search** button or press **Enter**.

> *(Insert screenshot of search bar with "clifton" typed)*

**What happens:** The application validates that the input is not empty, then navigates to `Search.html` with the query parameter `?q=clifton` appended to the URL. The Search Results page loads and `main.js` immediately filters the in-memory dataset to find all records whose business name, address, or postcode contains the string `"clifton"` (case-insensitive).

#### Step 3 — Review the Initial Search Results

The Search Results page displays all businesses matching the search term `"clifton"`. The results count label at the top of the results list shows the total number of matching records. Each result card displays the business name in bold, a colour-coded hygiene rating badge on the left, the business type label, the full address, the rating date, and a status badge in the lower-right corner of the card.

> *(Insert screenshot of search results page showing unfiltered results for "clifton")*

**What is shown:** The full results list for `"clifton"` with the filter panel visible on the left and the paginated result cards on the right.

#### Step 4 — Apply the Rating Filter

In the filter panel on the left side of the page, locate the **Hygiene Rating** section. Tick the checkbox labelled **5 - Very Good**. The results list updates immediately without reloading the page, and the results count label updates to reflect the smaller filtered set. An active filter chip labelled *"Rating: 5"* appears above the results list, confirming the filter is applied.

> *(Insert screenshot showing the Rating: 5 checkbox ticked and the filter chip visible above the results)*

**What happens:** `main.js` re-runs the filter logic against the in-memory data, applying both the text search (`"clifton"`) and the rating filter (`5`) simultaneously, satisfying FR7.

#### Step 5 — Apply the Business Type Filter

In the filter panel, locate the **Business Type** section. Tick the checkbox labelled **Restaurant/Cafe/Canteen**. The results list updates again immediately, and a second active filter chip labelled *"Type: Restaurant/Cafe/Canteen"* appears alongside the first chip. The results count label decreases further to reflect the combined filters.

> *(Insert screenshot showing both filter chips active and the narrowed results list)*

**What is shown:** Only businesses in Clifton that are classified as Restaurant/Cafe/Canteen and hold a rating of 5 are displayed.

#### Step 6 — No Results State (Variation)

If the combination of filters produces no matching records, the results container is replaced by the **no-results state panel**. This panel displays a message informing the user that no results were found and suggests broadening the search or adjusting the filters. The filter panel remains visible so the user can modify their selections without returning to the homepage.

> *(Insert screenshot of the no-results state panel)*

**Requirement satisfied:** FR8.

#### Step 7 — Remove a Filter Using the Filter Chip

Click the **×** icon on the *"Type: Restaurant/Cafe/Canteen"* filter chip above the results list. The type filter is removed immediately, the chip disappears, and the results list expands to show all Clifton businesses rated 5 regardless of business type.

> *(Insert screenshot showing the type chip removed and the results list updated)*

#### Step 8 — Error State (Variation)

If the CSV dataset cannot be loaded (for example, due to a network or server issue), the results container is replaced by the **error state panel**. This panel displays a warning message and a **Retry** button. Clicking Retry causes `data.js` to re-attempt the Fetch request without requiring a full page reload.

> *(Insert screenshot of the error state panel with the Retry button)*

**Requirement satisfied:** NFR7.

---

### UC2: View Detailed Business Information and Understand Ratings

**Scenario tested:** The user clicks on a specific business from their filtered search results to view its full inspection record, understand its rating, and check whether any status notices apply.

#### Step 1 — Click a Result Card

From the filtered search results produced in UC1 (Clifton, Rating: 5), click on any result card. The entire card is clickable. `main.js` appends the selected business's `OBJECTID` as a URL query parameter and navigates to `Business-Detail.html?id=[OBJECTID]`.

> *(Insert screenshot of a result card with cursor indicating it is clickable)*

#### Step 2 — View the Business Details Page

The Business Details page loads and displays the full inspection record for the selected business. The left column contains the business information card, which shows the large numeric rating score box (colour-coded dark green for a rating of 5), the business name in bold, the business type badge, the status badge showing *"Rated"* in green, and the full address in body text. Below the information card, a structured detail table presents every field from the dataset as a clearly labelled row.

> *(Insert screenshot of the Business Details page showing the left column)*

**What is shown:** Business name, full address, postcode, business type, hygiene rating, rating date, rating status, and new rating pending indicator, satisfying FR11.

#### Step 3 — View the Official Rating Graphic

The right column of the Business Details page displays the official Food Standards Agency (FSA) hygiene rating badge, loaded from the `RATING_GRAPHIC_URL` field in the dataset. This is the same green and black sticker design that is displayed on the doors and windows of physical food premises across the United Kingdom, providing a familiar visual reference for users.

> *(Insert screenshot of the right column showing the official FSA rating graphic)*

**Requirement satisfied:** FR12. If the graphic fails to load, the application displays the numeric rating value as a styled fallback, satisfying FR13.

#### Step 4 — Read the Rating Explanation Panel

Below the official graphic in the right column, the **What Does This Rating Mean?** panel lists all six rating levels from 5 to 0. Each level is shown with its colour-coded score badge and a plain-language description. For the selected business with a rating of 5, the panel highlights that this score means hygiene standards are very good and no improvement is necessary. A **Full Guide** link at the base of the panel navigates to the Rating Guide page for a more comprehensive explanation.

> *(Insert screenshot of the rating explanation panel)*

**Requirement satisfied:** FR17.

#### Step 5 — Conditional Notice: New Rating Pending (Variation)

If the selected business has a `NEW_RATING_PENDING` value of `True` in the dataset, a **yellow notice panel** is displayed below the two-column layout. This notice contains a hourglass icon and informs the user that the currently displayed rating may change soon because a new rating is pending publication.

> *(Insert screenshot of the New Rating Pending notice panel)*

**Requirement satisfied:** FR15.

#### Step 6 — Conditional Notice: Awaiting Inspection (Variation)

If the selected business has a `RATING_STATUS` of `AwaitingInspection`, the numeric rating badge is replaced with the label *"Awaiting Inspection"* and a **purple notice panel** is displayed below the layout. This notice explains clearly that the business has not yet been inspected and that no hygiene rating is currently available.

> *(Insert screenshot of the Awaiting Inspection notice panel)*

**Requirement satisfied:** FR14.

#### Step 7 — Conditional Notice: Exempt (Variation)

If the selected business has a `RATING_STATUS` of `Exempt`, a **light blue notice panel** is displayed explaining that this business is not required to participate in the Food Hygiene Rating Scheme and that no numeric rating will be assigned.

> *(Insert screenshot of the Exempt notice panel)*

**Requirement satisfied:** FR16.

#### Step 8 — Navigate to the Rating Guide

Click the **Full Guide** link in the rating explanation panel, or click **Rating Guide** in the navigation bar at the top of the page. The Rating Guide page (`Rating-Guide.html`) loads and displays the full green hero banner, the introductory panel, all six rating level cards (each with a colour-coded badge, label, description, and *"What This Means"* sub-panel), and the Special Statuses section at the bottom with cards for Awaiting Inspection, New Rating Pending, and Exempt.

> *(Insert screenshot of the Rating Guide page)*

**Requirement satisfied:** FR17, UC2 Step 4.

#### Step 9 — Return to Search Results

Click the **Back to Results** button at the top of the Business Details page (above the two-column layout). The application navigates back to `Search.html` with the previous search query and filter state preserved in the URL query parameters. The same filtered results are displayed exactly as they were before the user navigated to the details page.

> *(Insert screenshot of the Back to Results button and the restored results page)*

**What this demonstrates:** Page-to-page state is preserved via URL query parameters, meaning the user does not need to re-enter their search or re-apply their filters after viewing a business's details. This satisfies the design decision documented in the design phase: *"Back to Results preserves filter and search state."*
