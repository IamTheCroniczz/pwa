// Menu toggle
const toggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer-menu");

toggle.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

