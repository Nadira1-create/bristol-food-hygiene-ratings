# Requirements

## User Needs

### User stories

**General Public Users:**
- As a parent, I want to quickly search for food hygiene ratings near my child's school so that I can ensure they eat at safe establishments.
- As a health-conscious diner, I want to filter restaurants by hygiene rating so that I can choose only highly-rated establishments.
- As a tourist, I want to view hygiene ratings on a mobile-friendly interface so that I can make informed dining decisions while exploring Bristol.
- As a customer, I want to see the inspection date alongside the rating so that I know how current the information is.

**Registered Users:**
- As a registered user, I want to save my favourite establishments so that I can quickly access their hygiene information.
- As a community member, I want to report hygiene concerns so that potential food safety issues can be investigated.
- As a regular user, I want to receive notifications when my saved establishments are re-inspected so that I stay informed about any rating changes.

**Food Business Owners:**
- As a restaurant owner, I want customers to easily find my high hygiene rating so that I can attract more health-conscious diners.
- As a café manager, I want to monitor my establishment's rating so that I can address any issues promptly.

**Local Authority Inspectors:**
- As a food safety inspector, I want the public to access current ratings easily so that businesses are motivated to maintain high hygiene standards.
- As an environmental health officer, I want inspection data displayed accurately so that the public can make informed decisions.

**Public Health Advocates:**
- As a health researcher, I want to analyse hygiene rating trends across Bristol so that I can identify areas needing improvement.

### Actors

**1. General Public User (Primary Actor)**  
Members of the public seeking food hygiene information for Bristol establishments. They have varying technical abilities and access the system via mobile or desktop devices. Their goal is to quickly find and understand hygiene ratings to make safe dining choices.

**2. Registered User (Primary Actor)**  
Members of the public who create accounts to access enhanced features such as saving favourites, reporting concerns, and receiving notifications. They are regular users who want greater engagement with the platform.

**3. Food Business Owner/Manager (Secondary Actor)**  
Owners or managers of food establishments in Bristol who have a business interest in their hygiene ratings. They use the system to monitor their ratings and respond to customer feedback, aiming to showcase good hygiene standards.

**4. Local Authority Inspector (Secondary Actor)**  
Environmental health officers from Bristol City Council who conduct hygiene inspections. They ensure the accuracy of published ratings and use the platform's visibility to encourage businesses to maintain high standards.

**5. System Administrator (Supporting Actor)**  
Technical staff responsible for maintaining the application, updating data feeds from Bristol Open Data, moderating user reports, and ensuring system reliability and security.

### Use Cases

#### UC1: Search and View Food Hygiene Ratings

| **UC1** | **Search and View Food Hygiene Ratings** |
| --- | --- |
| **Description** | Users search for food establishments in Bristol by name, location, or postcode, then view detailed hygiene ratings including overall score, inspection date, and score breakdown. This addresses the core problem of making hygiene information easily accessible (Business Case - Problem Statement) and provides the user-friendly interface identified as a key business benefit. |
| **Actors** | General Public User, Registered User, Food Business Owner/Manager |
| **Assumptions** | Bristol Open Data Food Hygiene Ratings dataset is accessible and updated regularly; users have internet connectivity; search supports partial matching; rating scale (0-5) is standardised; approximately 42,000 establishments may show "Awaiting Inspection" status. |
| **Steps** | 1. User opens the web application<br>2. User enters search criteria (business name, address, or postcode)<br>3. System queries Bristol Open Data hygiene ratings database<br>4. System displays list of matching establishments with ratings<br>5. User applies optional filters (rating level, establishment type, location radius)<br>6. User selects an establishment<br>7. System displays detailed information: overall hygiene rating (0-5 stars), last inspection date, hygiene score breakdown (food handling, cleanliness, management), business details, compliance status<br>8. User can save establishment (if registered) or return to search |
| **Variations** | **V1.1:** No results found - System displays "No matches found" with suggestions to broaden search<br>**V1.2:** Awaiting inspection - System displays "Awaiting First Inspection" for unrated establishments with explanation<br>**V1.3:** Map view - User can view results on interactive map with colour-coded markers<br>**V1.4:** Mobile access - System provides responsive mobile interface |
| **Non-functional** | Search results must load within 2 seconds (Performance); interface must be intuitive for users with basic technical skills (Usability); system must support mobile and desktop browsers (Compatibility); colour-coding must be accessible to colourblind users (Accessibility) |
| **Issues** | Handling 42,000+ unrated new establishments; data synchronisation delays from Bristol Open Data; search algorithm optimisation for large datasets; explaining rating scale clearly to all users |

#### UC2: Report Hygiene Concern

| **UC2** | **Report Hygiene Concern** |
| --- | --- |
| **Description** | Registered users can submit reports about potential hygiene concerns at food establishments, creating accountability and user engagement (Business Benefit #4). Reports are moderated before being forwarded to relevant authorities, addressing the project scope requirement for business feedback and reporting. |
| **Actors** | Registered User (primary), System Administrator (receives and moderates reports) |
| **Assumptions** | User is registered and logged in; reporting form is accessible from establishment detail page; reports require moderation before publication; users understand reporting responsibilities; system has secure storage for sensitive reports. |
| **Steps** | 1. Registered user views establishment detail page<br>2. User clicks "Report Concern" button<br>3. System presents secure report form with fields: concern category (food handling, cleanliness, pests, other), detailed description (required), date of visit (optional), photo upload (optional)<br>4. User completes and submits form<br>5. System validates all required fields<br>6. System stores report securely and sends confirmation to user<br>7. System flags report for administrator review<br>8. Administrator reviews report and takes action: forward to Bristol City Council, request additional information, or dismiss if invalid |
| **Variations** | **V2.1:** Duplicate detection - System notifies user if similar concern recently reported for same establishment<br>**V2.2:** Urgent concerns - System highlights reports indicating immediate food safety risks (e.g., food poisoning)<br>**V2.3:** Anonymous reporting - System allows limited anonymous submissions with reduced detail requirements |
| **Non-functional** | Report submission must be secure and encrypted (Security); user privacy must be protected (Privacy); reports stored with full audit trail (Security); form must be simple and accessible (Usability); system must prevent spam/abuse through rate limiting (Reliability) |
| **Issues** | Balancing user privacy with accountability; preventing malicious or false reports; determining criteria for forwarding to authorities; legal implications of hosting user concerns; GDPR compliance for personal data in reports |

**Use-Case Diagram:** The use-case diagram should show UC1 and UC2 within the system boundary, with appropriate actor connections. UC1 connects to General Public User, Registered User, and Food Business Owner/Manager. UC2 connects to Registered User and System Administrator. A generalisation arrow should show Registered User inheriting from General Public User.

## Software Requirements Specification

### Functional Requirements

**Search and Discovery (from UC1):**

**FR1:** The system shall provide a search function allowing users to search for food establishments by business name, address, or postcode.
- Source: UC1

**FR2:** The system shall support partial name matching in search queries, returning all establishments containing the search term.
- Source: UC1

**FR3:** The system shall display search results as a list showing business name, address, and overall hygiene rating.
- Source: UC1

**FR4:** The system shall allow users to filter establishments by hygiene rating level (0, 1, 2, 3, 4, 5 stars, or "Awaiting Inspection").
- Source: UC1

**FR5:** The system shall allow users to filter establishments by establishment type (e.g., restaurant, takeaway, café, pub).
- Source: UC1

**FR6:** The system shall allow users to filter establishments by location radius from a specified postcode.
- Source: UC1

**FR7:** The system shall display a "No matches found" message with search suggestions when no results are returned.
- Source: UC1 - Variation V1.1

**Data Display (from UC1):**

**FR8:** The system shall display detailed hygiene information for each establishment including: overall hygiene rating (0-5), last inspection date, hygiene score breakdown (food handling, cleanliness, management), business name and address, establishment type, and compliance status.
- Source: UC1

**FR9:** The system shall clearly indicate establishments that are "Awaiting First Inspection" with an explanatory message for the 42,000+ unrated premises.
- Source: UC1 - Variation V1.2

**FR10:** The system shall retrieve and display food hygiene ratings data from the Bristol Open Data Food Hygiene Ratings dataset.
- Source: UC1

**FR11:** The system shall provide an interactive map view displaying establishments as colour-coded markers according to their hygiene rating (Green: 5-star, Light Green: 4-star, Yellow: 3-star, Orange: 2-star, Red: 0-1 star, Grey: Awaiting Inspection).
- Source: UC1 - Variation V1.3

**User Account Features (from UC1):**

**FR12:** The system shall allow registered users to save favourite establishments for quick access.
- Source: UC1

**FR13:** The system shall provide user account registration and login functionality.
- Source: UC1, UC2

**Reporting Functionality (from UC2):**

**FR14:** The system shall restrict the report submission feature to registered and logged-in users only.
- Source: UC2

**FR15:** The system shall provide a "Report Concern" button on each establishment detail page.
- Source: UC2

**FR16:** The system shall present a report form with the following fields: concern category (dropdown: food handling, cleanliness, pests, other), detailed description (required text field), date of visit (optional date field), and photo upload (optional file upload).
- Source: UC2

**FR17:** The system shall validate that all required fields are completed before allowing report submission.
- Source: UC2

**FR18:** The system shall send a confirmation notification to users upon successful report submission.
- Source: UC2

**FR19:** The system shall flag submitted reports for administrator review before publication or forwarding to authorities.
- Source: UC2

**FR20:** The system shall detect and notify users if a similar concern has been recently reported for the same establishment.
- Source: UC2 - Variation V2.1

**FR21:** The system shall allow administrators to review reports and take actions: forward to Bristol City Council, request additional information, or dismiss as invalid.
- Source: UC2

### Non-Functional Requirements

**Performance (Quality Attribute: Efficiency):**

**NFR1:** The system shall load search results within 2 seconds for 95% of queries.
- Source: UC1

**NFR2:** The system shall load the establishment detail page within 1.5 seconds.
- Source: UC1

**NFR3:** The system shall apply filters and refresh results within 500 milliseconds.
- Source: UC1

**Usability (Quality Attribute: Usability):**

**NFR4:** The system shall be usable by individuals with basic computer literacy without requiring training or technical support.
- Source: UC1

**NFR5:** The system shall provide clear explanations of the hygiene rating scale (0-5) accessible from any page.
- Source: UC1

**NFR6:** The system shall provide intuitive error messages and guidance when search returns no results.
- Source: UC1

**NFR7:** The system shall present the report submission form with clear labels and help text for each field.
- Source: UC2

**Compatibility (Quality Attribute: Portability):**

**NFR8:** The system shall function correctly on the latest two versions of major browsers (Chrome, Firefox, Safari, Edge).
- Source: UC1

**NFR9:** The system shall provide a fully responsive interface that adapts to mobile devices (smartphones and tablets) and desktop screens.
- Source: UC1 - Variation V1.4

**Accessibility (Quality Attribute: Usability):**

**NFR10:** The system shall use colour-coding that is distinguishable to users with colour vision deficiency (colourblind-accessible palette).
- Source: UC1

**NFR11:** The system shall maintain minimum text contrast ratio of 4.5:1 for readability (WCAG AA standard).
- Source: UC1

**Security (Quality Attribute: Security):**

**NFR12:** The system shall encrypt all report submissions both in transit (HTTPS) and at rest (encrypted database storage).
- Source: UC2

**NFR13:** The system shall protect user privacy by not publicly displaying personal information from reports without consent.
- Source: UC2

**NFR14:** The system shall store all reports with a complete audit trail including submission timestamp, user ID, and administrator actions.
- Source: UC2

**NFR15:** The system shall implement rate limiting on report submissions to prevent spam and abuse (maximum 5 reports per user per day).
- Source: UC2

**Reliability (Quality Attribute: Reliability):**

**NFR16:** The system shall maintain 99% uptime during standard operating hours (6am-11pm).
- Source: UC1, UC2

**NFR17:** The system shall gracefully handle Bristol Open Data service unavailability by displaying cached data with a staleness warning.
- Source: UC1

**Data Integrity (Quality Attribute: Reliability):**

**NFR18:** The system shall synchronise with Bristol Open Data Food Hygiene Ratings dataset at least once daily to ensure current information.
- Source: UC1

**NFR19:** The system shall display the last data update timestamp on the application homepage.
- Source: UC1

**Legal Compliance (Quality Attribute: Security):**

**NFR20:** The system shall comply with GDPR requirements for personal data storage, processing, and deletion in user reports.
- Source: UC2
