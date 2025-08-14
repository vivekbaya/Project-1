import { sendOtpEmail } from './otp.js'; 

let isLogin = true;
let isOtpPhase = false;
let generatedOtp = "";

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").textContent = isLogin ? "Login" : "Sign Up";
  document.getElementById("submit-btn").textContent = isLogin ? "Login" : "Sign Up";
  document.querySelector(".toggle").textContent = isLogin
    ? "Don't have an account? Sign up"
    : "Already have an account? Login";
  document.getElementById("otp").style.display = "none"; 
  isOtpPhase = false; 
}

document.getElementById("auth-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const otpInput = document.getElementById("otp").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!isOtpPhase) {
    if (isLogin) {
      const storedUser = users.find(user => user.email === email && user.password === password);

      if (storedUser) {
        try {
          generatedOtp = await sendOtpEmail(email);
          document.getElementById("message").style.color = "green";
          document.getElementById("message").textContent = "OTP sent to your email!";
          isOtpPhase = true;
          document.getElementById("otp").style.display = "block"; 
          document.getElementById("submit-btn").textContent = "Verify OTP";

        } catch (error) {
          document.getElementById("message").style.color = "red";
          document.getElementById("message").textContent = "Failed to send OTP. Try again.";
        }
      } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "Invalid email or password.";
      }

    } else {
      // SIGN UP Mode
      const userExists = users.some(user => user.email === email);

      if (userExists) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "User already exists. Please login.";
      } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent = "Signup successful! Please log in now.";
        toggleForm(); 
      }
    }

  } else {
    // OTP Phase
    if (otpInput === generatedOtp) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").textContent = "Login successful!";
      setTimeout(() => {
        window.location.href = "main.html"; 
      }, 1000);
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").textContent = "Incorrect OTP. Please try again.";
    }
  }
});

window.toggleForm = toggleForm;
