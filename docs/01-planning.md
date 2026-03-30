# Project Proposal

## Business Case

### Problem Statement

Food hygiene information is a matter of public health, yet accessing it in Bristol remains unnecessarily difficult. The primary official source, the Food Standards Agency (FSA) ratings portal, is not optimised for mobile use, provides limited filtering capability, and requires users to navigate through multiple pages to find information about a single business. Local council websites present the same data in similarly inaccessible formats. For most members of the public, particularly first-time visitors to Bristol or those searching quickly before choosing where to eat, these platforms fail to deliver the information in a timely or understandable way.

The underlying data exists and is publicly available through the Open Bristol dataset, which provides up-to-date records for all food businesses in the city, including hygiene rating scores, inspection dates, rating statuses, and business type classifications. The problem is not data availability but rather presentation and accessibility. The dataset is published in a machine-readable format intended for developers, not for general public use. Members of the public who attempt to access it directly face large file downloads and raw tabular data with no filtering or visualisation tools, making the information practically unusable without technical knowledge.

A further challenge is the significant number of unrated premises currently operating in the city. Over 42,000 newly registered food businesses nationally have not yet received their first hygiene inspection, with a notable proportion of this figure located in Bristol. This means a large segment of the local food market operates without any publicly available hygiene information. This creates uncertainty for health-conscious consumers and places additional responsibility on any application serving this need to communicate clearly when a rating is unavailable, and to explain why.

A modern, purpose-built web application is therefore needed to bridge the gap between the available data and the public's ability to use it effectively. The proposed application will provide a clean, responsive, and accessible interface through which any member of the public can search for food businesses in Bristol, filter results by rating score and business type, and view full inspection records, all without requiring an account or any prior technical knowledge.

---

### Business Benefits

**1. Improved Public Health Outcomes**
By making food hygiene ratings readily accessible to a wide audience, the application supports more informed decision-making when choosing where to eat. Consumers who can easily identify highly rated establishments are better positioned to avoid premises with poor hygiene standards, directly contributing to a reduction in the risk of foodborne illnesses across the city. The Food Standards Agency (2023) estimates that there are approximately 2.4 million cases of foodborne illness in the United Kingdom each year, many of which are linked to poor hygiene practices in food premises. Improving public access to hygiene information is therefore a meaningful contribution to preventative public health.

**2. User-Friendly and Accessible Interface**
The application is designed to be navigable within three interactions from the homepage, with a fully responsive layout that functions correctly on mobile phones, tablets, and desktop computers. This ensures that all members of the public, including those with limited technical experience, can access hygiene information quickly and without frustration, regardless of the device they are using. The interface will comply with WCAG 2.1 Level AA accessibility standards, ensuring it is usable by people with visual impairments, motor difficulties, or other accessibility needs.

**3. Data Transparency and Public Accountability**
Food hygiene ratings are presented exactly as issued by the local authority, with no modification or selective omission. The application clearly communicates each business's rating score, inspection date, rating status, and any pending rating updates. This full transparency holds food businesses publicly accountable for their hygiene practices and gives consumers the complete picture they need to make genuinely informed decisions about where to eat.

**4. Competitive Incentive for Business Improvement**
When ratings are prominently displayed and easily searchable, businesses with high hygiene scores gain a visible competitive advantage over lower-rated competitors. This creates an ongoing incentive for food premises to maintain and improve their hygiene practices in order to attract health-conscious customers. Research from the Chartered Institute of Environmental Health (CIEH, 2021) indicates that businesses with higher hygiene ratings report greater consumer confidence and repeat custom, suggesting that visibility of ratings creates a measurable commercial motivation for improvement.

**5. Real-Time Access to Current Inspection Data**
The application retrieves data directly from the Open Bristol Data API, ensuring that users always see the most recently published inspection results rather than a static snapshot. Unlike infrequently updated published lists or downloadable spreadsheets, the application reflects the current state of the dataset at the time of each search, providing a more reliable and trustworthy experience for users who need to make time-sensitive decisions.

**6. Barrier-Free Public Access**
All features of the application are available without registration, login, or any account creation. Food hygiene rating information is a public resource, and removing all access barriers ensures that the widest possible audience, including tourists, students, parents, and first-time visitors to Bristol, can benefit from the platform immediately and without any prior commitment or personal data disclosure.

---

### Options Considered

**1. Food Standards Agency (FSA) National Portal**
The FSA website provides a national food hygiene ratings search tool covering all registered businesses in England, Wales, and Northern Ireland. However, it is not optimised for mobile browsing, does not support simultaneous filtering by both rating score and business type, and requires multiple page loads to retrieve detailed information about a specific business. The user experience is functional but dated, and the platform does not make use of the richer data fields available through the Open Bristol dataset, such as the new rating pending indicator and inspection date visibility at the results list level.

**2. Bristol City Council and Local Authority Websites**
Bristol City Council publishes some food hygiene information via its website and directs users to the FSA portal for detailed records. Like the FSA portal, these local authority pages were not designed with ease of use as a primary goal. The interface is not responsive, and there is no dedicated search or filter functionality that would allow a user to quickly identify the highest-rated restaurants or takeaways in a particular postcode area. The data is not integrated into a purpose-built application and is therefore difficult to navigate efficiently.

**3. Open Bristol Data Platform**
The Open Bristol dataset contains the most granular and up-to-date food hygiene data available for the city, including all of the fields required for this application. However, the platform is designed for data analysts and developers rather than members of the general public. The data is published in CSV and API formats with no accompanying visual interface, and the volume of records makes manual browsing impossible. Members of the public cannot realistically use this source without technical assistance, which defeats the purpose of the data being publicly available.

**4. Third-Party Review and Discovery Applications**
Platforms such as Google Maps, Tripadvisor, and Yelp occasionally surface food hygiene rating information alongside user reviews and star ratings. However, these platforms aggregate many types of feedback, meaning hygiene ratings, where they appear at all, are not prominently presented and may be out of date. The primary purpose of these platforms is not hygiene transparency, and users specifically seeking this information are not well served by them. There is also no guarantee that ratings sourced from these platforms reflect the most current inspection outcomes.

**5. Proposed Solution: Purpose-Built Bristol Food Hygiene Web Application**
Developing a dedicated web application provides complete control over the user interface, data presentation, and functionality. It allows the development team to design an experience focused entirely on hygiene rating accessibility, using the Open Bristol API as a live data source. This option is the only one that can simultaneously address mobile responsiveness, advanced filtering, full data transparency, and barrier-free public access within the scope of this project. It also allows the team to handle edge cases specific to the Bristol dataset, such as the large proportion of unrated businesses, in a way that is clear and informative for the user.

---

### Expected Risks

**Risk 1: Open Bristol API Unavailability or Data Inconsistency**
The application depends entirely on the Open Bristol Data API for all food hygiene records. If the API experiences downtime, changes its data structure, or returns incomplete records, the application will be unable to display results. Additionally, inspection data is published by local authorities on a variable schedule, meaning there may be periods where the displayed information does not yet reflect the outcome of the most recent inspection visit.

*Likelihood:* Medium. Public APIs maintained by local authorities are generally reliable but are subject to unannounced changes and occasional outages.

*Mitigation:* The application will implement graceful error handling so that users see a clear and informative message if data cannot be retrieved, rather than a broken or blank page. The interface will display the inspection date for each business so that users can judge the currency of the information themselves. The development team will monitor the API response format throughout the project and adapt the data parsing layer promptly if the structure changes.

---

**Risk 2: Incomplete or Missing Ratings for Newly Registered Businesses**
A significant proportion of food premises in Bristol have not yet received their first inspection and therefore carry no hygiene rating in the dataset. If this is not handled carefully, the application could display blank or confusing entries for these businesses, undermining user trust in the platform and creating a misleading impression that a business has been assessed when it has not.

*Likelihood:* High. The Open Bristol dataset confirms that a large number of registered premises are currently awaiting their first inspection.

*Mitigation:* The application will explicitly display "Awaiting Inspection" for any business without a rating, accompanied by a brief plain-language explanation of what this status means. A dedicated Rating Guide page will document all special statuses, including Awaiting Inspection, New Rating Pending, and Exempt, so that users are never left uncertain about why a numeric rating is not displayed for a particular business.

---

**Risk 3: Input Security and Cross-Site Scripting Vulnerabilities**
Although the application does not collect or store personal user data, it accepts free-text input through the search bar. Unvalidated or unsanitised input could expose the application to cross-site scripting (XSS) or injection vulnerabilities, particularly if user-supplied values are reflected directly in the page or appended to API query strings without proper encoding.

*Likelihood:* Low to medium, depending on implementation approach.

*Mitigation:* All user inputs will be validated and sanitised on the client side before being used in API queries or rendered in the DOM. The application will be served exclusively over HTTPS to encrypt all data in transit. No personally identifiable information will be collected, stored, or transmitted at any point.

---

**Risk 4: Performance Degradation Under Concurrent Load**
The Open Bristol dataset contains several thousand records. Retrieving and processing the full dataset on every search request without pagination or query optimisation could result in slow response times, particularly if multiple users are accessing the application simultaneously. The application is required by its non-functional requirements to return search results within two seconds for at least 95 per cent of queries and to support a minimum of 100 concurrent users without degradation.

*Likelihood:* Medium, particularly for broad or unfiltered searches.

*Mitigation:* The application will implement client-side pagination so that only a manageable number of results are rendered at any one time. API queries will be constructed to request only the specific fields required for display, minimising the volume of data transferred per request. Performance under realistic concurrent load scenarios will be assessed during the testing phase and any bottlenecks addressed before submission.

---

## Project Scope

The Bristol Food Hygiene Ratings web application is a client-side web application built using HTML5, CSS3, and JavaScript. It retrieves food hygiene inspection data for registered food businesses in Bristol from the Open Bristol Data API and presents it to members of the public through a clean, responsive, and accessible browser-based interface. The application requires no server-side infrastructure beyond static file hosting, and incorporates no user authentication or data persistence layer of any kind.

### In Scope

The following features and components are within the scope of this project:

- **Search functionality:** A text-based search bar on the homepage allowing users to query food businesses by business name, postcode, or address.
- **Filter functionality:** Checkbox controls enabling users to filter search results by hygiene rating score (0 to 5) and by business type category, including restaurant, takeaway, cafe, pub or bar, school, and hotel.
- **Search results page:** A paginated list of matching businesses displaying the business name, address, business type, hygiene rating score, rating date, and a status badge for each result.
- **Business details page:** A full-record view for a selected business displaying all available dataset fields, including the official food hygiene rating graphic, rating status, new rating pending indicator, and conditional status notices where applicable.
- **Rating Guide page:** A dedicated page explaining what each rating score from 0 to 5 means in practice, along with clear explanations of the Awaiting Inspection, New Rating Pending, and Exempt special statuses.
- **Responsive layout:** A twelve-column CSS grid layout that adapts correctly to desktop, tablet, and mobile screen widths.
- **Accessibility compliance:** WCAG 2.1 Level AA compliance, including sufficient colour contrast ratios, keyboard navigation support, and descriptive alternative text for all images and icons.
- **Error handling:** User-friendly error states for API failures, empty search results, and missing rating graphic images.
- **Barrier-free access:** All features accessible to any user without account creation, registration, or login.

### Out of Scope

The following are explicitly outside the scope of this project:

- User account creation, login, or any personalised or saved-results features.
- The ability for users to submit hygiene concern reports or leave feedback about food businesses.
- Any server-side database, backend API, or persistent data storage layer developed by the team.
- Coverage of food businesses located outside the Bristol Open Data dataset.
- Native mobile application development for iOS or Android.

---

## Context Diagram

![Context Diagram](images/context.png)

The context diagram above defines the system boundary of the Bristol Food Hygiene Ratings web application and identifies all actors, external systems, and data flows that cross that boundary. Each element is described below.

### System of Interest

**Bristol Food Hygiene Ratings Web Application**
This is the system being developed. It sits at the centre of the context diagram, enclosed within the system boundary. Its responsibility is to receive search and filter requests from users, retrieve food hygiene data from the Open Bristol Data API, and present formatted results in the browser. The system does not store data, does not authenticate users, and does not write to any external system.

### Actors

**General Public User**
The primary human actor. This represents any member of the public who accesses the application using a web browser on a desktop computer, tablet, or mobile phone. The General Public User initiates all interactions with the system by submitting search queries, applying filters, selecting result cards, and navigating between pages. No login or registration is required. The data flow from this actor to the system consists of search terms, filter selections, and navigation events. The data flow from the system back to this actor consists of formatted search results, full business details, and rating guide content.

**Parent or Guardian (Secondary User)**
A specific subset of the General Public User who has a particular focus on identifying hygienic food premises suitable for children and families. This actor uses the same interface and data flows as the General Public User but prioritises high-rating filter options and business type filters such as cafes and restaurants. This actor is identified separately to acknowledge the diversity of user needs the application must serve.

### External Systems

**Open Bristol Data API**
The primary external data source. This is the publicly accessible API provided by Bristol City Council as part of the Open Bristol open data programme. The system sends structured HTTP GET requests to this API containing the user's search parameters. The API responds with JSON-formatted records containing the following data fields for each matching food business: business name, full address, postcode, business type, hygiene rating score (0 to 5 or null), rating date, rating status (for example, rated, awaiting inspection, or exempt), new rating pending indicator (Boolean), and rating graphic URL. This is the only external system from which the application reads data. The application has no write access to this API and cannot modify any records it retrieves.

**Food Standards Agency (FSA) Rating Graphic Server**
A secondary external system. Each business record returned by the Open Bristol Data API includes a URL pointing to the official FSA food hygiene rating sticker graphic hosted on FSA servers. The browser makes a separate HTTP request to this URL when rendering the Business Details page in order to display the nationally recognised rating graphic. The application does not send any user data to the FSA server; the request is a standard image retrieval. If the FSA server is unavailable or the URL is invalid, the application falls back to displaying the numeric rating score in its place.

### Data Flows

| Flow | Direction | Description |
|---|---|---|
| Search query | User to System | The user submits a text search term (business name, postcode, or address) via the search bar on the homepage. |
| Filter selection | User to System | The user selects one or more filter checkboxes (rating score, business type) on the search results page. |
| API request | System to Open Bristol Data API | The system constructs and sends a structured HTTP GET request to the Open Bristol API containing the search and filter parameters. |
| API response | Open Bristol Data API to System | The API returns a JSON array of food business records matching the query, including all data fields listed above. |
| Formatted results | System to User | The system renders matching business records as a paginated, filterable results list in the browser. |
| Business record | System to User | When the user selects a result, the system displays the full data record for that business, including all available fields and the official rating graphic. |
| Rating graphic request | System to FSA Graphic Server | The browser requests the rating graphic image from the FSA-hosted URL provided in the business record. |
| Rating graphic image | FSA Graphic Server to System | The FSA server returns the rating sticker image, which is displayed on the Business Details page. |
