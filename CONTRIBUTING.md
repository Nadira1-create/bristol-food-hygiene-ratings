# Team Contribution Record
## Bristol Food Hygiene Ratings - UFCF9F-30-1 Information Systems Development

---

## Team Member Contributions

| Team Member | Role | Contribution |
|---|---|---|
| Nadira Ali Robleh | Lead Developer | Requirements, Design, Implementation, Planning |
| Susu Mohammed | Contributor | Testing |

---

## Detailed Contribution Breakdown by Portfolio Phase

### Phase 1 - Planning

**Contributor: Nadira Ali Robleh (100%)**

- Authored the full Business Case, including the Problem Statement, Business Benefits (6 distinct benefits), Options Considered (5 options evaluated), and Expected Risks with mitigations (4 risks documented).
- Defined the complete Project Scope with a detailed In Scope and Out of Scope breakdown.
- Produced the Context Diagram in Figma, documenting all actors, external systems, and data flows across the system boundary.
- Wrote all annotations describing each actor, system, and data flow in the Context Diagram section.

---

### Phase 2 - Requirements

**Contributor: Nadira Ali Robleh (100%)**

- Authored all 10 User Stories (US1-US10).
- Defined all 4 actors including the System and External API actors.
- Wrote both Use Cases in full table format (UC1: Search and Filter Food Hygiene Ratings; UC2: View Detailed Business Information and Understand Ratings), including descriptions, assumptions, steps, variations, non-functional references, and issues for each.
- Produced the Use Case Diagram.
- Wrote all 17 Functional Requirements (FR1-FR17), each with source tracing to use cases and user stories.
- Wrote all 10 Non-Functional Requirements (NFR1-NFR10) structured against ISO/IEC 9126 quality categories: Usability, Performance, Reliability, Security, and Maintainability.

---

### Phase 3 - Design

**Contributor: Nadira Ali Robleh (100%)**

- Produced all low-fidelity wireframes for all four application pages (Homepage, Search Results, Business Details, Rating Guide) in Figma.
- Connected all wireframes into a complete Wireflow Diagram with full arrow notation, legend, and annotations.
- Produced all high-fidelity desktop mockups for all four pages in Figma, applying the full design system.
- Defined the complete Visual Design System including colour palette, typography, spacing, border radii, shadow values, and rating badge colour assignments.
- Documented the Complete Navigation Map (16 navigation paths), Wireflow-to-Use-Case Mapping, Page Structure and Navigation Model, Grid Layout and Responsive Design specification, all Shared Components, and all Design Decisions with justifications.
- Documented all WCAG 2.1 Level AA Accessibility Considerations.

---

### Phase 4 - Implementation

**Contributor: Nadira Ali Robleh (100%)**

All source code was written entirely by Nadira Ali Robleh. The full codebase consists of:

| File | Lines | Description |
|---|---|---|
| `data.js` | 5,901 | All 3,867 embedded business records plus every query, filter, sort, render, and page initialiser function |
| `Style.css` | 2,864 | The entire design system, 12-column CSS grid, 3 responsive breakpoints, 35 labelled sections |
| `Main.js` | ~200 | Complete mobile navigation module with full ARIA management |
| `index.html` | 567 | Homepage with semantic HTML5, hero search, statistics bar, category tiles |
| `Search.html` | 620 | Search results page with filter panel, result cards, pagination, error and empty states |
| `Business-Detail.html` | 676 | Business details page with FSA rating graphic, data table, conditional notice panels |
| `Rating-Guide.html` | 709 | Rating guide with six rating cards, special statuses section, in-page navigation |

Specific implementation responsibilities undertaken:

- Designed and implemented the client-side MPA architecture using HTML5, CSS3, and vanilla JavaScript with no server-side infrastructure.
- Embedded all 3,867 business records directly in `data.js` to eliminate server dependency and CORS issues.
- Implemented all five client-side query operations: full dataset load, text search filter, rating filter, business type filter, and single record lookup by ID.
- Wrote the `escapeHTML()` XSS sanitisation utility applied to every data field injected into the DOM.
- Implemented multi-word AND search with postcode normalisation and search term highlighting.
- Implemented `sessionStorage` state persistence so the Back button restores the exact search and filter state.
- Wrote the `debounce()` utility and the `VALID_SORTS` input whitelist.
- Achieved zero JSLint warnings across both JavaScript modules.
- Iterated through semantic versioning from initial releases to final versions across all seven source files, documenting every increment with justification.
- Wrote the full Implementation documentation including all version histories, architecture descriptions, component diagrams, query documentation, code quality analysis, and the User Guide.

---

### Phase 5 - Testing

**Contributor: Susu Mohammed (100%)**

- Designed and wrote all 30 test cases (TC1-TC30), each with structured fields, numbered steps, test data references, and expected results.
- Executed all 30 test cases against version 1.0.0 of the application.
- Produced the complete Requirements Traceability Matrix mapping all 17 functional requirements and all 10 non-functional requirements to their corresponding test cases.
- Wrote the Testing Introduction, Testing Scope, Test Data definitions (TD1-TD9), Prerequisites, and Test Run summary table.
- Documented all test outcomes and the final summary (28 Pass, 2 N/A, 0 Fail).

---

## Summary

| Phase | Nadira Ali Robleh | Susu Mohammed |
|---|---|---|
| Phase 1 - Planning | 100% | 0% |
| Phase 2 - Requirements | 100% | 0% |
| Phase 3 - Design | 100% | 0% |
| Phase 4 - Implementation | 100% | 0% |
| Phase 5 - Testing | 0% | 100% |
| **Overall** | **80%** | **20%** |

---

*Submitted by: Nadira Ali Robleh & Susu Mohammed*
*Date: April 2026*
*Module: UFCF9F-30-1 Information Systems Development*
