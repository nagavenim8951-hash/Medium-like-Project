function goToStory() {
    window.location.href = "story.html";
  }
// ===== POPUP LOGIC =====
function openModel() {
  document.getElementById("popup").classList.add("active");
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

function showEmailForm() {
  document.getElementById("auth-options").style.display = "none";
  document.getElementById("email-form").style.display = "block";
}

function goBack() {
  document.getElementById("email-form").style.display = "none";
  document.getElementById("auth-options").style.display = "block";
}

// ===== SIGN-IN LOGIC =====
function signInWithEmail() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter email");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);

  closePopup();
  showAppContent();
  

}

// ===== SHOW APP CONTENT AFTER LOGIN =====
function showAppContent() {
  document.getElementById("landingContent").classList.add("d-none");
  document.getElementById("appContent").classList.remove("d-none");
}

// ===== LOGOUT =====
function logout() {
  localStorage.clear();
  location.reload();
}

  function showSection(section) {
    document.querySelectorAll('.content-section')
      .forEach(div => div.classList.add('d-none'));

    document.getElementById(section).classList.remove('d-none');
  }

//TOGGLE
function toggleSidebar() {
  document.getElementById('leftSidebar').classList.toggle('show');
  document.getElementById('sidebarOverlay').classList.toggle('show');

}

// ===== CHECK LOGIN ON PAGE LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    showAppContent();
  }
});

 
 

 