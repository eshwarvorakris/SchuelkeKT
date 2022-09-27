const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const navItems = [nav1, nav2, nav3, nav4];

function toggleNav() {
  // Toggle: Menu Bars open/closed
  menuBars.classList.toggle("change");
  //Toggle menu active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    // Animate in overlay
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
  } else {
    //Animate out overlay
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
  }
}

// Event Listeners

menuBars.addEventListener("click", toggleNav);

navItems.forEach((nav) => {
  nav.addEventListener("click", toggleNav);
});

//--------------------------------------------------
// traineelogin-2
//--------------------------------------------------
// const logInBtn = document.querySelector(".log-into-btn");
// const dangerMessage = document.querySelector(".danger-message");

// function toggleDangerTag() {
//   dangerMessage.classList.toggle("hide-danger-label");
// }

// logInBtn.addEventListener("click", toggleDangerTag);

const videoContainer = document.querySelector(".training-video");

videoContainer.addEventListener("click", function () {
  videoContainer.classList.toggle("background");
});
