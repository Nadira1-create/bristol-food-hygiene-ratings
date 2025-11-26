Requirments Specification
Bristol Food Hygiene Ratings Web Application

1. Introduction
1.1 Purpose
This Software Requirements Specification (SRS) defines all functional and non-functional requirements for the Bristol Food Hygeiene Ratings Web Application. The system enables citizens to explore, understand, and compare offcial Food Hygiene  Ratings for food businesses in Bristol using open data.

This document is intended for:
* Teaching staff assessing the portofolio
* Student developer(S) implementing the system
*Future maintainers extending the system
  
1.2 Scope
The application will:
* Consume Bristol Open Data FHRS dataset
* Allow users to search, browse and filter food businesses
* Provide location-based ("Near me") discovery
* Display rating visulisations and statistics
* (Optional) Provide favourites and admin dataset refresh

Out of scope:
* Editing ratings
* Business login
* Real-time inspection data
* Authentication (optional stretch)

1.3 Definitions & Abbreviations
FHRS - Food Hygiene Rating Scheme
FR - Functional Requirement
NFR - Non-Functional Requirement
Actor - Role interacting with the system
Use-case - User-centred description of system behvaviour

1.4 Stakeholders
| Stakeholder | Interest |
|---|---|
| Citizen | Acess reliable hygiene information |
| Enviormental Health Officers | Transparent public data |
| Local Businesses | visibility of hygiene ratings |
| University Assessors | Evaluate requirements engineering |

1.5 Assumptions & Dependencies
* Bristol FHRS data set availabe in JSON/CSV format
* Dataset includes names, address, postcode, rating, date, and coordinates
* Browser supports HTML5, JavaScript, HTTPS
* Geolocation requires navigator.geolocation
* Internet access OR bundled dataset fallback

  2. Overal Description
  2.1 Syste, Perspective
  The application is a browser-web system that retrieves data from:
* BristolOpen Data API
* OR a static cached dataset (fallback)

Architecture:
* UI Layer - pages, search bar, filters, map
* Logic Layer - search/filtering, geolocation, osrting
* Dat Layer - hygiene ratings datset, cached mechanism

2.2 Product Functions
* Search businesses by name/address/postcode
* Briwse by area
* View rating details
* Find nearby businesses
* Filter & sort
* Visualise rating summaries
* (optional) Save favourites
* (optional) Admin dataset refresh

  2.3 User Classes
  * Public User - primary audience
  * Council Stskeholder - uses statistics
  * Admin - rereshes datset (optional)

  2.4 Operating Enviorment
  * Chrome, Edge, Firefox, Safari
  * Smartphones, tablets, desktops
  * HTTPS
  * Optional OpenStreetMap or Leaflet

  2.5 Constraints
  * Must use open data license
  * Must not modify FHRS rating
  * Dataset size may impact performance
 
  3 Use-Case Model
  3.1 Use-case Diagram
  (Insert my diagram here)

  3.2

