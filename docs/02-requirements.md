# User Stories

**US1:** As a member of the public, I want to search for food businesses by name or location so that I can quickly find hygiene ratings for restaurants I'm interested in visiting.

**US2:** As a health-conscious consumer, I want to filter food businesses by hygiene rating score so that I can easily identify establishments with excellent hygiene standards.

**US3:** As a concerned diner, I want to view detailed inspection results including the date of the last inspection so that I can make informed decisions about food safety.

**US4:** As a registered user, I want to create and manage my account so that I can save my favourite businesses and receive updates about their ratings.

**US5:** As a consumer, I want to report hygiene concerns or issues at food establishments so that authorities can be alerted to potential health risks.

**US6:** As a food business owner, I want to view my business's hygiene rating as displayed to the public so that I can understand how my establishment is perceived and identify areas for improvement.

**US7:** As a parent, I want to filter businesses by category (e.g., schools, cafes, restaurants) so that I can find appropriate and safe dining options for my family.

**US8:** As a public user, I want to view hygiene ratings without creating an account so that I can access important health information immediately without barriers.

**US9:** As a business owner, I want to see feedback submitted about my establishment so that I can address customer concerns and maintain high hygiene standards.

# Actors

## 1. General Public User (Unregistered)
A member of the public who accesses the application without creating an account to view food hygiene ratings and make informed dining decisions. This user has view-only access to browse, search, and filter food businesses but cannot save preferences or submit reports.

## 2. Registered User
A consumer who creates an account to access enhanced features. This user can save favourite businesses, receive notifications about rating changes, report hygiene concerns, and manage their personal account settings.

## 3. Food Business Owner
An owner or manager of a food establishment (restaurant, takeaway, cafe, etc.) who uses the platform to monitor their publicly displayed hygiene rating and review customer feedback about their business.

## 4. Parent/Guardian
A consumer specifically focused on finding safe and hygienic dining options suitable for children and families. This actor prioritises filtering by family-friendly categories and establishments with high hygiene standards.

## 5. System Administrator
Technical personnel responsible for maintaining the application, synchronising data from Open Bristol datasets, managing user accounts, ensuring system security, and handling technical issues.

## 6. Local Authority / Food Safety Inspector
Government officials who conduct food hygiene inspections and maintain the source data. They interact indirectly with the system as data providers through the Open Bristol datasets.

# UC2 Report Hygiene Concern

| Element | Details |
|---------|---------|
| **Description** | Allow users to submit hygiene concern reports about food establishments, creating an interactive feedback mechanism that promotes accountability and alerts authorities to health risks. This supports business benefits of "user engagement and feedback" and "encourages hygiene improvements." |
| **Sources** | US5, US9; Business Benefits 4 & 6; Expected Risk 1. |
| **Actors** | **Primary:** Registered User, General Public User (Unregistered)<br>**Secondary:** System, Food Business Owner, System Administrator |
| **Assumptions** | |
| **Pre-conditions** | • Establishment exists in database<br>• User has viewed establishment details<br>• Report submission functional |
| **Post-conditions** | • Report stored in database<br>• User receives confirmation<br>• Business owner notified (if registered)<br>• User identity anonymised |

## Steps
1. User viewing establishment details clicks "Report Hygiene Concern"
2. System displays form: concern category (dropdown), visit date (datepicker), description (500 chars), optional email, confirmation checkbox
3. User selects category
4. User enters visit date
5. User provides description
6. User provides email (optional if unregistered)
7. User checks confirmation
8. User submits report
9. System validates fields
10. System performs content moderation
11. System assigns Report ID and timestamp
12. System stores report as "Pending Review"
13. System anonymises user identity
14. System displays confirmation with Report ID
15. System emails business owner (if registered)
16. System flags report for administrator review

# UC1 Search and View Food Hygiene Ratings

| Element | Details |
|---------|---------|
| **Description** | Enable users to search for food establishments by name, location, or category, apply filters by hygiene rating, and view detailed inspection information. This addresses the problem that "members of the public struggle to find easy-to-understand food hygiene ratings" and fulfils business benefits of a "user-friendly interface" with "real time data access." |
| **Sources** | US1, US2, US3, US7, US8; Business Case Problem Statement; Business Benefits 1 & 5. |
| **Actors** | **Primary:** General Public User (Unregistered), Registered User, Parent/Guardian<br>**Secondary:** System |
| **Assumptions** | |
| **Pre-conditions** | • System has synchronised data from Open Bristol dataset<br>• Database contains current ratings<br>• Application is accessible |
| **Post-conditions** | • Search results displayed<br>• User viewed hygiene information<br>• Search query logged (anonymised) |

## Steps
1. User navigates to homepage
2. User enters search criteria (name, postcode, address) OR selects category filter
3. System validates input and queries database
4. System retrieves and displays matching establishments with: name, address, rating (0-5), date
5. User applies optional filters: rating range, distance, business type
6. System refines results
7. User selects establishment
8. System displays: business name/address, hygiene rating (0-5 or "Awaiting Inspection"), inspection date, breakdown scores (food handling, cleanliness, management), business type, local authority
9. User reviews information

# Software Requirements Specification

## Functional Requirements

### UC1: Search and View Food Hygiene Ratings

**FR1:** The system shall allow users to search for food establishments by name, postcode, or address.  
*Source: UC1, US1*

**FR2:** The system shall enable users to filter establishments by hygiene rating score (0-5).  
*Source: UC1, US2*

**FR3:** The system shall enable users to filter establishments by business category (restaurant, café, takeaway, school, pub/bar, hotel).  
*Source: UC1, US7*

**FR4:** The system shall display search results showing business name, address, hygiene rating, and inspection date.  
*Source: UC1*

**FR5:** The system shall display detailed establishment information including rating breakdown scores for food handling, cleanliness, and management.  
*Source: UC1, US3*

**FR6:** The system shall indicate establishments with "Awaiting Inspection" status when no rating is available.  
*Source: UC1*

**FR7:** The system shall allow unregistered users to view all hygiene information without creating an account.  
*Source: UC1, US8*

**FR8:** The system shall allow registered users to save favourite establishments and receive notifications for rating updates.  
*Source: UC1, US4*

**FR9:** The system shall enable users to create accounts with email and password, and manage account settings.  
*Source: UC1, US4*

### UC2: Report Hygiene Concern

**FR10:** The system shall provide a "Report Hygiene Concern" button on establishment detail pages.  
*Source: UC2, US5*

**FR11:** The system shall display a report form with fields for concern category, visit date, description (500 characters max), and optional email.  
*Source: UC2*

**FR12:** The system shall validate all required fields before accepting report submission.  
*Source: UC2*

**FR13:** The system shall assign a unique Report ID and store reports with "Pending Review" status.  
*Source: UC2*

**FR14:** The system shall anonymise user identity in all stored reports.  
*Source: UC2*

**FR15:** The system shall send email notification to registered business owners when a report is submitted about their establishment.  
*Source: UC2, US9*

**FR16:** The system shall automatically synchronise data from Open Bristol datasets at regular intervals.  
*Source: UC1, UC2*

## Non-Functional Requirements

### Usability (ISO/IEC 9126)

**NFR1:** The system shall provide an intuitive interface enabling users to complete searches within 3 clicks from the homepage.  
*Source: UC1*

**NFR2:** The system shall be fully functional on mobile, tablet, and desktop devices with responsive design.  
*Source: UC1*

**NFR3:** The system shall comply with WCAG 2.1 Level AA accessibility standards.  
*Source: UC1*

### Performance (ISO/IEC 9126)

**NFR4:** The system shall return search results within 2 seconds for 95% of queries.  
*Source: UC1*

**NFR5:** The system shall support at least 500 concurrent users without performance degradation.  
*Source: UC1*

### Security (ISO/IEC 9126)

**NFR6:** The system shall encrypt all user passwords using bcrypt before storage and use HTTPS for all data transmission.  
*Source: UC2*

**NFR7:** The system shall anonymise user identity in hygiene reports to protect privacy.  
*Source: UC2*

**NFR8:** The system shall validate and sanitise all user inputs to prevent SQL injection and XSS attacks.  
*Source: UC1, UC2*

### Reliability (ISO/IEC 9126)

**NFR9:** The system shall maintain 99% uptime during operational hours (6:00 AM - 11:00 PM).  
*Source: UC1*

**NFR10:** The system shall implement automated daily database backups.  
*Source: UC1, UC2*

# Use Case Diagram

![Bristol Food Hygiene Ratings Web App Use Case Diagram showing actors (General Public User, Registered User, Food Business Owner, Local Authority/Food Safety Inspector, Parent/Guardian, and System Administrator) and two main use cases (UC1: Search and View Food Hygiene Ratings, UC2: Report Hygiene Concern) within the Bristol Food Hygiene Ratings Web App system boundary]
