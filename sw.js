// ====================== DOODLE BASH SERVICE WORKER v19 ======================
const CACHE_NAME = 'doodle-bash-v19';   // ← bump this every time you deploy

// All assets we know about from your code (images + model + critical scripts)
const PRECACHE_ASSETS = [
  '/', 
  '/index.html',
  'manifest.json',
  'sw.js',

  // === ML MODEL — CRITICAL FOR SCORING ===
  'models/doodle/model.json',
  // ← ADD EVERY .bin file from your models/doodle/ folder here:
  // 'models/doodle/group1-shard1of1.bin',
  // 'models/doodle/group1-shard2of2.bin',
  // etc. (check the folder and list them all)

  // === TF.js and OpenCV (pinned versions — much more reliable) ===
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.21.0/dist/tf.min.js',
  'https://docs.opencv.org/4.10.0/opencv.js'
];

// Add all your image paths from the app (I extracted them from Part 3)
const imagePaths = [ /* paste the entire imagePaths array from your code here */ ];

imagePaths.forEach(path => PRECACHE_ASSETS.push(path));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Pre-caching all assets for offline scoring...');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', () => self.clients.claim());

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
      }).catch(() => {
        // Optional: offline image fallback (nice-to-have)
        if (event.request.url.includes('images/')) {
          return caches.match('/images/rawcat.png'); // or any cached image
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
