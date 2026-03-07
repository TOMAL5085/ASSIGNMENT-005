const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("login-btn");
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const errorMsg = document.getElementById("login-error");
  const loginPage = document.getElementById("login-page");
  const mainPage = document.getElementById("main-page");
  const searchInput = document.getElementById("search-input");

  // Login button
  loginBtn.addEventListener("click", handleLogin);

  // Enter key login
  usernameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });

  passwordInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleLogin();
  });

  // Search input listener
  searchInput.addEventListener("input", e => {
    const query = e.target.value.trim();
    console.log("Searching issues:", query);
  });

  function handleLogin() {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {

      errorMsg.classList.remove("show");

      // hide login
      loginPage.style.display = "none";

      // show main page
      mainPage.style.display = "block";

    } else {
      errorMsg.classList.add("show");
    }

  }

});