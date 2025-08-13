// Menu toggle
const toggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer-menu");

toggle.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

// Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registrado com sucesso!"))
    .catch(err => console.log("Erro ao registrar SW:", err));
}
