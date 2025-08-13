const CACHE_NAME = "site-clean-cache-v1";
const URLS_TO_CACHE = [
  "/", // raiz do site
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
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of URLS_TO_CACHE) {
        try {
          await cache.add(url);
          console.log(`Cached ${url}`);
        } catch(e) {
          console.warn(`Falha ao cachear ${url}:`, e);
        }
      }
    })()
  );
  self.skipWaiting();
});


// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      ))
  );
  self.clients.claim();
});

// Intercepta requisições e serve do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)
        .catch(() => caches.match("/offline.html"))
      )
  );
});
