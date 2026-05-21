const CACHE_NAME = 'doodle-bash-v1.03';   // ← bump this version number when you deploy changes

self.addEventListener('install', (event) => {
  self.skipWaiting();   // ← Important: new SW activates as soon as possible
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());   // ← This is what was probably missing
  console.log('✅ Service Worker activated and claiming clients');
});

// Listen for the SKIP_WAITING message from our Update button
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 SKIP_WAITING received — activating new service worker');
    self.skipWaiting();
  }
});

// Optional: Simple cache-first strategy (you can expand this later)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
