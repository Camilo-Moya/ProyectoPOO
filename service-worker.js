const CACHE_NAME = "BogotaExploraCache-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./APP.js",
    "./manifest.json",
    "./ICONS/BogotaExplora192.png",
    "./ICONS/BogotaExplora512.png",
    "./img/bogota.png",
    "./img/Monserrate.jpeg",
    "./img/SimonBolivar.jpeg",
    "./img/Colpatria.jpeg"
];

// Instalación del Service Worker

self.addEventListener("install", (event) => {
    self.skipWaiting();
    console.log("Service Worker Instalado");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Archivos almacenados en cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Fetch

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.match(event.request);
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