const CACHE_NAME = 'vision-pwa-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'service-worker.js'
  // You can add more files (like CSS, JS, images) here if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found; else, fetch from the network.
        return response || fetch(event.request);
      })
  );
});