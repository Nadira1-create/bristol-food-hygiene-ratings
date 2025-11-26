### Requirments Specification
### Bristol Food Hygiene Ratings Web Application

### 1. Introduction
**1.1 Purpose**
This Software Requirements Specification (SRS) defines all functional and non-functional requirements for the Bristol Food Hygeiene Ratings Web Application. The system enables citizens to explore, understand, and compare offcial Food Hygiene  Ratings for food businesses in Bristol using open data.

This document is intended for:
* Teaching staff assessing the portofolio
* Student developer(S) implementing the system
*Future maintainers extending the system
  
**1.2 Scope**
The application will:
* Consume Bristol Open Data FHRS dataset
* Allow users to search, browse and filter food businesses
* Provide location-based ("Near me") discovery
* Display rating visulisations and statistics
* (Optional) Provide favourites and admin dataset refresh

**Out of scope:**
* Editing ratings
* Business login
* Real-time inspection data
* Authentication (optional stretch)

**1.3 Definitions & Abbreviations**
FHRS - Food Hygiene Rating Scheme
FR - Functional Requirement
NFR - Non-Functional Requirement
Actor - Role interacting with the system
Use-case - User-centred description of system behvaviour

**1.4 Stakeholders**
| Stakeholder | Interest |
|---|---|
| Citizen | Acess reliable hygiene information |
| Enviormental Health Officers | Transparent public data |
| Local Businesses | visibility of hygiene ratings |
| University Assessors | Evaluate requirements engineering |

**1.5 Assumptions & Dependencies**
* Bristol FHRS data set availabe in JSON/CSV format
* Dataset includes names, address, postcode, rating, date, and coordinates
* Browser supports HTML5, JavaScript, HTTPS
* Geolocation requires navigator.geolocation
* Internet access OR bundled dataset fallback

 ###  2. Overal Description
**2.1 System, Perspective**
  The application is a browser-web system that retrieves data from:
* BristolOpen Data API
* OR a static cached dataset (fallback)

**Architecture:**
* UI Layer - pages, search bar, filters, map
* Logic Layer - search/filtering, geolocation, osrting
* Dat Layer - hygiene ratings datset, cached mechanism

**2.2 Product Functions**
* Search businesses by name/address/postcode
* Briwse by area
* View rating details
* Find nearby businesses
* Filter & sort
* Visualise rating summaries
* (optional) Save favourites
* (optional) Admin dataset refresh

 **2.3 User Classes**
  * Public User - primary audience
  * Council Stskeholder - uses statistics
  * Admin - rereshes datset (optional)
  **2.4 Operating Enviorment**
  * Chrome, Edge, Firefox, Safari
  * Smartphones, tablets, desktops
  * HTTPS
  * Optional OpenStreetMap or Leaflet

**2.5 Constraints**
  * Must use open data license
  * Must not modify FHRS rating
  * Dataset size may impact performance
 
  ### 3 Use-Case Model
 **3.1 Use-case Diagram**
  (Insert my diagram here)

 **3.2 Use-Case List**
| ID   | Name                                   |
|------|-----------------------------------------|
| UC1  | Search for food businesses              |
| UC2  | Browse by area/postcode                 |
| UC3  | View full rating details                |
| UC4  | Find businesses near my location        |
| UC5  | Filter and sort results                 |
| UC6  | View rating statistics / visualisations |
| UC7  | Manage favourites *(optional)*          |
| UC8  | Admin refresh dataset *(optional)*      |

### 3.3 Detailed Use-case description
**UC1 — Search for Food Businesses**

**Description**  
The user searches for food businesses using a keyword (name, street, or postcode) to quickly find hygiene ratings.

**Primary Actor**  
Public User

**Secondary Actors**  
None

**Preconditions**  
- Dataset is successfully loaded.

**Postconditions**  
- Matching results are displayed.

**Main Flow**
1. User enters a search term into the search bar.
2. System validates the input.
3. System queries the dataset for matching businesses.
4. System displays a list of results including name, rating, address, and business type.
5. User selects a business or refines their search.

**Alternative / Exception Flows**
- **1a. Blank input:** System displays suggestions (popular areas or top-rated businesses).
- **2a. Invalid characters:** System displays an input error message.
- **3a. No results:** “No results found” displayed with guidance to refine search.

**Non-Functional Requirements Linked**  
- NFR1 (Usability)  
- NFR3 (Accessibility)  
- NFR4 (Performance)

**Issues / Notes**  
- Consider normalising accented characters (e.g., café vs cafe).

### UC2 — Browse by Area / Postcode

**Description**  
The user browses food businesses grouped by geographical area or postcode.

**Primary Actor**  
Public User

**Preconditions**  
- Dataset contains postcode and area fields.

**Postconditions**  
- A list of businesses in the selected area is displayed.

**Main Flow**
1. User selects an area or postcode from a dropdown or map.
2. System retrieves all businesses from the selected area.
3. System displays the list sorted by rating.

**Alternative Flows**
- **1a. Area list fails to load:** System displays fallback text input.
- **2a. Area contains no businesses:** System displays “No businesses found in this area.”

**NFR Links**  
- NFR1, NFR3, NFR4

### UC3 — View Full Rating Details

**Description**  
The user selects a business to view its inspection details and hygiene rating.

**Primary Actor**  
Public User, Council Stakeholder

**Preconditions**  
- A business must be selected from search/browse results.

**Postconditions**  
- Full rating information is displayed.

**Main Flow**
1. User selects a business.
2. System retrieves rating details for the selected business.
3. System displays rating, rating date, business type, address, and any breakdown categories.

**Alternative Flows**
- **2a. Missing data:** System displays “Some information unavailable” without crashing.

**NFR Links**  
- NFR1, NFR3

### UC4 — Find Businesses Near My Location

**Description**  
The user finds nearby food businesses using device geolocation.

**Primary Actor**  
Public User

**Preconditions**  
- Browser supports geolocation.

**Postconditions**  
- A list of nearby businesses is shown sorted by distance or rating.

**Main Flow**
1. User selects “Near me”.
2. System requests geolocation permission.
3. User grants permission.
4. System retrieves latitude/longitude.
5. System calculates distance between user and each business.
6. System displays results within the default radius (e.g., 1 km).

**Alternative Flows**
- **3a. User denies permission:** System displays “Location needed for near-me search” with fallback search.
- **4a. Browser does not support geolocation:** System disables feature with explanation.
- **6a. No nearby businesses:** System displays “No nearby businesses found.”

**NFR Links**  
- NFR2, NFR7, NFR8, NFR9

### UC5 — Filter and Sort Results

**Description**  
The user filters businesses by rating or type and sorts them by rating, distance, or inspection date.

**Primary Actor**  
Public User

**Preconditions**  
- User has performed a search/browse.

**Postconditions**  
- Filtered/sorted list is displayed.

**Main Flow**
1. User selects one or more filters (e.g., Rating = 5, Business Type = Restaurant).
2. User selects sorting criteria.
3. System applies filters.
4. System sorts the results.
5. System displays updated results list.

**Alternative Flows**
- **1a. Conflicting filters lead to no results:** System displays “No results match your filters.”
- **3a. Filter logic fails:** System shows error message without page reload.

**NFR Links**  
- NFR1, NFR4

### UC6 — View Rating Statistics / Visualisations

**Description**  
User views charts showing rating distribution, business types, or area comparisons.

**Primary Actor**  
Public User, Council Stakeholder

**Preconditions**  
- Dataset loaded successfully.

**Postconditions**  
- Visualisations displayed using charts.

**Main Flow**
1. User opens the statistics page.
2. System aggregates rating data.
3. System generates charts (bar/pie/line).
4. System displays visualisations and summary statistics.

**Alternative Flows**
- **2a. Some data fields missing:** System ignores missing values without breaking charts.
- **3a. Visualisation library error:** Fallback to text summaries.

**NFR Links**  
- NFR4, NFR5

### UC7 — Manage Favourites (Optional)

**Description**  
User saves frequently viewed businesses to a “Favourites” list.

**Primary Actor**  
Public User

**Preconditions**  
- User has selected a business.

**Postconditions**  
- Business added or removed from favourites.

**Main Flow**
1. User clicks “Add to Favourites”.
2. System stores business ID locally (LocalStorage).
3. User views the “Favourites” screen.

**Alternative Flows**
- **1a. Business already a favourite:** System changes button to “Remove from favourites”.
- **3a. No favourites saved:** System shows an empty state message.

**NFR Links**  
- NFR5, NFR6

### UC8 — Admin: Refresh Dataset (Optional)

**Description**  
Admin refreshes or replaces the dataset.

**Primary Actor**  
Admin

**Preconditions**  
- Admin access enabled.

**Postconditions**  
- Dataset updated and timestamp refreshed.

**Main Flow**
1. Admin selects “Refresh dataset”.
2. System requests latest dataset from API.
3. System validates file format.
4. System replaces existing dataset.
5. System updates “Last updated” timestamp.

**Alternative Flows**
- **2a. API unavailable:** System loads cached dataset and alerts admin.
- **3a. Invalid dataset:** System rejects update and displays error.

**NFR Links**  
- NFR6, NFR11


# 4. Functional Requirements (FRs)

## 4.1 Searching & Browsing
- **FR1 (Must):** The system shall allow users to search for food businesses by name, street, or postcode.
- **FR2 (Must):** The system shall return a list of businesses that match the entered keyword.
- **FR3 (Should):** The system should provide a browse-by-area or browse-by-postcode feature without requiring text input.

## 4.2 Viewing Rating Details
- **FR4 (Must):** The system shall display full hygiene rating details for a selected business.
- **FR5 (Should):** The system should display the rating breakdown (e.g., hygiene, structural compliance), if available in the dataset.

## 4.3 Location-Based Discovery
- **FR6 (Must):** The system shall request geolocation access only when the user selects “Near me”.
- **FR7 (Must):** The system shall compute distances between the user’s location and businesses using the Haversine (or equivalent) formula.
- **FR8 (Must):** The system shall display nearby businesses within a configurable radius (e.g., 1 km by default).
- **FR9 (Must):** The system shall handle cases where geolocation is denied or unavailable and provide fallback options.

## 4.4 Filtering & Sorting
- **FR10 (Must):** The system shall allow users to filter businesses by hygiene rating (0–5).
- **FR11 (Should):** The system should allow users to filter by business type (e.g., restaurant, takeaway).
- **FR12 (Must):** The system shall allow sorting by rating, distance, or inspection date.

## 4.5 Visualisation & Statistics
- **FR13 (Should):** The system should display a rating distribution chart (e.g., bar/pie chart).
- **FR14 (Could):** The system could display additional area-level summaries, such as number of 5-rated businesses per postcode.

## 4.6 Favourites (Optional Feature)
- **FR15 (Could):** The system could allow users to mark businesses as favourites.
- **FR16 (Could):** The system could provide a “My Favourites” page to view saved businesses.

## 4.7 Administration (Optional Feature)
- **FR17 (Should):** The system should allow an admin user to refresh the dataset from the API or uploaded file.
- **FR18 (Should):** The system should display the timestamp of the last successful dataset refresh.


# 5. Non-Functional Requirements (NFRs)

## 5.1 Usability & Accessibility
- **NFR1 (Usability):** The search bar shall be visible on the first screen without scrolling on all device sizes ≥ 360px width.
- **NFR2 (Usability):** When geolocation is unavailable, the system shall provide an alternative search method (e.g., postcode search).
- **NFR3 (Accessibility):** All interactive elements shall be fully screen-reader compatible and keyboard-navigable (WCAG 2.1 AA compliant where feasible).

## 5.2 Performance
- **NFR4 (Performance):** Search results shall be returned and displayed within *2 seconds* for datasets up to *5,000 entries*.
- **NFR5 (Responsiveness):** The UI shall be responsive across devices from *360px to 1920px* wide without horizontal scrolling.

## 5.3 Reliability & Fault Tolerance
- **NFR6 (Reliability):** If the API is unavailable, the system shall automatically load the last cached dataset without failing.
- **NFR7 (Reliability):** Missing fields (e.g., absent coordinates) shall not cause system crashes; the system shall display fallback messages.

## 5.4 Security & Privacy
- **NFR8 (Security):** All network communication shall use HTTPS.
- **NFR9 (Privacy):** The system shall not permanently store or transmit the user’s geolocation data.
- **NFR10 (Privacy):** The system shall display a clear message explaining why location access is required before requesting permission.

## 5.5 Maintainability & Extensibility
- **NFR11 (Maintainability):** Data ingestion and parsing shall be implemented in a single, modular component to support easy updates.
- **NFR12 (Extensibility):** The system shall support switching or adding new datasets (e.g., other councils) through configuration rather than code changes.

## 5.6 Portability & Compatibility
- **NFR13 (Portability):** The system shall operate correctly on the latest and previous major versions of Chrome, Firefox, Edge, and Safari.

# 6. Traceability Matrix

This matrix links:
- **Use-Cases (UCs)** → **Functional Requirements (FRs)** → **Non-Functional Requirements (NFRs)**  
as required for full marks.

| FR ID | Functional Requirement Summary                          | Related Use-Case(s) | Linked NFR(s)        |
|-------|----------------------------------------------------------|----------------------|-----------------------|
| FR1   | Search by name/address/postcode                          | UC1                  | NFR1, NFR3, NFR4      |
| FR2   | Return matching search results                           | UC1                  | NFR4                  |
| FR3   | Browse by area/postcode                                  | UC2                  | NFR1, NFR3, NFR4      |
| FR4   | Display full rating details                              | UC3                  | NFR1, NFR3            |
| FR5   | Display rating breakdown (if available)                  | UC3                  | NFR1                  |
| FR6   | Request geolocation only when needed                     | UC4                  | NFR2, NFR8, NFR9      |
| FR7   | Compute distance to businesses                           | UC4                  | NFR4                  |
| FR8   | Show nearby businesses within radius                     | UC4                  | NFR2, NFR4            |
| FR9   | Handle denied/missing geolocation gracefully             | UC4                  | NFR2, NFR7            |
| FR10  | Filter by hygiene rating                                 | UC5                  | NFR1, NFR4            |
| FR11  | Filter by business type                                  | UC5                  | NFR1                  |
| FR12  | Sort by rating, distance, inspection date                | UC5                  | NFR4                  |
| FR13  | Display rating distribution chart                        | UC6                  | NFR4, NFR5            |
| FR14  | Display area-level summaries                             | UC6                  | NFR4, NFR5            |
| FR15  | Add business to favourites                               | UC7                  | NFR5, NFR6            |
| FR16  | View list of favourites                                  | UC7                  | NFR5, NFR6            |
| FR17  | Admin refresh dataset                                    | UC8                  | NFR6, NFR11           |
| FR18  | Display timestamp of last refresh                        | UC8                  | NFR11, NFR12          |

# 7. Acceptance Criteria

The system shall be considered complete when the following acceptance criteria are met.  
Each criterion maps directly to one or more Functional Requirements (FRs) and Non-Functional Requirements (NFRs).

---

### **7.1 Search & Browse**
- **AC1:** When a user enters a valid keyword (name/street/postcode), the system returns relevant businesses within **2 seconds**.  
  *Linked to: FR1, FR2, NFR4*

- **AC2:** Searching with invalid characters triggers a clear error message without a page reload.  
  *Linked to: FR1*

- **AC3:** Browsing by area/postcode displays the correct set of businesses for that location.  
  *Linked to: FR3*

---

### **7.2 View Rating Details**
- **AC4:** Selecting a business displays its full hygiene rating, date, and business details.  
  *Linked to: FR4, NFR1*

- **AC5:** If breakdown data exists, it is shown. If missing, the system displays “Not available” without error.  
  *Linked to: FR5, NFR7*

---

### **7.3 Location-Based (Near Me)**
- **AC6:** Pressing “Near me” triggers a geolocation permission request **only at that moment**.  
  *Linked to: FR6, NFR8*

- **AC7:** If permission is granted, businesses within the default radius are shown and correctly sorted by distance or rating.  
  *Linked to: FR7, FR8*

- **AC8:** If geolocation is denied/unavailable, a fallback option (e.g., postcode search) is displayed.  
  *Linked to: FR9, NFR2*

---

### **7.4 Filtering & Sorting**
- **AC9:** Filtering by rating correctly reduces the result set to only businesses meeting the selected criteria.  
  *Linked to: FR10*

- **AC10:** Sorting by rating, distance, or date produces correctly ordered results.  
  *Linked to: FR12*

- **AC11:** Applying filters/sorting updates the results **within 2 seconds**.  
  *Linked to: NFR4*

---

### **7.5 Visualisations & Statistics**
- **AC12:** At least one visualisation (bar/pie chart) renders successfully using aggregated dataset fields.  
  *Linked to: FR13*

- **AC13:** If visualisation libraries fail, a tabular fallback containing the same information is shown.  
  *Linked to: NFR5*

---

### **7.6 Favourites (Optional)**
- **AC14:** Pressing “Add to favourites” stores the selected business locally and updates the UI instantly.  
  *Linked to: FR15*

- **AC15:** The “My Favourites” page displays all previously saved favourites.  
  *Linked to: FR16*

- **AC16:** If local storage is unavailable, the system shows a clear message and continues functioning.  
  *Linked to: NFR6*

---

### **7.7 Administration (Optional)**
- **AC17:** Pressing “Refresh dataset” loads a new dataset and updates the timestamp.  
  *Linked to: FR17, FR18*

- **AC18:** If the API is unavailable, the system retains the cached dataset and notifies the admin.  
  *Linked to: NFR6, NFR11*

---

### **7.8 System Quality**
- **AC19:** The application displays correctly on screens from **360px to 1920px** width without horizontal scrolling.  
  *Linked to: NFR5*

- **AC20:** All user interface elements are keyboard-accessible and readable by screen readers.  
  *Linked to: NFR3*

- **AC21:** The system never transmits or stores user location data.  
  *Linked to: NFR9*

---


