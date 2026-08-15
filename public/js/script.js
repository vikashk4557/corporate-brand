
class EventBus {
  constructor() {
      this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => {
      this.off(event, callback);
      };
  }
  off(event, callback) {
  if (!this.events[event]) return;

  this.events[event] = this.events[event].filter(
  listener => listener !== callback);
  if (this.events[event].length === 0) {
    delete this.events[event];
  }
}
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(
      callback => callback(data)
    );
  }
}
const eventBus = new EventBus();

const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn ? themeBtn.querySelector("i") : null;

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

const heroTitle = document.querySelector(".hero__title");
const navLinks = document.querySelectorAll(".nav-link");

let state = { theme: "light", menuOpen: false };

function loadState() {
  const savedState =localStorage.getItem("appState");
  if (savedState) {
    try {
      state = JSON.parse(savedState);
    } catch (error) {
      console.error( "Failed to load saved state:",error);
      state = { theme: "light", menuOpen: false }; 
    }
  }
}

function saveState() {
  localStorage.setItem(
    "appState",
    JSON.stringify(state)
  );
}

function applyTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  if (!icon) return;
  if (state.theme === "dark") {
    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
  } else {
    icon.classList.replace("bi-sun-fill", "bi-moon-fill");
  }
}

function handleMenuClick() {
  state.menuOpen = !state.menuOpen;
  navMenu.classList.toggle("active",state.menuOpen);
  saveState();
  eventBus.emit("menuChanged",state.menuOpen);
}

function handleThemeClick() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
  saveState();
  eventBus.emit(
    "themeChanged",
    state.theme
  );
}

if (menuBtn) {
  menuBtn.addEventListener("click", handleMenuClick);
}
if (themeBtn) {
  themeBtn.addEventListener("click", handleThemeClick);
}
const removeThemeListener = eventBus.on("themeChanged",(theme) => {
  // cheng theme
});


const removeMenuListener = eventBus.on("menuChanged",(menuOpen) => {
  // open menu
});

function cleanup() {
  if (menuBtn) {
    menuBtn.removeEventListener("click", handleMenuClick);
  }
  if (themeBtn) {
    themeBtn.removeEventListener("click", handleThemeClick);
  }
  removeThemeListener();
  removeMenuListener();
  // console.log("Cleanup completed");
}
window.addEventListener("pagehide", cleanup);
loadState();
applyTheme();

function typeHeroTitle() {
  if (!heroTitle) return;
  const text = heroTitle.textContent.trim();
  heroTitle.textContent = "";
  let index = 0;
  function type() {
    if (index < text.length) {
      heroTitle.textContent += text[index];
      index++;
      setTimeout(type, 100);
    }
  }
  type();
}
typeHeroTitle();;

