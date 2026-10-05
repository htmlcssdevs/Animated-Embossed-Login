const loginContainer = document.getElementById("loginContainer");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const btnText = loginBtn.querySelector(".btn-text");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameGroup = document.getElementById("usernameGroup");
const passwordGroup = document.getElementById("passwordGroup");

// --- 1. Add Ripple Effect on Click ---
loginBtn.addEventListener("click", function (e) {
  if (this.classList.contains("loading")) return;

  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  this.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// --- 2. Form Submission & Validation ---
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Clear previous error states
  usernameGroup.classList.remove("error");
  passwordGroup.classList.remove("error");
  loginContainer.classList.remove("shake");

  // Check if fields are empty
  if (username === "" || password === "") {
    // Add error styling to empty fields
    if (username === "") usernameGroup.classList.add("error");
    if (password === "") passwordGroup.classList.add("error");

    // Trigger shake animation on the container
    void loginContainer.offsetWidth; // Force browser reflow to restart animation
    loginContainer.classList.add("shake");

    return; // Stop execution, do not proceed to login
  }

  // --- Validation Passed: Proceed with Login ---

  // Switch to Loading State
  loginBtn.classList.add("loading");
  btnText.textContent = "Logging in...";
  loginBtn.disabled = true;

  // Simulate network request (1.5 seconds)
  setTimeout(() => {
    // Switch to Success View
    loginContainer.classList.add("success-active");

    // Optional: Reset everything after 4 seconds to allow replay
    setTimeout(() => {
      loginContainer.classList.remove("success-active");
      loginForm.reset();
      loginBtn.classList.remove("loading");
      btnText.textContent = "Login";
      loginBtn.disabled = false;
    }, 4000);
  }, 1500);
});

// --- 3. Remove Error State on Typing ---
usernameInput.addEventListener("input", () => {
  if (usernameInput.value.trim() !== "") {
    usernameGroup.classList.remove("error");
  }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.trim() !== "") {
    passwordGroup.classList.remove("error");
  }
});

// --- 4. Input Focus Animation ---
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
    input.parentElement.style.transition = "transform 0.3s ease";
  });
  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});
