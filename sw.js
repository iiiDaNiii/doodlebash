const CACHE_NAME = 'doodle-bash-v5.27'; // ← bump this every update (I incremented it for you)

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  'manifest.json',
  // === ML MODEL ===
  'models/doodle/model.json',
  'models/doodle/metadata.json',
  'models/doodle/weights.bin',
  // === TF.js + OpenCV ===
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.21.0/dist/tf.min.js',
  'https://docs.opencv.org/4.10.0/opencv.js'
];

// ====================== IMAGE LIST ======================
const imagePaths = [ /* your full list from the file */ ];
imagePaths.forEach(path => PRECACHE_ASSETS.push(path));

// ====================== SERVICE WORKER ======================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Pre-caching new version:', CACHE_NAME);
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      console.log('✅ Precache complete — skipping waiting');
      return self.skipWaiting();   // ← NOW properly chained
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', name);
              return caches.delete(name);
            }
          })
        );
      })
    ])
  );
  console.log('✅ Service Worker activated — old version cleaned');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});

// Allow the client to tell us to skip waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
