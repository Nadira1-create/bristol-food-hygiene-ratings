# Bristol Food Hygiene Ratings Web Application  
## Phase 3 — Design Document  
### UFCF9F-30-1 Software Engineering Portfolio

| Field | Details |
|------|--------|
| Module | UFCF9F-30-1 — Software Engineering Portfolio |
| Phase | 3 — Design |
| Application | Bristol Food Hygiene Ratings Web Application |
| Data Source | Open Bristol / Food Standards Agency |
| Document Date | March 2026 |
| Design Tool | Figma (Wireframes and High-Fidelity Mockups) |

---

# 3.1 Introduction to the Design Phase

The design phase of the Bristol Food Hygiene Ratings web application bridges the gap between the requirements specification produced in Phase 2 and the implementation work that follows in Phase 4. The purpose of this phase is to translate the functional and non-functional requirements into a clear, structured, and professionally presented visual blueprint for the application before any code is written.

This document presents three interconnected design artefacts. First, a wireflow diagram maps out every screen in the application alongside all navigation paths, user interactions, and edge-case states. Second, high-fidelity desktop mockups present the final visual design including colour scheme, typography, spacing, and all interface components. Third, the overall user interface architecture is described in terms of grid layout, component structure, and design rationale.

The design process followed an iterative and user-centred approach. Low-fidelity wireframes were produced first to plan the structure and navigation of each page. These were then connected into a full wireflow diagram to validate every user journey before any visual styling decisions were made. Once the structure and navigation were confirmed, high-fidelity mockups were produced applying the full design system. This progression from structure to style reduced the risk of costly changes at the implementation stage.

All design artefacts were produced in Figma. The complete wireflow diagram and all high-fidelity mockups are available in full resolution at the following link:

**Figma Design File**  
https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?node-id=2071-507&t=36W43D7d1QbB3XwJ-1

---

# 3.2 Wireflow Diagram

## 3.2.1 What is a Wireflow and Why Was One Produced?

A wireflow is a design technique that combines wireframes with a user flow diagram. A wireframe is a low-fidelity structural representation of a single screen, showing the position of interface elements without any visual styling. A user flow diagram shows how a user navigates between screens through their actions and decisions. By combining both into a single wireflow, it is possible to understand the entire application as a connected system rather than as a collection of isolated pages.

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
| Primary navigation arrow | Green solid | The user clicks an interactive element and moves to a new page. |
| Navigation bar link arrow | Blue dashed | A navigation bar link available from every page at any time, allowing direct access to any section without following a specific path. |
| Back / return arrow | Grey dashed | The user returns to the previous page without losing their current state. |
| Validation or error arrow | Red solid | The user stays on the same page and a validation message or error notice is displayed. |
| Same-page interaction arrow | Black solid | The user stays on the current page but the content updates. |
| Annotation box | Yellow filled rectangle | Informational note highlighting behaviour, edge cases, or design decisions. |

---

## 3.2.3 Wireflow Diagram Screenshots

The following screenshots present the complete wireflow diagram as captured from Figma. The diagram is shown across five views so that each section can be read clearly.

### View 1 — Homepage and Search Results Page

This view shows the Homepage and Search Results Page positioned side by side. The green arrows trace the primary user journey: the user arrives on the Homepage, enters a search query, and arrives at the Search Results Page.

A red arrow illustrates the validation path where the user submits an empty search field and remains on the Homepage with a validation message displayed beneath the search bar.

Green arrows also show that clicking any category tile on the Homepage navigates to the Search Results Page with that business type filter pre-applied.

*(See wireflow screenshot)*

---

### View 2 — Search Results Page and Business Details Page

This view focuses on the connection between the Search Results Page and the Business Details Page. The green arrow shows the primary path where the user clicks a result card and is taken to the full detail view for that business.

The grey dashed arrow illustrates the **Back to Results** navigation, which returns the user to the results list without resetting their search query or applied filters.

---

### View 3 — Business Details Page (Detailed View)

This view presents the Business Details Page in isolation with all conditional status notices visible for documentation purposes.

The yellow annotation box labelled **Frame 4** confirms that these notices are mutually exclusive and that only the relevant one is displayed per business.

---

### View 4 — Rating Guide Page and Wireflow Legend

This view shows the Rating Guide Page alongside the full wireflow legend panel.

The Rating Guide is reachable from three distinct entry points:

- Navigation bar on every page
- **View Full Guide** button on the Homepage
- **Full Guide** link on the Business Details Page

---

### View 5 — Rating Guide Page and Legend (Close-up)

This close-up view presents the Rating Guide Page content and the full wireflow legend in greater detail. It also shows the footer including certification logos and quick links.

---

## 3.2.4 Complete Navigation Map

| From Page | User Action | To Page / State |
|---|---|---|
| Homepage | Submits valid search query | Search Results Page |
| Homepage | Submits empty search field | Validation message shown |
| Homepage | Clicks category tile | Search Results Page (filtered) |
| Homepage | Clicks View Full Guide | Rating Guide Page |
| Homepage | Navigation bar → Search | Search Results Page |
| Homepage | Navigation bar → Detail | Business Details Page |
| Homepage | Navigation bar → Rating Guide | Rating Guide Page |
| Search Results | Click result card | Business Details Page |
| Search Results | Apply filter checkbox | Results update in place |
| Search Results | Retry button | Data reload attempted |
| Search Results | View Full Guide | Rating Guide Page |
| Search Results | Logo click | Homepage |
| Business Details | Back to Results | Preserved results state |
| Business Details | Full Guide link | Rating Guide Page |
| Rating Guide | Navigation bar link | Corresponding page |
| Any page | Click logo | Homepage |

---

# 3.3 User Interface Architecture

## 3.3.1 Page Structure and Navigation Model

The application consists of four pages connected by a shared navigation bar and footer.

| Page | Route | Primary Purpose |
|---|---|---|
| Homepage | / | Entry point with hero search bar and category tiles |
| Search Results | /search | Displays businesses matching the query |
| Business Details | /detail/:id | Displays full inspection record |
| Rating Guide | /guide | Explains rating system and statuses |

---

## 3.3.2 Grid Layout and Responsive Design

The application is built on a **twelve-column CSS grid layout**.

| Breakpoint | Grid Configuration | Content Behaviour |
|---|---|---|
| Desktop (1024px+) | 12 column grid | Multi-column layouts |
| Tablet (768–1023px) | 6 column grid | Layout compresses |
| Mobile (<768px) | Single column | Fully stacked layout |

This approach satisfies **NFR2 (responsive design)** and **US8 (mobile support)**.

---

## 3.3.3 Shared Components

### Navigation Bar
Present on all pages. Contains the application logo and navigation links.

### Footer
Three column layout including:

- Contact information
- Quick links
- Legal links

### Hygiene Rating Badge

| Rating | Colour |
|---|---|
| 5 – Very Good | Dark Green |
| 4 – Good | Mid Green |
| 3 – Generally Satisfactory | Yellow-Green |
| 2 – Improvement Necessary | Amber |
| 1 – Major Improvement Necessary | Orange-Red |
| 0 – Urgent Improvement Required | Dark Red |

### Status Badge
Possible values:

- Rated
- New Rating Pending
- Awaiting Inspection
- Exempt

---

# 3.4 High-Fidelity Mockups

High-fidelity desktop mockups were produced for all four pages of the application using Figma.

---

## 3.4.1 Visual Design System

| Category | Value | Usage |
|---|---|---|
| Primary Colour | #1B5E20 | Hero, buttons, headings |
| Secondary Colour | #2E7D32 | Hover states |
| Accent Colour | #81C784 | Highlights |
| Warning Colour | #F57F17 | Rating badge 2 |
| Danger Colour | #B71C1C | Rating badge 0 |
| Page Background | #FFFFFF | Main page background |
| Surface Background | #F5F5F5 | Cards and panels |
| Typography | Inter | All text |
| Border Radius | 8px cards | UI consistency |
| Card Shadow | 0 2px 8px rgba(0,0,0,0.1) | Visual depth |

---

# 3.5 Design Decisions and Justifications

| Design Decision | Rationale | Requirement Addressed |
|---|---|---|
| Green colour scheme | Associated with hygiene and safety | NFR3 |
| Hero search bar | Immediate task access | FR1 |
| Category tiles | Faster browsing | FR6 |
| Colour-coded badges | Instant rating recognition | US7 |
| Sidebar filter panel | Efficient filtering | FR5 |
| Active filter chips | Clear filter state | FR7 |
| Conditional notices | Avoid clutter | FR14–FR16 |
| Rating explanation panel | No extra navigation | FR17 |
| No login required | Public information | FR10 |
| Retry button | Error recovery | NFR7 |
| Official rating graphic | Familiar reference | FR12 |
| Back to results state | Efficient browsing | UC2 |

---

# 3.6 Accessibility Considerations (WCAG 2.1 Level AA)

Accessibility considerations include:

- Minimum **4.5:1 contrast ratios**
- Colour never used as the sole indicator
- Numeric labels on rating badges
- Keyboard navigation
- Visible focus indicators
- Form labels and accessible error messages
- Skip navigation link
- Responsive layout support

---

# 3.7 Design Tools and Process

All wireframes, wireflow diagrams, and high-fidelity mockups were created using **Figma**.

### 3.7.1 Design Process Steps

1. Requirements Review  
2. Low-Fidelity Wireframes  
3. Figma Wireframes  
4. Wireflow Connections  
5. Design System Definition  
6. High-Fidelity Mockups  
7. Design Validation  

Figma Design File:  
https://www.figma.com/design/cDzHoE1BvKaEpMsooiBrOb/High-Fidelity-MockUp?node-id=2071-507&t=36W43D7d1QbB3XwJ-1
