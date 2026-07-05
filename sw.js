const CACHE_NAME = 'saiyan-strength-v29';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './goku.jpg',
  './vegeta.jpg',
  './trunks.jpg',
  './gohan.jpg',
  './shashank.jpg',
  './frieza.jpg',
  './battlefield.jpg',
  'https://cdn.tailwindcss.com'
];

// Install Event
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Saiyan Scouter caching assets...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old gravity field cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Offline-First strategy)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      // If resource in cache, return it immediately, otherwise fetch from network
      return cachedResponse || fetch(e.request).then(networkResponse => {
        // Cache dynamic requests if needed (e.g. from CDNs)
        if (e.request.url.startsWith('https://cdn.tailwindcss.com')) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback for document pages
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
