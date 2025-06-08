// learnpasswordreset.js

  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

  const supabase = createClient(
  "https://geznczcokbgybsseipjg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlem5jemNva2JneWJzc2VpcGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTQyMzQsImV4cCI6MjA2NDg5MDIzNH0.lUx0_kkp9zrqq9rZq6JIRogveyeUSOJ7P87wJUxv9P0"
);

// Elements
const statusDiv = document.getElementById("status");
const resetForm = document.getElementById("resetForm");
const newPasswordInput = document.getElementById("newPassword");
const submitButton = document.getElementById("submitButton");

// On page load → check session
checkSession();

async function checkSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    statusDiv.innerText = "Error checking session: " + error.message;
    return;
  }

  if (session) {
    console.log("✅ Session valid → user ID:", session.user.id);
    statusDiv.innerText = "Session valid. You can reset your password.";
    resetForm.style.display = "block";
  } else {
    console.log("❌ No valid session.");
    statusDiv.innerText = "Invalid or expired link.";
    resetForm.style.display = "none";
  }
}

// Handle update password
submitButton.addEventListener("click", async () => {
  const newPassword = newPasswordInput.value;

  if (!newPassword) {
    alert("Please enter a new password.");
    return;
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error("❌ Error updating password:", error.message);
    alert("Error updating password: " + error.message);
  } else {
    console.log("✅ Password updated.");
    alert("Password updated successfully! You can now log in with your new password.");
    // Optionally redirect to login page:
    // window.location.href = "/login.html";
  }
});
