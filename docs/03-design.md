

<img width="733" height="767" alt="Homepage" src="https://github.com/user-attachments/assets/d1e0e21d-043f-4cfa-8a0b-5eab2d041f6f" />

<img width="621" height="660" alt="Hygiene report page 1" src="https://github.com/user-attachments/assets/260097e0-fbef-44c6-9233-08e5f2ca0b66" />
<img width="730" height="665" alt="Hygiene report page 2" src="https://github.com/user-attachments/assets/7b6f4f7d-6b9b-4785-b1fd-fc63ea0830cd" />
<img width="573" height="756" alt="login:register part 1" src="https://github.com/user-attachments/assets/c9023838-58bb-4e33-9253-98a10cfc1000" />
<img width="596" height="468" alt="login:register part 2" src="https://github.com/user-attachments/assets/8f5e06c8-17f7-487a-8ea3-d536d3317f66" />
<img width="556" height="762" alt="report success 1 " src="https://github.com/user-attachments/assets/00d8ab5c-db22-439b-9311-6bdf188115fc" />
<img width="556" height="277" alt="report success 2" src="https://github.com/user-attachments/assets/f7894b4b-7a40-47b7-b5b0-46ad290249e6" />
<img width="697" height="660" alt="result page part 1" src="https://github.com/user-attachments/assets/998551db-f077-41a5-9ec6-a16fb3511165" />
<img width="726" height="748" alt="result page part 2" src="https://github.com/user-attachments/assets/83ea062f-4f16-480a-8abc-47f13baee09b" />
<img width="870" height="745" alt="Search Page part 1" src="https://github.com/user-attachments/assets/edad3fbc-652e-447e-874c-d09040ebfcb2" />
<img width="847" height="675" alt="Search Page Part 2" src="https://github.com/user-attachments/assets/42bf82fa-ed51-4a55-a857-3b245ffbf545" /><img width="928" height="421" alt="Search page 3" src="https://github.com/user-attachments/assets/376eec6c-7de0-4bae-89d2-b4ae7e057609" />
<img width="820" height="762" alt="uderdashboard 1" src="https://github.com/user-attachments/assets/bf99a0bc-776e-49d8-9974-3fbfe0<img width="875" height="762" alt="uderdashboard 2" src="https://github.com/user-attachments/assets/b092191d-1400-4e41-bbef-cec88b8b8e12" />
e8ecc4" />
<img width="875" height="194" alt="uderdashboard 3" src="https://github.com/user-attachments/assets/541f11e2-0b7e-4393-a2ba-cada77e1046b" />



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bristol Food Hygiene</title>

  <style>
    /* ===== GLOBAL STYLES ===== */
    body {
      font-family: Calibri, sans-serif;
      margin: 0px ;
      background: #eeeedd; /* original background */
      color: black; /* keep default text color */
    }

    /* ===== NAVBAR ===== */
    nav {
      background: #7f8a79; /* original navbar color */
      padding: 15px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    nav .left {
      display: flex;
      gap: 35px;
      align-items: center;
      font-weight: 1000;
    }


    nav a {
      text-decoration: none;
      color: black;
      font-weight: 1000;
    }
    
    nav .right {
     display: flex;
     gap: 30px;            /* space between links */
    align-items: center;
  
    }
    .logo {
      border: 2px solid black;
      padding: 5px 12px;
    }

    /* ===== HERO SEARCH BOX ===== */
    .hero {
      background: #99a395; /* original hero background */
      width: 80%;
      margin: 40px auto;
      padding: 40px;
      text-align: center;
      border-radius: 10px;
    }

    .hero h1 {
      margin-bottom: 15px;  /* Search for restaurants... */
    }

    .search-box {
      margin-top: 25px;   
      display: flex;
      justify-content: center;
      gap: 5px;
    }

    input {
      padding: 15px;   /* search box  */
      width: 60%;
      border-radius: 6px;
      border: 1px solid #A2AE9D;
      font-family: Calibri, sans-serif;
    }

    button {
      background: black; /* original button color */
      color: white;
      padding: 12px 45px;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      font-family: Calibri, sans-serif;
    }

    .error {
      color: red;
      font-size: 12px;
      margin-top: 10px;
    }

    /* ===== BUSINESS TYPE GRID ===== */
    .section {
      width: 75%;
      margin: 35px auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin-top: 15px;
    }

    .card {
      background: #cacaca; /* buisnees types */
      padding: 12px;
      text-align: center;
      border-radius: 10px;  /* roundness of border */
      cursor: pointer;
      font-family: Calibri, sans-serif;
    }

    /* ===== RATINGS ===== */
    .ratings {
      background: #99a395; /* outer ratings colour */
      padding: 20px;
      display: flex;
      justify-content: space-between;
      gap: 5px ;
      margin-top: 10px;
      border-radius: 10px;
    }

    .rating-box {
      text-align: center;
      background: #c7bebe; /* inner ratings color */
      padding: 10px;
      border-radius: 6px;
      width: 13.5%;
      font-family: Calibri, sans-serif;
    }
  </style>
</head>

<body>

  <!-- ===== NAVBAR ===== -->
  <nav>
    <div class="left">
      <div class="logo">Logo</div>
      <strong>Bristol Food Hygiene</strong>
    </div>

    <div class="right">
      <a href="#">Home</a>
      <a href="#">Search</a>
      <a href="#">Detail</a>
      <a href="#">Rating Guide</a>
    </div>
  </nav>

  <!-- ===== HERO ===== -->
  <div class="hero">
    <h1>Find Food Hygiene Ratings in Bristol</h1>
    <p>Search for restaurants, takeaways, cafés and more to check their hygiene rating before you visit.</p>

    <div class="search-box">
      <input id="searchInput" placeholder="Business name, postcode, or address..." />
      <button onclick="searchBusiness()">Search</button>
    </div>

    <div id="error" class="error"></div>
  </div>

  <!-- ===== BUSINESS TYPES ===== -->
  <div class="section">
    <h3>Browse by Business Type</h3>

    <div class="grid">
      <div class="card">Restaurants</div>
      <div class="card">Takeaways</div>
      <div class="card">Cafés</div>
      <div class="card">Pubs & Bars</div>
      <div class="card">Schools</div>
      <div class="card">Hotels</div>
    </div>
  </div>

  <!-- ===== RATINGS ===== -->
  <div class="section">
    <h3>What Do the Ratings Mean?</h3>

    <div class="ratings">
      <div class="rating-box"><strong>5</strong><br>Very Good</div>
      <div class="rating-box"><strong>4</strong><br>Good</div>
      <div class="rating-box"><strong>3</strong><br>Satisfactory</div>
      <div class="rating-box"><strong>2</strong><br>Improvement Needed</div>
      <div class="rating-box"><strong>1</strong><br>Major Improvement needed</div>
      <div class="rating-box"><strong>0</strong><br>Urgent Action</div>
    </div>
  </div>

  <!-- ===== JAVASCRIPT ===== -->
  <script>
    function searchBusiness() {
      const input = document.getElementById("searchInput").value;
      const error = document.getElementById("error");

      if (input.trim() === "") {
        error.textContent = "Please enter a business name, postcode, or address";
        return;
      }

      error.textContent = "";
      alert("Searching for: " + input);
    }
  </script>

</body>
</html>
