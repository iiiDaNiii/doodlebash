// ====================== DOODLE BASH SERVICE WORKER ======================
const CACHE_NAME = 'doodle-bash-v18';   // ← bump this number every time you deploy changes

const PRECACHE_ASSETS = [
  '/',                              // main HTML
  '/index.html',
  'manifest.json',
  'sw.js',
  
  // Core files
  'styles.css',                     // if you have a separate CSS file, otherwise ignore
  // All your images (add any new ones you create)
  'images/*',
  
  // ML Model (critical for scoring)
  'models/doodle/model.json',
  'models/doodle/*',
  
  // OpenCV and TensorFlow (if you ever move them local)
  // Currently OpenCV is from CDN, so we cache it explicitly
  'https://docs.opencv.org/4.10.0/opencv.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js'
];

// Install — precache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Pre-caching all assets for offline use');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('✅ Service Worker activated');
});

// Fetch — cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;   // offline or fast cached response
      }
      return fetch(event.request).then(networkResponse => {
        // Cache successful responses for future offline use
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

// Listen for update command from our "Update Now" button
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 SKIP_WAITING received — activating new version');
    self.skipWaiting();
  }
});
