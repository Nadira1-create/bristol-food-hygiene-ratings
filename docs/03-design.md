# 03 Design

## 3.1 User Interface Wireframes and Mockups

Wireframes were created during the design phase of the project to plan the layout and structure of the Bristol Food Hygiene Ratings web application before development began. Wireframes are low-fidelity representations of the interface whose purpose is to illustrate the position of interface elements and the overall structure of each page without focusing on visual styling such as colours or typography. This approach allows the development team to focus on functionality and user interaction at an early stage of the Software Development Life Cycle, before committing to a visual design direction.

The wireframes were designed based on the user requirements and use cases identified earlier in the project. In particular, they support the key tasks of searching for food businesses, filtering results, and viewing detailed hygiene rating information. Each wireframe represents a major screen within the application and demonstrates how users navigate through the system when performing these tasks.

Following the wireframe stage, high-fidelity desktop mockups were produced to demonstrate the intended visual design of the application. These mockups present the final colour scheme, typography, layout, and interface components as they would appear to the end user in a desktop browser. The mockups were used to validate design decisions prior to development and to confirm that the interface met the user requirements identified in the requirements specification. By progressing from low-fidelity wireframes to high-fidelity mockups, the design process followed an iterative approach that reduced the risk of costly changes during the implementation stage.

---

# 3.2 Homepage

## 3.2.1 Wireframe

The homepage acts as the entry point of the application. Its primary purpose is to allow users to quickly search for food hygiene ratings within Bristol. The layout is intentionally simple so that users can immediately understand how to use the system upon arrival.

### Header Navigation

The header contains the application logo alongside navigation links to the four main sections of the site: Home, Search, Details, and Rating Guide. This navigation structure is consistent across all pages, allowing users to move through the system at any point without needing to return to a previous page.

### Search Bar

The search bar is the primary interaction element on the homepage. Users can enter a business name, address, or postcode to search for food businesses within the dataset. The search bar directly supports the main user requirement identified in the requirements specification, which is to quickly locate hygiene ratings for a specific business. A validation message is displayed beneath the field if the form is submitted without any input.

### Search Button

The search button submits the query and navigates the user to the search results page, where matching businesses are displayed.

### Information Section

An information section is included on the homepage to introduce the purpose of the application and provide a brief explanation of the food hygiene rating system, ensuring new users understand the platform before they begin searching.



---

## 3.2.2 High-Fidelity Desktop Mockup

The high-fidelity mockup for the homepage builds upon the wireframe structure and presents the complete visual design of the page as it would appear in a desktop browser.

### Colour Scheme and Visual Identity

A green colour scheme was selected throughout the application to reflect cleanliness, health, and safety, which are the core values of the platform. The hero banner uses a dark green gradient background with the main headline and search bar positioned centrally, ensuring the primary user task is the first element users encounter on the page.

### Statistics Bar

A statistics bar positioned immediately below the hero section displays four key figures at a glance: 3,268 rated businesses, 443 premises awaiting inspection or unrated, Open Data powered by Open Bristol as the data source, and Free Access with no account required. This section builds user confidence in the platform by demonstrating the scale and accessibility of the data available through the application.

### Browse by Business Type

A category section beneath the statistics bar presents six icon-based tiles for Restaurants, Takeaways, Cafes, Pubs and Bars, Schools, and Hotels. This allows users to filter results by business type directly from the homepage, providing an alternative route into the search results without requiring users to type a query.

### Ratings Summary

A ratings summary section provides colour-coded badges representing each rating level from 0 to 5, alongside a link to the full Rating Guide page. This section helps users understand the rating system before they begin exploring businesses, which is particularly useful for first-time visitors.

### Footer

The footer contains certification logos from CIEH, RoSPA, and ISO 22000 to reinforce the credibility of the platform. It also includes a Quick Links column, a Legal column containing Privacy Policy, Cookie Policy, Terms of Use, Disclaimer, and Accessibility links, and full contact information for the organisation.

[Homepage mockup image]

---

# 3.3 Search Results Page

## 3.3.1 Wireframe

The search results page displays the businesses that match the user's search query. This page allows users to browse results and apply filters to narrow them down. The design prioritises clarity so that users can quickly identify businesses with suitable hygiene ratings.

### Search Bar

The search bar remains visible at the top of the page so that users can modify their query without navigating away from the results.

### Filter Panel

A filter section allows users to refine the displayed results by two criteria. The first is the hygiene rating score, which can be filtered by any combination of the values 0 to 5. The second is the business type, which includes options such as restaurant, takeaway, cafe, pub or bar, school, and hotel. These filters support the user requirement that individuals should be able to identify businesses with higher hygiene standards quickly and easily.

### Results List

Each result is displayed as an individual card within the list. Each card includes the business name, address, business type, hygiene rating, and rating date. Selecting a card navigates the user to the business details page for that specific business.

[Search results wireframe image]

---

## 3.3.2 High-Fidelity Desktop Mockup

The high-fidelity mockup for the search results page demonstrates how the wireframe layout translates into a fully styled and functional interface.

### Active Filter Tags

Applied filters are displayed as removable tags directly above the results list. This gives users clear and immediate visibility of how the results are currently being filtered, and allows them to remove individual filters without having to return to the filter panel.

### Filter Sidebar

Each filter option in the sidebar is presented with a checkbox and a count showing the number of matching results for that option. This helps users understand the distribution of the data before applying a filter and avoids situations where a filter would return zero results. A Clear All Filters button is included at the bottom of the panel for convenience.

### Result Cards

Each result card uses a prominent colour-coded hygiene rating badge on the left side of the card. The right side displays the business name, business type label, address, rating date, and a status badge. Status badges such as Rated, New Rating Pending, and Awaiting Inspection use distinct colour styles, allowing users to identify the current inspection status of a business at a glance without needing to open the detail page.

### No Results State

A dedicated empty state is shown when no businesses match the search query. This state includes a clear message and guidance encouraging the user to broaden their search term or adjust their filters.

### Error State

An error notice with a Retry button is displayed when data cannot be retrieved from the source. This ensures users are informed of the issue and are given a clear action to take rather than being presented with a blank page.

### Pagination

Navigation controls at the bottom of the page allow users to move across multiple pages of results, with page numbers and next and previous buttons clearly visible.

[Search results mockup image]

---

# 3.4 Business Details Page

## 3.4.1 Wireframe

The business details page presents the full inspection information for a selected food business. This page provides a more detailed view of the data returned from the dataset. The layout focuses on presenting information clearly so that users can understand the hygiene rating and inspection details for the specific business they have selected.

### Business Information Section

This section displays the core information about the business, including the business name, address and postcode, business type, hygiene rating, and rating date.

### Rating Display

The hygiene rating is displayed prominently so that users can immediately identify the score assigned to the business without needing to read through the full detail table.

### Inspection Status Information

Additional information is displayed to indicate the current status of the inspection record. This includes the rating status, whether a new rating is pending following a recent inspection, and whether the business is currently awaiting its first inspection. Displaying this information ensures users understand whether the rating shown reflects the most current assessment of the business.

[Business details wireframe image]

---

## 3.4.2 High-Fidelity Desktop Mockup

The high-fidelity mockup for the business details page demonstrates how the full inspection data is presented in a structured two-column layout.

### Back to Results Button

A clearly labelled Back to Results button is positioned at the top of the content area. This allows users to return to their previous search results without losing their query or their applied filters, supporting a smooth and efficient navigation experience.

### Business Information Card

The left column opens with a business information card that displays the rating badge, business name, business type, rating status badge, and full address in a structured layout. Below this card, a full detail table lists every available data field: Business Name, Full Address, Postcode, Business Type, Hygiene Rating with its descriptive label, Rating Date, Rating Status, and New Rating Pending.

### Rating Explanation Panel

The right column contains a contextual rating explanation panel that presents the full scale from 5 down to 0 with colour-coded badges and a short description for each level. This panel allows users to immediately understand what the displayed rating means without having to navigate away to the Rating Guide page, improving the overall usability of the application.

### Conditional Status Notices

Three conditional notices are displayed at the bottom of the page depending on the specific business's inspection record. A yellow notice reading A New Rating is Pending indicates that a recent inspection has been carried out and the updated rating may change soon. A purple notice reading Awaiting Inspection indicates the business has not yet been inspected and no rating is currently available. A blue notice reading Exempt from Rating indicates the business is not required to participate in the food hygiene rating scheme. Each notice is only shown when it is relevant to the business being viewed, avoiding unnecessary information being presented to the user.

[Business details mockup image]

---

# 3.5 Rating Guide Page

## 3.5.1 Wireframe

The rating guide page explains the meaning of each food hygiene rating score. This page helps users understand how to interpret the ratings displayed throughout the application. Providing this information supports users who may not be familiar with the national food hygiene rating system operated by the Food Standards Agency.

| Rating | Meaning |
|------|------|
| 5 | Very Good |
| 4 | Good |
| 3 | Generally Satisfactory |
| 2 | Improvement Necessary |
| 1 | Major Improvement Necessary |
| 0 | Urgent Improvement Required |

This information allows users to better understand inspection results and make informed decisions when selecting a place to eat.

[Rating guide wireframe image]

---

## 3.5.2 High-Fidelity Desktop Mockup

The high-fidelity mockup for the rating guide page presents the rating information in a structured, visually engaging format that is consistent with the overall design of the application.

### Page Header Banner

A green hero banner at the top of the page carries the title Rating Guide and the subtitle Understanding Food Hygiene Ratings. This maintains visual consistency with the homepage hero section and clearly communicates the purpose of the page to the user.

### Introduction Panel

A brief introductory paragraph beneath the banner explains that food hygiene ratings are issued by local authorities in the United Kingdom following inspections of food businesses. The paragraph clarifies that scores range from 0, which indicates urgent improvement is required, to 5, which indicates very good hygiene standards.

### Rating Cards

Each rating level is presented in its own card. Every card contains a colour-coded score badge, the rating label, a short description of what that rating means in terms of the business's hygiene standards, and a What This Means section that provides practical guidance to the user about how the rating should influence their decision to visit the establishment. The badges use a colour progression from dark green for a rating of 5, through yellow-green for 4, light green for 3, amber for 2, orange-red for 1, and dark red for 0, making the scale immediately understandable at a glance.

### Special Statuses Section

A Special Statuses section at the bottom of the page contains three additional cards explaining Awaiting Inspection, New Rating Pending, and Exempt. The Awaiting Inspection card explains that the business is newly registered and has not yet been inspected by the local authority, meaning no rating is currently available. The New Rating Pending card explains that a recent inspection has taken place and the displayed rating may not yet reflect the latest findings. The Exempt card explains that certain premises are not required to participate in the food hygiene rating scheme. These cards ensure users understand statuses that are not represented by a numeric rating, which is particularly relevant given that 443 premises in the Bristol dataset are currently awaiting inspection.

[Rating guide mockup image]
