const API_URL = "http://localhost/waste-reporter/backend/"; 

// Probably put this in a shared JS file that both pages load

// Utility: get stored users (object map)
function getUsers() {
  const s = localStorage.getItem("users");
  if (!s) return {};
  try {
    return JSON.parse(s);
  } catch (e) {
    console.error("Invalid users in storage");
    return {};
  }
}

// Utility: save users object
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register logic
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUser").value.trim();
    const matric = document.getElementById("regMatric").value.trim();

    const matricPattern = /^[A-Z]{3}\/\d{4}\/\d{4}$/;
    if (!matricPattern.test(matric)) {
      alert("Invalid Matric Number format. Example: CSC/****/****");
      return;
    }

    const users = getUsers();
    if (users[username]) {
      alert("Username already exists");
      return;
    }

    // Store the user (we’re storing the password plainly — this is not secure)
    users[username] = { password: matric };

    saveUsers(users);
    alert("Registration successful");
    window.location.href = "login.html";
  });
}




//MOBILE TOGGLE 
 const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
// Login logic


const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value.trim();
    const matric = document.getElementById("loginPass").value.trim();

    const users = getUsers();
    const user = users[username];
    if (!user) {
      alert("User not found");
      return;
    }
    if (user.password !== matric) {
      alert("Wrong password");
      return;
    }

    // Login successful — store in session
    sessionStorage.setItem("loggedInUser", username);
    alert("Login successful");
    window.location.href = "dashboard.html";
  });
}

/* ==================== LOGOUT ==================== */
function logoutUser() {
  localStorage.removeItem("user");
  alert("You have been logged out.");
  window.location.href = "index.html";
}


/* ==================== REPORT ==================== */




/* ==================== FETCH USER'S DASHBOARD REPORTS ==================== */
