# Bristol Food Hygiene Ratings Web Application

## Phase 3 — Design Document

### UFCF9F-30-1 Software Engineering Portfolio

| Field | Details |
|------|--------|
| Module | UFCF9F-30-1 — Software Engineering Portfolio |
| Phase | Phase 3 — Design |
| Application | Bristol Food Hygiene Ratings Web Application |
| Data Source | Open Bristol / Food Standards Agency |
| Document Date | March 2026 |
| Design Tool | Figma (Wireframes and High-Fidelity Mockups) |

---

# 3.1 Introduction to the Design Phase

The design phase of the Bristol Food Hygiene Ratings web application bridges the gap between the requirements specification produced in Phase 2 and the implementation work that follows in Phase 4. The purpose of this phase is to translate the functional and non-functional requirements into a clear, structured, and professionally presented visual blueprint for the application before any code is written.

This document presents three interconnected design artefacts.

First, a wireflow diagram maps out every screen in the application alongside all navigation paths, user interactions, and edge-case states.

Second, high-fidelity desktop mockups present the final visual design including colour scheme, typography, spacing, and all interface components.

Third, the overall user interface architecture is described in terms of grid layout, component structure, and design rationale.

The design process followed an iterative and user-centred approach. Low-fidelity wireframes were produced first to plan the structure and navigation of each page. These were then connected into a full wireflow diagram to validate every user journey before any visual styling decisions were made.

Once the structure and navigation were confirmed, high-fidelity mockups were produced applying the full design system. This progression from structure to style reduced the risk of costly changes at the implementation stage.

All design artefacts were produced in Figma. The complete wireflow diagram and all high-fidelity mockups are available in full resolution at the following link:

**Figma Design File:**  
https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?node-id=2071-507&t=36W43D7d1QbB3XwJ-1

---

# 3.2 Wireflow Diagram

## 3.2.1 What is a Wireflow and Why Was One Produced?

A wireflow is a design technique that combines wireframes with a user flow diagram. A wireframe is a low-fidelity structural representation of a single screen, showing the position of interface elements without any visual styling. A user flow diagram shows how a user navigates between screens through their actions and decisions.

By combining both into a single wireflow, it is possible to understand the entire application as a connected system rather than as a collection of isolated pages.

Unlike a simple wireframe, a wireflow makes it possible to see every navigation path, every error and edge-case state, and every same-page interaction in one unified view. This is particularly valuable for validating that the design addresses all of the use cases and functional requirements identified in the requirements specification before implementation begins.

The wireflow for this application was produced in Figma and covers all four pages:

- Homepage
- Search Results Page
- Business Details Page
- Rating Guide Page

Every connection between pages is annotated to explain what user action triggers it, ensuring that the diagram is self-explanatory and can be read without prior knowledge of the application.

---

## 3.2.2 Wireflow Legend and Visual Notation

The wireflow uses a consistent visual notation system to distinguish between different types of interactions and navigation paths.

| Arrow / Annotation Type | Colour | Meaning |
|---|---|---|
| Primary navigation arrow | Green solid | The user clicks an interactive element and moves to a new page |
| Navigation bar link arrow | Blue dashed | A navigation bar link available from every page at any time |
| Back / return arrow | Grey dashed | The user returns to the previous page without losing their current state |
| Validation or error arrow | Red solid | The user stays on the same page and a validation message or error notice is displayed |
| Same-page interaction arrow | Black solid | The user stays on the current page but the content updates |
| Annotation box | Yellow filled rectangle | Informational note highlighting behaviour or design decisions |

---

## 3.2.3 Wireflow Diagram Screenshots

The following screenshots present the complete wireflow diagram as captured from Figma.

### View 1 — Homepage and Search Results Page

This view shows the Homepage and Search Results Page positioned side by side, with all navigation connections between them annotated.

The green arrows trace the primary user journey:

- User arrives on the Homepage
- User enters a search query
- User arrives at the Search Results Page

A red arrow illustrates the validation path where the user submits an empty search field and remains on the Homepage with a validation message.

Green arrows also show that clicking any category tile on the Homepage navigates to the Search Results Page with that business type filter pre-applied.

**Show Image**

---

### View 2 — Search Results Page and Business Details Page

This view focuses on the connection between the Search Results Page and the Business Details Page.

- Green arrow: clicking a result card opens the Business Details Page
- Grey dashed arrow: Back to Results navigation

The Back to Results link returns the user to the results list without resetting their search query or applied filters.

---

### View 3 — Business Details Page (Detailed View)

This view presents the Business Details Page in isolation with all conditional status notices visible for documentation purposes.

The notices shown are:

- New Rating Pending
- Awaiting Inspection
- Exempt from Rating

This view maps to:

- Use Case: **UC2**
- Functional Requirements: **FR14, FR15, FR16**

---

### View 4 — Rating Guide Page and Wireflow Legend

The Rating Guide is reachable from three entry points:

- Navigation bar on every page
- View Full Guide button on the Homepage
- Full Guide link on the Business Details Page

---

### View 5 — Rating Guide Page and Legend (Close-up)

This view presents the Rating Guide Page content and the full wireflow legend in greater detail.

It also shows the footer including:

- Certification logos
- Quick Links column
- Legal column

---

## 3.2.4 Complete Navigation Map

| From Page | User Action | To Page / State |
|---|---|---|
| Homepage | Submits valid search query | Search Results Page |
| Homepage | Submits empty search field | Validation message |
| Homepage | Clicks a category tile | Search Results Page (filtered) |
| Homepage | Clicks View Full Guide | Rating Guide Page |
| Homepage | Clicks Search in navigation bar | Search Results Page |
| Homepage | Clicks Detail in navigation bar | Business Details Page |
| Homepage | Clicks Rating Guide in navigation bar | Rating Guide Page |
| Search Results | Clicks a result card | Business Details Page |
| Search Results | Applies a filter checkbox | Results update in place |
| Search Results | Clicks Retry | Data reload attempted |
| Search Results | Clicks View Full Guide | Rating Guide Page |
| Search Results | Clicks Logo or Home | Homepage |
| Business Details | Clicks Back to Results | Search Results (state preserved) |
| Business Details | Clicks Full Guide link | Rating Guide Page |
| Rating Guide | Clicks navigation link | Corresponding page |
| Any page | Clicks Logo | Homepage |

---

## 3.2.5 Wireflow to Use Case Mapping

| Use Case | Screens Involved | User Journey | Functional Requirements |
|---|---|---|---|
| UC1 — Search | Homepage, Search Results | User enters query → results page | FR1, FR2, FR3, FR4 |
| UC1 — Filter | Search Results | Filters update results | FR5, FR6, FR7 |
| UC1 — No Results | Search Results | No results message | FR8 |
| UC1 — Error State | Search Results | Retry button reloads data | NFR7 |
| UC2 — View Detail | Results → Detail | Result card opens detail | FR11, FR12 |
| UC2 — Status Notices | Business Details | Conditional notice panels | FR14, FR15, FR16 |
| UC2 — Rating Context | Detail → Guide | Full guide link | FR17 |

---

# 3.3 User Interface Architecture

## 3.3.1 Page Structure and Navigation Model

The application consists of four pages.

| Page | Route | Primary Purpose |
|---|---|---|
| Homepage | / | Entry point with search and category tiles |
| Search Results | /search | Displays matching businesses |
| Business Details | /detail/:id | Inspection record |
| Rating Guide | /guide | Explains rating system |

---

## 3.3.2 Grid Layout and Responsive Design

The application is built on a **twelve-column CSS grid layout**.

| Breakpoint | Grid Configuration | Content Behaviour |
|---|---|---|
| Desktop (1024px+) | 12-column grid | Multi-column layouts |
| Tablet (768–1023px) | 6-column grid | Reduced layout |
| Mobile (<768px) | Single column | Stacked layout |

---

## 3.3.3 Shared Components

### Navigation Bar

Present on all pages with logo and navigation links.

### Footer

Three-column layout containing:

- Contact information
- Quick links
- Legal links

### Hygiene Rating Badge

Colour-coded rating badge:

| Rating | Colour |
|---|---|
| 5 | Dark green |
| 4 | Mid green |
| 3 | Yellow-green |
| 2 | Amber |
| 1 | Orange-red |
| 0 | Dark red |

### Status Badge

Possible values:

- Rated
- New Rating Pending
- Awaiting Inspection
- Exempt

---

# 3.4 High-Fidelity Mockups

High-fidelity desktop mockups were produced for all four pages.

---

## 3.4.1 Visual Design System

| Category | Value | Usage |
|---|---|---|
| Primary Colour | #1B5E20 | Hero sections |
| Secondary Colour | #2E7D32 | Hover states |
| Accent Colour | #81C784 | Highlights |
| Warning Colour | #F57F17 | Rating badge 2 |
| Danger Colour | #B71C1C | Rating badge 0 |
| Page Background | #FFFFFF | Main page background |
| Surface Background | #F5F5F5 | Panels |
| Typography | Inter | Body text |
| Border Radius | 8px / 4px / 24px | Cards and buttons |
| Card Shadow | 0 2px 8px rgba(0,0,0,0.1) | Cards |

---

## 3.4.2 Homepage Layout

Sections include:

- Navigation bar
- Hero search section
- Statistics bar
- Category tiles
- Ratings summary
- Footer

---

## 3.4.3 Search Results Page Layout

Two-column layout.

| Column | Content |
|---|---|
| Left | Filters |
| Right | Results list |

Includes:

- Filter panel
- Active filter tags
- Result cards
- No results state
- Error state

---

## 3.4.4 Business Details Page Layout

Two-column grid.

| Column | Content |
|---|---|
| Left | Business information |
| Right | Rating graphic |

Includes:

- Back to results button
- Rating explanation panel
- Conditional notices

---

## 3.4.5 Rating Guide Page

Displays all rating levels.

| Score | Label | Description |
|---|---|---|
| 5 | Very Good | Very good hygiene standards |
| 4 | Good | Good hygiene overall |
| 3 | Generally Satisfactory | Acceptable standards |
| 2 | Improvement Necessary | Hygiene issues |
| 1 | Major Improvement Necessary | Poor hygiene standards |
| 0 | Urgent Improvement Required | Serious concerns |

Special statuses explained:

- Awaiting Inspection
- New Rating Pending
- Exempt

---

# 3.5 Design Decisions and Justifications

| Design Decision | Rationale | Requirement |
|---|---|---|
| Green colour scheme | Associated with safety and hygiene | NFR3 |
| Hero search bar | Reduces steps to search | FR1 |
| Category tiles | Faster filtering | FR6 |
| Colour-coded badges | Quick recognition | US7 |
| Sidebar filters | Better comparison | FR5 |
| Filter chips | Clear filter visibility | FR7 |
| Conditional notices | Reduces clutter | FR14 |
| Rating explanation panel | Reduces navigation | FR17 |
| No login required | Public information | FR10 |
| Retry button | Error recovery | NFR7 |
| Official rating graphic | Familiar reference | FR12 |
| Back to results state preserved | Better UX | UC2 |

---

# 3.6 Accessibility Considerations (WCAG 2.1 Level AA)

Accessibility considerations include:

- Colour contrast ratios meeting WCAG requirements
- Colour never used as sole indicator
- Alternative text for images
- Keyboard navigation support
- Form labels and accessible error messages
- Skip navigation link
- Fully responsive layouts

---

# 3.7 Design Tools and Process

All wireframes, wireflow diagrams, and high-fidelity mockups were created using **Figma**.

Figma was selected because it:

- Supports component-based design
- Enables interactive prototypes
- Allows shareable links for design review

---

## 3.7.1 Design Process Steps

1. Requirements Review  
2. Low-Fidelity Wireframes  
3. Figma Wireframes  
4. Wireflow Connections  
5. Design System Definition  
6. High-Fidelity Mockups  
7. Design Validation  

---

**Figma Design File:**  
https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?node-id=2071-507&t=36W43D7d1QbB3XwJ-1
