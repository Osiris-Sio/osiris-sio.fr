/*
Auteur :
  - Louis AMEDRO (alias Osiris Sio)

© 2026 Osiris Sio - Tous droits réservés.
*/

const CACHE_NAME = 'osiris-sio_portfolio';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './projets.html',
  './a-propos.html',
  './contact.html',
  './soutenir.html',
  './mentions-legales.html',
  './header.html',
  './footer.html',
  './404.html',
  './style/style.css',
  './style/header.css',
  './style/footer.css',
  './style/a-propos.css',
  './style/contact.css',
  './style/projets.css',
  './script/script.js',
  './script/projects.js',
  './img/logo.png',
  './manifest.json'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./404.html');
          }
        });
      })
  );
});
