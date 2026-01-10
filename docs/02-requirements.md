# Requirements
## *Bristol Food Hygiene Ratings Web Application*

This section defines the requirements for an interactive web application that enables the public to explore food hygiene ratings for food businesses across Bristol, using the official **Bristol Open Data – "Food Hygiene Ratings"** dataset. The requirements were identified through user needs analysis, user stories, actor analysis, and detailed use-case modelling. Both functional and non-functional requirements are fully traced back to use-cases to ensure complete coverage and clarity.

---

## User Needs

Understanding user needs is essential for defining rational, testable, and valuable system behaviour. The following needs were established based on typical public interactions with food-hygiene information, the structure of the open dataset, and the aims of the project.

**Users need to:**
- Find food businesses quickly and easily.
- Understand how hygienic a business is before visiting or ordering food.
- View clear, accurate, and up-to-date rating information.
- Filter and compare businesses to make informed choices.
- Access nearby options whilst on the move (mobile/geo-based usage).
- Ensure accessibility and ease of use regardless of ability or device.
- Allow professionals (e.g., analysts, inspectors) to gain broader insights.

---

## User Stories

User stories express system goals from the perspective of real users, following the standard agile structure:

> **As a (role), I want (goal), so that (benefit).**

### General Public Users

- **As a parent**, I want to quickly search for food hygiene ratings near my child's school so that I can ensure they eat at safe establishments.
- **As a health-conscious diner**, I want to filter restaurants by hygiene rating so that I can choose only highly rated establishments.
- **As a tourist**, I want to view hygiene ratings on a mobile-friendly interface so that I can make informed dining decisions while exploring Bristol.
- **As a customer**, I want to see the inspection date alongside the rating so that I know how current the information is.
- As a Bristol resident, I want to search for local food businesses so that I can check whether they have good hygiene ratings.
- As a visitor, I want to browse food venues by area so that I can decide where to eat safely whilst travelling.
- As a parent, I want to filter out poorly rated businesses so that I can ensure my family eat in safe environments.
- As a student, I want to compare hygiene ratings between takeaways so that I can choose one that is both affordable and clean.

### Registered Users

- **As a registered user**, I want to save my favourite establishments so that I can quickly access their hygiene information.
- **As a community member**, I want to report hygiene concerns so that potential food safety issues can be investigated.
- **As a regular user**, I want to receive notifications when my saved establishments are re-inspected so that I stay informed about any rating changes.

### Food Business Owners

- **As a restaurant owner**, I want customers to easily find my high hygiene rating so that I can attract more health-conscious diners.
- **As a café manager**, I want to monitor my establishment's rating so that I can address any issues promptly.
- As a food-business owner, I want to see how my business appears to the public so that I can ensure my information is accurate.

### Local Authority Inspectors

- **As a food safety inspector**, I want the public to access current ratings easily so that businesses are motivated to maintain high hygiene standards.
- **As an environmental health officer**, I want inspection data to be displayed accurately so that the public can make informed decisions.

### Mobile and Accessibility Users

- As a mobile user, I want the system to use my current location so that I can quickly find the nearest safe places to eat.
- As an accessibility-focused user, I want to use the system with screen readers and keyboard navigation so that I can access all information independently.

### Professional Users

- As a council analyst, I want to identify clusters of low-scoring venues so that I can plan inspections strategically.

### Public Health Advocates

- **As a health researcher**, I want to analyse hygiene rating trends across Bristol so that I can identify areas that need improvement.

---

## Actors

The following actors interact directly or indirectly with the system:

### General Public User (Primary Actor)

Members of the public seeking food hygiene information for Bristol establishments. They have varying technical abilities and access the system via mobile or desktop devices. Their goal is to quickly find and understand hygiene ratings to make safe dining choices.

### Registered User (Primary Actor)

Members of the public who create accounts to access enhanced features such as saving favourites, reporting concerns, and receiving notifications. They are regular users who want greater engagement with the platform.

### Food Business Owner / Manager (Secondary Actor)

Owners or managers of food establishments in Bristol who have a business interest in their hygiene ratings. They use the system to monitor their ratings and respond to customer feedback, aiming to showcase good hygiene standards.

### Local Authority Inspector (Secondary Actor)

Environmental health officers from Bristol City Council who conduct hygiene inspections. They ensure the accuracy of published ratings and use the platform's visibility to encourage businesses to maintain high standards.

### System Administrator (Supporting Actor)

Technical staff responsible for maintaining the application, updating data feeds from Bristol Open Data, moderating user reports, and ensuring system reliability and security.

### Summary Table

| Actor | Description |
|-------|-------------|
| **Resident / Visitor** | Primary users searching for ratings to make safe decisions about where to eat. |
| **Food-Business Owner** | Uses the system to review how their business appears in the public dataset. |
| **Council Analyst** | Explores hygiene patterns across the city. |
| **System Administrator** | Manages data imports, integrity, and system reliability. |
| **Browser Geolocation API** | Provides location data with user permission. |
| **Bristol Open Data Service** | Supplies the Food Hygiene Ratings dataset. |

---

## Use-Cases

![Screenshot 2026-01-03 at 10 33 43](https://github.com/user-attachments/assets/f20f8845-fda7-4eff-aadb-66c6bd1a6726)

*Figure X: UML Use Case Diagram for the Bristol Food Hygiene Ratings Web Application.*

Each use-case describes structured system behaviour using an academically recognised format.

### **UC1 — Search for Food Businesses**

| Field | Detail |
|-------|--------|
| **Use-Case ID** | UC1 |
| **Name** | Search for food businesses |
| **Description** | User searches for food businesses by name, postcode, or area. The system retrieves matching entries and displays essential details. |
| **Actors** | Resident/Visitor (primary), Open Data Service (secondary) |
| **Assumptions** | A current or cached dataset is available; user has network access. |

**Steps**  
1. User enters search query.  
2. System retrieves matching records.  
3. System displays results including business name, address, rating, and inspection date.

**Variations**  
- No results → show message and suggestions.  
- Dataset unavailable → use cached dataset.

**Non-Functional Considerations**  
Clear presentation, fast response, accessibility.

**Issues**  
Decision on fuzzy/partial matching.

---

### **UC2 — View Detailed Hygiene Information**

| Field | Detail |
|-------|--------|
| **Use-Case ID** | UC2 |
| **Name** | View detailed hygiene information |
| **Description** | User selects a business to view full hygiene details and rating breakdown. |
| **Actors** | Resident/Visitor, Food-Business Owner |
| **Assumptions** | Detailed attributes available in dataset. |

**Steps**  
1. User selects business from UC1.  
2. System retrieves detailed record.  
3. System displays all available data fields and rating explanation.

**Variations**  
- Missing fields → display "Not provided".

**Non-Functional Considerations**  
Clarity, readability, accuracy.

**Issues**  
Dataset may contain incomplete records.

---

### **UC3 — Filter, Sort, and Compare Businesses**

| Field | Detail |
|-------|--------|
| **Use-Case ID** | UC3 |
| **Name** | Filter, sort, and compare businesses |
| **Description** | User refines results (by rating/type) and compares selected businesses. |
| **Actors** | Resident/Visitor, Council Analyst |
| **Assumptions** | UC1 results available. |

**Steps**  
1. User opens filter options.  
2. User selects rating/type filters.  
3. System refreshes results list.  
4. User adds businesses to a shortlist.  
5. System displays comparison view.

**Variations**  
- No results after filtering → show warning and reset option.

**Non-Functional Considerations**  
Responsiveness, usability.

**Issues**  
Choosing default sort order; maximum page results.

---

### **UC4 — Find Nearest Food Businesses (Geolocation)**

| Field | Detail |
|-------|--------|
| **Use-Case ID** | UC4 |
| **Name** | Find nearest food businesses |
| **Description** | User allows the system to access their location to find nearby highly rated businesses. |
| **Actors** | Resident/Visitor, Browser Geolocation API |
| **Assumptions** | Device supports geolocation; user may approve/deny permission. |

**Steps**  
1. User selects "Use my location".  
2. Browser requests permission.  
3. User grants permission.  
4. System retrieves coordinates.  
5. System calculates distances and displays nearest businesses.

**Variations**  
- Permission denied → offer postcode search.  
- Geolocation unsupported → hide feature.

**Non-Functional Considerations**  
Reliability, privacy, performance.

**Issues**  
Choosing default radius.

---

### **UC5 — Maintain Dataset (Admin Use)**

| Field | Detail |
|-------|--------|
| **Use-Case ID** | UC5 |
| **Name** | Maintain and refresh dataset |
| **Description** | Administrator manages import and updating of the Food Hygiene Ratings dataset. |
| **Actors** | System Administrator, Open Data Service |
| **Assumptions** | Access to environment and endpoint. |

**Steps**  
1. Admin configures import schedule.  
2. System fetches data.  
3. System validates, transforms, and loads data.  
4. Cache is updated.  
5. System logs outcome.

**Variations**  
- Schema changes → log warning; retain last working dataset.

**Non-Functional Considerations**  
Maintainability, reliability, auditability.

**Issues**  
When to alert admin of repeated failures.

---

## Software Requirements Specification

A complete, academically robust SRS containing Functional and Non-Functional Requirements, each traced to use-cases.

### Functional Requirements

All functional requirements follow the formal structure:

**"The system shall …"**

Prioritised using MoSCoW.

#### Search and Discovery (from UC1)

**FR1:** The system shall provide a search function allowing users to search for food establishments by business name, address, or postcode.  
**Source:** UC1  

**FR2:** The system shall support partial name matching in search queries, returning all establishments containing the search term.  
**Source:** UC1  

**FR3:** The system shall display search results as a list showing business name, address, and overall hygiene rating.  
**Source:** UC1  

**FR4:** The system shall allow users to filter establishments by hygiene rating level (0, 1, 2, 3, 4, 5 stars, or "Awaiting Inspection").  
**Source:** UC1  

**FR5:** The system shall allow users to filter establishments by establishment type (e.g. restaurant, takeaway, café, pub).  
**Source:** UC1  

**FR6:** The system shall allow users to filter establishments by location radius from a specified postcode.  
**Source:** UC1  

**FR7:** The system shall display a "No matches found" message with search suggestions when no results are returned.  
**Source:** UC1 – Variation V1.1  

#### Data Display (from UC1)

**FR8:** The system shall display detailed hygiene information for each establishment including:
- Overall hygiene rating (0–5)  
- Last inspection date  
- Hygiene score breakdown (food handling, cleanliness, management)  
- Business name and address  
- Establishment type  
- Compliance status  

**Source:** UC1  

**FR9:** The system shall clearly indicate establishments that are "Awaiting First Inspection" with an explanatory message for the 42,000+ unrated premises.  
**Source:** UC1 – Variation V1.2  

**FR10:** The system shall retrieve and display food hygiene ratings data from the Bristol Open Data Food Hygiene Ratings dataset.  
**Source:** UC1  

**FR11:** The system shall provide an interactive map view displaying establishments as colour-coded markers according to their hygiene rating:
- Green: 5-star  
- Light Green: 4-star  
- Yellow: 3-star  
- Orange: 2-star  
- Red: 0–1 star  
- Grey: Awaiting Inspection  

**Source:** UC1 – Variation V1.3  

#### User Account Features (from UC1)

**FR12:** The system shall allow registered users to save favourite establishments for quick access.  
**Source:** UC1  

**FR13:** The system shall provide user account registration and login functionality.  
**Source:** UC1, UC2  

#### Reporting Functionality (from UC2)

**FR14:** The system shall restrict the report submission feature to registered and logged-in users only.  
**Source:** UC2  

**FR15:** The system shall provide a "Report Concern" button on each establishment detail page.  
**Source:** UC2  

**FR16:** The system shall present a report form with the following fields:
- Concern category (dropdown: food handling, cleanliness, pests, other)  
- Detailed description (required text field)  
- Date of visit (optional date field)  
- Photo upload (optional file upload)  

**Source:** UC2  

**FR17:** The system shall validate that all required fields are completed before allowing report submission.  
**Source:** UC2  

**FR18:** The system shall send a confirmation notification to users upon successful report submission.  
**Source:** UC2  

**FR19:** The system shall flag submitted reports for administrator review before publication or forwarding to authorities.  
**Source:** UC2  

**FR20:** The system shall detect and notify users if a similar concern has been recently reported for the same establishment.  
**Source:** UC2 – Variation V2.1  

**FR21:** The system shall allow administrators to review reports and take the following actions:
- Forward to Bristol City Council  
- Request additional information  
- Dismiss as invalid  

**Source:** UC2  

#### MoSCoW Prioritised Requirements

##### Search (UC1)
- **FR1 (Must)** – The system shall allow users to search for food businesses by name.  
- **FR2 (Must)** – The system shall allow users to search by postcode, area, or street name.  
- **FR3 (Must)** – The system shall display search results including name, address, rating, and inspection date.  
- **FR4 (Must)** – The system shall notify the user when no results are found.  

##### Detailed View (UC2)
- **FR5 (Must)** – The system shall present detailed hygiene information for a selected business.  
- **FR6 (Must)** – The system shall display all available dataset fields.  
- **FR7 (Should)** – The system shall provide explanatory guidance on rating categories.  

##### Filtering and Comparison (UC3)
- **FR8 (Should)** – The system shall allow filtering by hygiene rating.  
- **FR9 (Should)** – The system shall allow filtering by business type.  
- **FR10 (Could)** – The system shall provide sorting options (rating, distance, alphabetical).  
- **FR11 (Could)** – The system shall enable users to create a comparison shortlist.  

##### Geolocation (UC4)
- **FR12 (Should)** – The system shall request and retrieve user location when permission is granted.  
- **FR13 (Should)** – The system shall calculate distances between the user and each business.  
- **FR14 (Should)** – The system shall display nearby businesses sorted by distance.  
- **FR15 (Could)** – The system may provide a map view.  
- **FR16 (Must)** – The system shall provide an alternative search method if location access is unavailable.  

##### Data Maintenance (UC5)
- **FR17 (Must)** – The system shall import updated data from the Bristol Open Data service.  
- **FR18 (Must)** – The system shall validate and log issues with imported data.  
- **FR19 (Must)** – The system shall maintain a cached dataset for offline operation.  
- **FR20 (Should)** – The system shall display the last successful update time.  

---

### Non-Functional Requirements

#### Performance (Quality Attribute: Efficiency)

**NFR1:** The system shall load search results within 2 seconds for 95% of queries.  
**Source:** UC1  

**NFR2:** The system shall load the establishment detail page within 1.5 seconds.  
**Source:** UC1  

**NFR3:** The system shall apply filters and refresh results within 500 milliseconds.  
**Source:** UC1  

**NFR4:** The system shall return results of up to 200 businesses within 2 seconds.  
**Source:** UC1  

**NFR5:** Filtering and sorting shall update results within 1 second for 95% of interactions.  
**Source:** UC3  

#### Usability (Quality Attribute: Usability)

**NFR1:** A first-time user shall be able to perform a search and interpret a rating within 2 minutes.  
**Source:** UC1, UC2  

**NFR2:** All UI elements shall be readable and usable on both mobile and desktop devices.  
**Source:** UC1  

**NFR4:** The system shall be usable by individuals with basic computer literacy without requiring training or technical support.  
**Source:** UC1  

**NFR5:** The system shall provide clear explanations of the hygiene rating scale (0–5) accessible from any page.  
**Source:** UC1  

**NFR6:** The system shall provide intuitive error messages and guidance when search returns no results.  
**Source:** UC1  

**NFR7:** The system shall present the report submission form with clear labels and help text for each field.  
**Source:** UC2  

#### Compatibility (Quality Attribute: Portability)

**NFR7:** The system shall support the two most recent major versions of Chrome, Firefox, Safari, and Edge.  
**Source:** UC1, UC4  

**NFR8:** The system shall function correctly on the latest two versions of major browsers (Chrome, Firefox, Safari, Edge).  
**Source:** UC1  

**NFR9:** The system shall provide a fully responsive interface that adapts to mobile devices (smartphones and tablets) and desktop screens.  
**Source:** UC1 – Variation V1.4  

#### Accessibility (Quality Attribute: Usability)

**NFR8:** The system shall comply with WCAG 2.1 AA guidelines.  
**Source:** UC1, UC4  

**NFR10:** The system shall use colour-coding that is distinguishable to users with colour vision deficiency (colour-blind-accessible palette).  
**Source:** UC1  

**NFR11:** The system shall maintain a minimum text contrast ratio of 4.5:1 for readability (WCAG AA standard).  
**Source:** UC1  

#### Security (Quality Attribute: Security)

**NFR9:** Location data shall not be stored on the server.  
**Source:** UC4  

**NFR12:** The system shall encrypt all report submissions both in transit (HTTPS) and at rest (encrypted database storage).  
**Source:** UC2  

**NFR13:** The system shall protect user privacy by not publicly displaying personal information from reports without consent.  
**Source:** UC2  

**NFR14:** The system shall store all reports with a complete audit trail including submission timestamp, user ID, and administrator actions.  
**Source:** UC2  

**NFR15:** The system shall implement rate limiting on report submissions to prevent spam and abuse (maximum 5 reports per user per day).  
**Source:** UC2  

#### Reliability (Quality Attribute: Reliability)

**NFR5:** The system shall continue operating using cached data if the live dataset is unavailable.  
**Source:** UC5  

**NFR6:** No more than 0.1% of data imports per month shall fail without logging an error.  
**Source:** UC5  

**NFR16:** The system shall maintain 99% uptime during standard operating hours (6am–11pm).  
**Source:** UC1, UC2  

**NFR17:** The system shall gracefully handle Bristol Open Data service unavailability by displaying cached data with a staleness warning.  
**Source:** UC1  

#### Data Integrity (Quality Attribute: Reliability)

**NFR18:** The system shall synchronise with the Bristol Open Data Food Hygiene Ratings dataset at least once daily to ensure current information.  
**Source:** UC1  

**NFR19:** The system shall display the last data update timestamp on the application homepage.  
**Source:** UC1  

#### Maintainability

**NFR10:** A developer familiar with the codebase shall be able to add a new filter or data field within half a working day.  
**Source:** UC5  

#### Auditability

**NFR11:** All scheduled data imports shall be logged with timestamp, status, and record count.  
**Source:** UC5  

#### Legal Compliance (Quality Attribute: Security)

**NFR20:** The system shall comply with GDPR requirements for personal data storage, processing, and deletion in user reports.  
**Source:** UC2  

---

## Traceability Matrix (Use-Cases → Requirements)

| Use-Case | Functional Requirements | Non-Functional Requirements |
|----------|--------------------------|------------------------------|
| **UC1** | FR1–FR4 | NFR1, NFR3, NFR4 |
| **UC2** | FR5–FR7 | NFR1, NFR8, NFR11 |
| **UC3** | FR8–FR11 | NFR2, NFR4 |
| **UC4** | FR12–FR16 | NFR7, NFR8, NFR9 |
| **UC5** | FR17–FR20 | NFR5, NFR10, NFR11 |
