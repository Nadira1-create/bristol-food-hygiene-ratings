# Requirements  
### *Bristol Food Hygiene Ratings Web Application*

This section defines the requirements for an interactive web application that enables the public to explore food hygiene ratings for food businesses across Bristol, using the official **Bristol Open Data – “Food Hygiene Ratings”** dataset. The requirements were identified through user needs analysis, user stories, actor analysis, and detailed use-case modelling. Both functional and non-functional requirements are fully traced back to use-cases to ensure complete coverage and clarity.

---

## 1. User Needs

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

## 2. User Stories

User stories express system goals from the perspective of real users, following the standard agile structure:

> **As a (role), I want (goal), so that (benefit).**

### Public Users
- As a Bristol resident, I want to search for local food businesses so that I can check whether they have good hygiene ratings.
- As a visitor, I want to browse food venues by area so that I can decide where to eat safely whilst travelling.
- As a parent, I want to filter out poorly rated businesses so that I can ensure my family eat in safe environments.
- As a student, I want to compare hygiene ratings between takeaways so that I can choose one that is both affordable and clean.

### Mobile and Accessibility Users
- As a mobile user, I want the system to use my current location so that I can quickly find the nearest safe places to eat.
- As an accessibility-focused user, I want to use the system with screen readers and keyboard navigation so that I can access all information independently.

### Professional Users
- As a food-business owner, I want to see how my business appears to the public so that I can ensure my information is accurate.
- As a council analyst, I want to identify clusters of low-scoring venues so that I can plan inspections strategically.

---

## 3. Actors

The following actors interact directly or indirectly with the system:

| Actor | Description |
|-------|-------------|
| **Resident / Visitor** | Primary users searching for ratings to make safe decisions about where to eat. |
| **Food-Business Owner** | Uses the system to review how their business appears in the public dataset. |
| **Council Analyst** | Explores hygiene patterns across the city. |
| **System Administrator** | Manages data imports, integrity, and system reliability. |
| **Browser Geolocation API** | Provides location data with user permission. |
| **Bristol Open Data Service** | Supplies the Food Hygiene Ratings dataset. |

---

## 4. Use-Cases

<img width="1006" height="646" alt="Screenshot 2026-01-03 at 10 33 43" src="https://github.com/user-attachments/assets/f20f8845-fda7-4eff-aadb-66c6bd1a6726" />
*Figure X: UML Use Case Diagram for the Bristol Food Hygiene Ratings Web Application.*


Each use-case describes structured system behaviour using an academically recognised format.

---

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
- Missing fields → display “Not provided”.

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
1. User selects “Use my location”.  
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

## 5. Software Requirements Specification (SRS)

A complete, academically robust SRS containing Functional and Non-Functional Requirements, each traced to use-cases.

---

## 5.1 Functional Requirements

All functional requirements follow the formal structure:

**“The system shall …”**

Prioritised using MoSCoW.

### **Search (UC1)**
- **FR1 (Must)** – The system shall allow users to search for food businesses by name.  
- **FR2 (Must)** – The system shall allow users to search by postcode, area, or street name.  
- **FR3 (Must)** – The system shall display search results including name, address, rating, and inspection date.  
- **FR4 (Must)** – The system shall notify the user when no results are found.  

### **Detailed View (UC2)**
- **FR5 (Must)** – The system shall present detailed hygiene information for a selected business.  
- **FR6 (Must)** – The system shall display all available dataset fields.  
- **FR7 (Should)** – The system shall provide explanatory guidance on rating categories.  

### **Filtering and Comparison (UC3)**
- **FR8 (Should)** – The system shall allow filtering by hygiene rating.  
- **FR9 (Should)** – The system shall allow filtering by business type.  
- **FR10 (Could)** – The system shall provide sorting options (rating, distance, alphabetical).  
- **FR11 (Could)** – The system shall enable users to create a comparison shortlist.  

### **Geolocation (UC4)**
- **FR12 (Should)** – The system shall request and retrieve user location when permission is granted.  
- **FR13 (Should)** – The system shall calculate distances between the user and each business.  
- **FR14 (Should)** – The system shall display nearby businesses sorted by distance.  
- **FR15 (Could)** – The system may provide a map view.  
- **FR16 (Must)** – The system shall provide an alternative search method if location access is unavailable.  

### **Data Maintenance (UC5)**
- **FR17 (Must)** – The system shall import updated data from the Bristol Open Data service.  
- **FR18 (Must)** – The system shall validate and log issues with imported data.  
- **FR19 (Must)** – The system shall maintain a cached dataset for offline operation.  
- **FR20 (Should)** – The system shall display the last successful update time.  

---

## 5.2 Non-Functional Requirements

### Usability
- **NFR1** – A first-time user shall be able to perform a search and interpret a rating within 2 minutes.  
- **NFR2** – All UI elements shall be readable and usable on both mobile and desktop devices.  

### Performance
- **NFR3** – The system shall return results of up to 200 businesses within 2 seconds.  
- **NFR4** – Filtering and sorting shall update results within 1 second for 95% of interactions.  

### Reliability
- **NFR5** – The system shall continue operating using cached data if the live dataset is unavailable.  
- **NFR6** – No more than 0.1% of data imports per month shall fail without logging an error.  

### Portability
- **NFR7** – The system shall support the two most recent major versions of Chrome, Firefox, Safari, and Edge.  

### Accessibility
- **NFR8** – The system shall comply with WCAG 2.1 AA guidelines.  

### Security & Privacy
- **NFR9** – Location data shall not be stored on the server.  

### Maintainability
- **NFR10** – A developer familiar with the codebase shall be able to add a new filter or data field within half a working day.  

### Auditability
- **NFR11** – All scheduled data imports shall be logged with timestamp, status, and record count.  

---

## 6. Traceability Matrix (Use-Cases → Requirements)

| Use-Case | Functional Requirements | Non-Functional Requirements |
|----------|--------------------------|------------------------------|
| **UC1** | FR1–FR4 | NFR1, NFR3, NFR4 |
| **UC2** | FR5–FR7 | NFR1, NFR8, NFR11 |
| **UC3** | FR8–FR11 | NFR2, NFR4 |
| **UC4** | FR12–FR16 | NFR7, NFR8, NFR9 |
| **UC5** | FR17–FR20 | NFR5, NFR10, NFR11 |
