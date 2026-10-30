const CACHE_NAME = "rakani-scoreboard-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./css/prijava.css",
    "./css/odigraj-mec.css",
    "./js/odigraj-mec.js",
    "./js/pwa.js",
    "./assets/logo-tekst.png",
    "./assets/pocetna.png",
    "./assets/telefon.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName.startsWith("rakani-scoreboard-") && cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(async () => {
                const cachedPage = await caches.match("./index.html");
                if (cachedPage) {
                    return cachedPage;
                }
                throw new Error("Offline page is not available in the app cache.");
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => cachedResponse || fetch(request))
    );
});
