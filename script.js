document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");

  /* =====================
     CLICKABLE RECIPE CARDS
     ===================== */

  const grilledChickenCard = document.getElementById("grilled-chicken-card");
  if (grilledChickenCard) {
    grilledChickenCard.addEventListener("click", () => {
      window.location.href = "grilled-chicken.html";
    });
  }

  const beefBurgerCard = document.getElementById("beef-burger-card");
  if (beefBurgerCard) {
    beefBurgerCard.addEventListener("click", () => {
      window.location.href = "beef-burger.html";
    });
  }

  const browniesCard = document.getElementById("brownies-card");
  if (browniesCard) {
    browniesCard.addEventListener("click", () => {
      window.location.href = "brownies.html";
    });
  }

  const veganChiliCard = document.getElementById("vegan-chili-card");
  if (veganChiliCard) {
    veganChiliCard.addEventListener("click", () => {
      window.location.href = "vegan-chili.html";
    });
  }

  const stirFryCard = document.getElementById("vegetable-stir-fry-card");
  if (stirFryCard) {
    stirFryCard.addEventListener("click", () => {
      window.location.href = "vegetable-stir-fry.html";
    });
  }

  const applePieCard = document.getElementById("apple-pie-card");
  if (applePieCard) {
    applePieCard.addEventListener("click", () => {
      window.location.href = "apple-pie.html";
    });
  }

  const quesadillasCard = document.getElementById("quesadillas-card");
  if (quesadillasCard) {
    quesadillasCard.addEventListener("click", () => {
      window.location.href = "quesadillas.html";
    });
  }

  const tacosCard = document.getElementById("tacos-card");
  if (tacosCard) {
    tacosCard.addEventListener("click", () => {
      window.location.href = "tacos.html";
    });
  }

  const ribeyeCard = document.getElementById("ribeye-steak-card");
  if (ribeyeCard) {
    ribeyeCard.addEventListener("click", () => {
      window.location.href = "ribeye-steak.html";
    });
  }

  /* =====================
     CATEGORY DROPDOWN
     ===================== */

  const categoryBtn = document.getElementById("categoryBtn");
  const categoryDropdown = document.getElementById("categoryDropdown");

  if (categoryBtn && categoryDropdown) {
    categoryBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoryDropdown.style.display =
        categoryDropdown.style.display === "block" ? "none" : "block";
    });

    categoryDropdown.querySelectorAll("div").forEach(option => {
      option.addEventListener("click", () => {
        const selectedCategory = option.textContent.toLowerCase().replace(/\s/g, "-");
        categoryBtn.firstChild.textContent = option.textContent;

        const dishCards = document.querySelectorAll(".dish-card");
        dishCards.forEach(card => {
          if (selectedCategory === "all-categories" || card.dataset.category === selectedCategory) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });

        categoryDropdown.style.display = "none";
      });
    });

    document.addEventListener("click", () => {
      categoryDropdown.style.display = "none";
    });
  }

  /* =====================
     FAVORITES BUTTON
     ===================== */

  const favoritesBtn = document.getElementById("favoritesBtn");
  if (favoritesBtn) {
    favoritesBtn.addEventListener("click", () => {
      window.location.href = "favorites.html";
    });
  }

     /* =====================
   DARK MODE TOGGLE
   ===================== */

const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body;

// Apply saved preference on page load
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");

  if (darkModeBtn) {
    darkModeBtn.innerHTML =
      '<span class="material-icons">light_mode</span> Light Mode';
  }
}

// Toggle when clicked
if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeBtn.innerHTML =
        '<span class="material-icons">light_mode</span> Light Mode';
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.innerHTML =
        '<span class="material-icons">dark_mode</span> Dark Mode';
    }
  });
}

// Load saved preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}


/* =====================
   SEARCH FUNCTION
   ===================== */
const searchBar = document.getElementById("searchBar");

if (searchBar) {
  searchBar.addEventListener("keyup", function () {
    const query = searchBar.value.toLowerCase().trim();
    const dishCards = document.querySelectorAll(".dish-card");

    let anyVisible = false;

    dishCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      

      // Match title 
      const matchesSearch = title.includes(query) || query == "";

      if (matchesSearch) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    // Show "No results" message
    const noResults = document.getElementById("noResultsMessage");

    if (!anyVisible) {
      if (!noResults) {
        const message = document.createElement("h3");
        message.id = "noResultsMessage";
        message.textContent = "No recipes found.";
        message.style.textAlign = "center";
        message.style.marginTop = "20px";
        document.querySelector(".dish-grid").after(message);
      }
    } else {
      if (noResults) noResults.remove();
    } 
  });
}


/* =====================
   LOGIN FORM
===================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        window.location.href = "index.html";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  });
}

  
}); // end DOMContentLoaded

/* =====================
   LOGOUT FUNCTION
   ===================== */
function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}
