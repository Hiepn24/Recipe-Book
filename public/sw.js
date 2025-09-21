const CACHE_NAME = 'recipe-book-v1';
const OFFLINE_URL = '/index.html';
const FILES_TO_CACHE = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        return cached || fetch(e.request);
      })
    );
  }
});

