const CACHE_NAME = "site-clean-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/sobre.html",
  "/servicos.html",
  "/contato.html",
  "/offline.html",
  "/assets/style.css",
  "/scripts/script.js"
];

// Instala e salva no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

// Busca no cache quando offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});
