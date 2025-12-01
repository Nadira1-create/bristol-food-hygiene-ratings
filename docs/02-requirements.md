Requirements
User Needs
User Stories

These user stories describe how the main actors interact with the Bristol Food Hygiene Ratings Web Application.

As a citizen, I want to search for food businesses so that I can quickly find their hygiene rating.

As a citizen, I want to browse by postcode or area so that I can explore food options in a particular location.

As a citizen, I want to view full hygiene rating details so that I can make informed decisions about where to eat.

As a citizen, I want to find highly rated food businesses near my current location so that I can decide where to eat nearby.

As a citizen, I want to filter and sort results so that I can easily compare food businesses.

As a citizen, I want to view rating statistics and visualisations so that I can understand food safety trends in Bristol.

As a citizen, I want to save favourite businesses so that I can access them quickly in future.

As a council stakeholder, I want to view rating statistics so that I can analyse hygiene patterns across the city.

As an admin, I want to refresh the dataset so that the system always shows up-to-date hygiene data.

Actors
Actor	Description
Public User	Main user. Searches, browses, filters, views ratings, statistics, and favourites.
Council Stakeholder	Uses statistics and visualisations to analyse city-wide hygiene performance.
Admin	(Optional) Refreshes the dataset to ensure the system displays current data.
Use Cases
Use-Case Summary Table
Use-Case ID	Use-Case Name
UC1	Search for food businesses
UC2	Browse by area / postcode
UC3	View full rating details
UC4	Find businesses near my location
UC5	Filter and sort results
UC6	View rating statistics / visualisations
UC7	Manage favourites (optional)
UC8	Admin: Refresh dataset (optional)
Detailed Use-Case Descriptions
UC1 – Search for Food Businesses
Field	Description
Description	Allows users to search for food businesses by name, postcode, or address.
Actors	Public User
Assumptions	Dataset is loaded; user enters valid input.
Steps	1. User enters search text.
2. System validates input.
3. System searches dataset.
4. System displays matching businesses.
Variations	No results found → show message; invalid input → ask user to correct.
Non-functional	NFR1 (Usability), NFR4 (Performance)
Issues	Should synonyms (e.g., cafe vs café) be normalised?
UC2 – Browse by Area / Postcode
Field	Description
Description	Users browse food businesses by area or postcode.
Actors	Public User
Assumptions	Dataset includes postcode and area fields.
Steps	1. User selects area/postcode.
2. System displays matching businesses.
Variations	No businesses in area → show message.
Non-functional	NFR1, NFR5
UC3 – View Full Rating Details
Field	Description
Description	Displays detailed hygiene information for a selected business.
Actors	Public User, Council Stakeholder
Assumptions	Business exists in dataset.
Steps	1. User selects business.
2. System displays rating, date, business type, and other details.
Variations	Missing data → show “data unavailable”.
Non-functional	NFR3 (Accessibility)
UC4 – Find Businesses Near My Location
Field	Description
Description	Uses the device’s geolocation to find nearby businesses.
Actors	Public User
Assumptions	User grants geolocation permission.
Steps	1. User selects Near me.
2. Browser requests permission.
3. System retrieves coordinates.
4. System calculates distances.
5. Results displayed.
Variations	Permission denied → provide fallback search.
Non-functional	NFR7, NFR8, NFR9, NFR10
UC5 – Filter and Sort Results
Field	Description
Description	Allows filtering by rating or business type and sorting results.
Actors	Public User
Assumptions	Dataset includes rating, date, and type.
Steps	User selects filters → system updates list.
Variations	None.
Non-functional	NFR1
UC6 – View Rating Statistics / Visualisations
Field	Description
Description	Displays charts showing distribution of ratings and area-level statistics.
Actors	Public User, Council Stakeholder
Assumptions	Chart library loads correctly.
Steps	1. User opens statistics page.
2. System calculates summaries.
3. System renders charts.
Variations	Missing fields → simplified chart.
Non-functional	NFR4
UC7 – Manage Favourites (Optional)
Field	Description
Description	Users save or remove favourite businesses.
Actors	Public User
Assumptions	Browser supports localStorage.
Steps	User adds/removes favourites → system updates stored list.
Variations	None.
Non-functional	NFR6
UC8 – Admin: Refresh Dataset (Optional)
Field	Description
Description	Admin refreshes dataset from the Bristol Open Data API.
Actors	Admin
Assumptions	API is online.
Steps	1. Admin selects Refresh data.
2. System fetches API data.
3. System updates cached dataset.
Variations	API unavailable → load cached data.
Non-functional	NFR11, NFR12
Use-Case Diagram Placeholder
![Insert your Use-Case Diagram Here](images/use-case.png)

Software Requirements Specification
Functional Requirements (FR)
ID	Requirement	Source
FR1	The system shall allow users to search by business name, postcode, or address.	UC1
FR2	The system shall display search results that match user input.	UC1
FR3	The system shall allow browsing by area or postcode.	UC2
FR4	The system shall display full hygiene rating details for a selected business.	UC3
FR5	The system should display rating breakdowns and inspection history where available.	UC3
FR6	The system shall request geolocation permission only when the user selects “Near me”.	UC4
FR7	The system shall calculate distances using the Haversine (or equivalent) formula.	UC4
FR8	The system shall display nearby businesses within a configurable radius.	UC4
FR9	The system shall handle denied geolocation access gracefully by offering alternatives.	UC4
FR10	The system shall allow filtering businesses by hygiene rating.	UC5
FR11	The system should allow filtering by business type.	UC5
FR12	The system shall allow sorting results by rating, distance, or date.	UC5
FR13	The system should display rating distribution charts.	UC6
FR14	The system may display area-level rating summaries.	UC6
FR15	The system may allow users to save favourite businesses.	UC7
FR16	The system may provide a page for viewing all saved favourites.	UC7
FR17	The system should allow an admin to refresh the dataset.	UC8
FR18	The system should display the timestamp of the last dataset refresh.	UC8
Non-Functional Requirements (NFR)
ID	Requirement	Source
NFR1	The search bar must appear on the first screen without scrolling.	UC1
NFR2	The system must provide an alternative search path if geolocation fails.	UC4
NFR3	All UI components must be screen-reader compatible and keyboard navigable.	UC3
NFR4	Results must load within 2 seconds for datasets of up to 5,000 entries.	UC1, UC6
NFR5	The interface must be responsive on screens between 360px and 1920px wide.	UC2
NFR6	Favourites must persist using local browser storage.	UC7
NFR7	Missing geolocation data must not cause system errors.	UC4
NFR8	Location permission must be requested only when necessary.	UC4
NFR9	User location data must never be stored on a server or shared with third parties.	UC4
NFR10	The system must explain why geolocation permission is required before prompting.	UC4
NFR11	Data ingestion must be implemented as a separate module to support maintainability.	UC8
NFR12	The system must allow new datasets to be added without major code changes.	UC8
NFR13	The system must work on the most recent and previous versions of major browsers (Chrome, Safari, Edge, Firefox).	All UCs
