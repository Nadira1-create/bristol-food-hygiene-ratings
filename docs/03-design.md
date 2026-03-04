# 03 Design

## 3.1 User Interface Wireframes

Wireframes were created during the design phase of the project to plan the layout and structure of the Bristol Food Hygiene Ratings web application before development began.

Wireframes are low-fidelity representations of the interface. Their purpose is to illustrate the position of interface elements and the overall structure of each page without focusing on visual styling such as colours or typography. This allows the development team to focus on functionality and user interaction at an early stage of the Software Development Life Cycle.

The wireframes were designed based on the user requirements and use cases identified earlier in the project. In particular, they support the key tasks of searching for food businesses, filtering results, and viewing detailed hygiene rating information.




Each wireframe represents a major screen within the application and demonstrates how users move through the system when performing these tasks.

---

## 3.2 Homepage Wireframe

### Description

The homepage acts as the starting point of the application. Its primary purpose is to allow users to quickly search for food hygiene ratings within Bristol.

The layout is intentionally simple so that users can immediately understand how to use the system.

### Key Interface Components

#### Header Navigation

The header contains the application logo and navigation links to the main sections of the site:

- Home  
- Search  
- Details  
- Rating Guide  

This navigation structure remains consistent across all pages so that users can move through the system easily.

#### Search Bar

The search bar is the main interaction element on the homepage. Users can enter a business name, address, or postcode in order to search for food businesses within the dataset.

The search bar supports the main user task identified in the requirements specification, which is to quickly find hygiene ratings for specific businesses.

#### Search Button

The search button submits the user's query and directs the user to the search results page where matching businesses are displayed.

#### Information Section

An information section is included on the homepage to introduce the purpose of the application and provide a brief explanation of food hygiene ratings.

<img width="442" height="744" alt="Screenshot 2026-03-04 at 20 41 06" src="https://github.com/user-attachments/assets/94c37793-b5ca-4de4-b47a-1907eb1e39ed" />


---

## 3.3 Search Results Wireframe

### Description

The search results page displays the businesses that match the user’s search query. This page allows users to browse results and apply filters to narrow the results.

The design prioritises clarity so that users can quickly identify businesses with suitable hygiene ratings.

### Key Interface Components

#### Search Bar

The search bar remains visible at the top of the page so that users can quickly change their search query if required.

#### Filter Panel

A filter section allows users to refine the displayed results using the following criteria:

- Hygiene rating score from 0 to 5  
- Business type such as restaurant, takeaway, café, pub, or school  

These filters support the requirement that users should be able to identify businesses with higher hygiene standards more easily.

#### Results List

Each result is displayed as an individual item within a list. Each item includes:

- Business name  
- Address  
- Business type  
- Hygiene rating  
- Rating date  

Selecting a result takes the user to the detailed information page for that business.

<img width="324" height="643" alt="Screenshot 2026-03-04 at 20 42 15" src="https://github.com/user-attachments/assets/c5944241-68e4-4449-8a76-29800498752b" />

---

## 3.4 Business Details Wireframe

### Description

The business details page presents the full inspection information for a selected food business. This page provides a more detailed view of the data returned from the dataset.

The layout focuses on presenting information clearly so that users can understand the hygiene rating and inspection details.

### Key Interface Components

#### Business Information Section

This section displays the main information about the business, including:

- Business name  
- Address and postcode  
- Business type  
- Hygiene rating  
- Rating date  

#### Rating Display

The hygiene rating is shown clearly so that users can immediately recognise the score assigned to the business.

#### Inspection Status Information

Additional information may include:

- Rating status  
- Whether a new rating is pending  
- Whether the business is awaiting inspection  

Displaying this information ensures that users understand whether the rating reflects the current inspection status.
<img width="324" height="640" alt="Screenshot 2026-03-04 at 20 43 55" src="https://github.com/user-attachments/assets/d39d94e2-1911-4845-a9b3-a66cb51ff80a" />


---

## 3.5 Rating Guide Wireframe

### Description

The rating guide page explains the meaning of each food hygiene rating score. This page helps users understand how to interpret the ratings displayed within the application.

Providing this information supports users who may not be familiar with the rating system.

### Rating Scale

| Rating | Meaning |
|------|------|
| 5 | Very Good |
| 4 | Good |
| 3 | Generally Satisfactory |
| 2 | Improvement Necessary |
| 1 | Major Improvement Necessary |
| 0 | Urgent Improvement Required |

<img width="318" height="765" alt="Screenshot 2026-03-04 at 20 44 56" src="https://github.com/user-attachments/assets/749022a8-0c89-4160-b224-922c7bd414bd" />

This information allows users to better understand the inspection results and make informed decisions when selecting a place to eat.
