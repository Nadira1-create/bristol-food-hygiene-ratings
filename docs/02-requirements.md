# Requirements

## User Needs

## User Stories

### General Public Users

- **As a parent**, I want to quickly search for food hygiene ratings near my child’s school so that I can ensure they eat at safe establishments.
- **As a health-conscious diner**, I want to filter restaurants by hygiene rating so that I can choose only highly rated establishments.
- **As a tourist**, I want to view hygiene ratings on a mobile-friendly interface so that I can make informed dining decisions while exploring Bristol.
- **As a customer**, I want to see the inspection date alongside the rating so that I know how current the information is.

---

### Registered Users

- **As a registered user**, I want to save my favourite establishments so that I can quickly access their hygiene information.
- **As a community member**, I want to report hygiene concerns so that potential food safety issues can be investigated.
- **As a regular user**, I want to receive notifications when my saved establishments are re-inspected so that I stay informed about any rating changes.

---

# Actors

## General Public User (Primary Actor)

Members of the public seeking food hygiene information for Bristol establishments. They have varying technical abilities and access the system via mobile or desktop devices. Their goal is to quickly find and understand hygiene ratings to make safe dining choices.

---

## Registered User (Primary Actor)

Members of the public who create accounts to access enhanced features such as saving favourites, reporting concerns, and receiving notifications. They are regular users who want greater engagement with the platform.


---

## System Administrator (Supporting Actor)

Technical staff responsible for maintaining the application, updating data feeds from Bristol Open Data, moderating user reports, and ensuring system reliability and security.


# Software Requirements Specification

## Functional Requirements

### Search and Discovery (from UC1)

**FR1:** The system shall provide a search function allowing users to search for food establishments by business name, address, or postcode.  
**Source:** UC1  

**FR2:** The system shall support partial name matching in search queries, returning all establishments containing the search term.  
**Source:** UC1  

**FR3:** The system shall display search results as a list showing business name, address, and overall hygiene rating.  
**Source:** UC1  

**FR4:** The system shall allow users to filter establishments by hygiene rating level (0, 1, 2, 3, 4, 5 stars, or “Awaiting Inspection”).  
**Source:** UC1  

**FR5:** The system shall allow users to filter establishments by establishment type (e.g. restaurant, takeaway, café, pub).  
**Source:** UC1  

**FR6:** The system shall allow users to filter establishments by location radius from a specified postcode.  
**Source:** UC1  

**FR7:** The system shall display a “No matches found” message with search suggestions when no results are returned.  
**Source:** UC1 – Variation V1.1  

---

### Data Display (from UC1)

**FR8:** The system shall display detailed hygiene information for each establishment including:
- Overall hygiene rating (0–5)  
- Last inspection date  
- Hygiene score breakdown (food handling, cleanliness, management)  
- Business name and address  
- Establishment type  
- Compliance status  

**Source:** UC1  

**FR9:** The system shall clearly indicate establishments that are “Awaiting First Inspection” with an explanatory message for the 42,000+ unrated premises.  
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

---

### User Account Features (from UC1)

**FR12:** The system shall allow registered users to save favourite establishments for quick access.  
**Source:** UC1  

**FR13:** The system shall provide user account registration and login functionality.  
**Source:** UC1, UC2  

---

### Reporting Functionality (from UC2)

**FR14:** The system shall restrict the report submission feature to registered and logged-in users only.  
**Source:** UC2  

**FR15:** The system shall provide a “Report Concern” button on each establishment detail page.  
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

---

## Non-Functional Requirements

### Performance (Quality Attribute: Efficiency)

**NFR1:** The system shall load search results within 2 seconds for 95% of queries.  
**Source:** UC1  

**NFR2:** The system shall load the establishment detail page within 1.5 seconds.  
**Source:** UC1  

**NFR3:** The system shall apply filters and refresh results within 500 milliseconds.  
**Source:** UC1  

---

### Usability (Quality Attribute: Usability)

**NFR4:** The system shall be usable by individuals with basic computer literacy without requiring training or technical support.  
**Source:** UC1  

**NFR5:** The system shall provide clear explanations of the hygiene rating scale (0–5) accessible from any page.  
**Source:** UC1  

**NFR6:** The system shall provide intuitive error messages and guidance when search returns no results.  
**Source:** UC1  

---

### Compatibility (Quality Attribute: Portability)

**NFR8:** The system shall function correctly on the latest two versions of major browsers (Chrome, Firefox, Safari, Edge).  
**Source:** UC1  

**NFR9:** The system shall provide a fully responsive interface that adapts to mobile devices (smartphones and tablets) and desktop screens.  
**Source:** UC1 – Variation V1.4  

---

### Accessibility (Quality Attribute: Usability)

**NFR10:** The system shall use colour-coding that is distinguishable to users with colour vision deficiency (colour-blind-accessible palette).  
**Source:** UC1  

**NFR11:** The system shall maintain a minimum text contrast ratio of 4.5:1 for readability (WCAG AA standard).  
**Source:** UC1  

---

### Reliability (Quality Attribute: Reliability)

**NFR16:** The system shall maintain 99% uptime during standard operating hours (6am–11pm).  
**Source:** UC1, UC2  

**NFR17:** The system shall gracefully handle Bristol Open Data service unavailability by displaying cached data with a staleness warning.  
**Source:** UC1  

---

### Data Integrity (Quality Attribute: Reliability)

**NFR18:** The system shall synchronise with the Bristol Open Data Food Hygiene Ratings dataset at least once daily to ensure current information.  
**Source:** UC1  

**NFR19:** The system shall display the last data update timestamp on the application homepage.  
**Source:** UC1  

---

### Legal Compliance (Quality Attribute: Security)

**NFR20:** The system shall comply with GDPR requirements for personal data storage, processing, and deletion in user reports.  
**Source:** UC2  
