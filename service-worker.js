const CACHE_NAME = "BogotaExploraCache";

const urlsToCache = [
    "/",
    "/index.html",
    "style.css",
    "/APP.js",
    "/manifest.json",
    "/ICONS/BogotaExplora192.png",
    "/ICONS/BogotaExplora512.png"
];

// Instalación del Service Worker

self.addEventListener("install", (event) => {

    console.log("Service Worker Instalado");
    event.waitUntil(
        caches.open("CACHE_NAME")
        .then((cache) => {
            console.log("Archivos almacenados en cache");
            return cache.addAll(urlsToCache);
        })
    );
});

//Fetch

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});


// Notificaciones Push

self.addEventListener("push", (event) => {
    self.registration.showNotification
        ("Bogota Explora", 
            {
                body: "Conoce los lugares turísticos de Bogotá",
            }
        );
    });