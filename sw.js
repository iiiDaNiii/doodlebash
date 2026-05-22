const CACHE_NAME = 'doodle-bash-v23';   // ← we bumped the version

const PRECACHE_ASSETS = [
  '/', 
  '/index.html',
  'manifest.json',
  'sw.js',

  // === ML MODEL (critical for scoring offline) ===
  'models/doodle/model.json',
  'models/doodle/metadata.json',
  'models/doodle/weights.bin',           // ← your single weights file

  // === Pinned versions of TF.js and OpenCV (much more reliable offline) ===
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.21.0/dist/tf.min.js',
  'https://docs.opencv.org/4.10.0/opencv.js'
];

// ====================== PASTE YOUR IMAGE LIST HERE ======================
const imagePaths = [
      'images/greyheader.png', 'images/yellowfooter.png', 'images/guidebutton.png', 'images/menu.png', 'images/learnbutton.png',
      'images/shufflebutton.png', 'images/shufflebuttonoutline.png', 'images/portfoliobutton.png', 'images/audio.png', 'images/scorebutton.png',
      'images/doodlebashlogo.png', 'images/close.png', 'images/closewhite.png', 'images/notebook.png', 'images/gear1.png', 'images/gear2.png',
      'images/rawcat.png', 'images/new.png', 'images/varietybonusgrid.png', 'images/varietybonus.png', 'images/cube.png', 'images/purplepointbubble.png',
      'images/blackpointbubble.png', 'images/circle.png', 'images/square.png', 'images/triangle.png', 'images/line.png', 'images/dot.png',
      'images/lens.png', 'images/halfcircle.png', 'images/drop.png', 'images/teeth.png', 'images/cylinder.png', 'images/cube.png',
      'images/pyramid.png', 'images/cloud.png', 'images/coin.png', 'images/smiley.png', 'images/letter.png', 'images/house.png',
      'images/die.png', 'images/piano.png', 'images/pizza.png', 'images/star.png', 'images/wireless.png', 'images/music.png',
      'images/planet.png', 'images/sword.png', 'images/fish.png', 'images/umbrella.png', 'images/boat.png', 'images/butterfly.png',
      'images/heart.png', 'images/turd.png', 'images/flower.png', 'images/crown.png', 'images/cat.png', 'images/rocket.png',
      'images/mug.png', 'images/toiletpaper.png', 'images/chest.png', 'images/present.png', 'images/diamond.png', 'images/icecream.png',
      'images/rawcircle.png', 'images/rawsquare.png', 'images/rawtriangle.png', 'images/rawline.png', 'images/rawdot.png',
      'images/rawlens.png', 'images/rawhalfcircle.png', 'images/rawdrop.png', 'images/rawteeth.png', 'images/rawcylinder.png',
      'images/rawcube.png', 'images/rawpyramid.png', 'images/rawcloud.png', 'images/rawcoin.png', 'images/rawsmiley.png',
      'images/rawletter.png', 'images/rawhouse.png', 'images/rawdie.png', 'images/rawpiano.png', 'images/rawpizza.png',
      'images/rawstar.png', 'images/rawwireless.png', 'images/rawmusic.png', 'images/rawplanet.png', 'images/rawsword.png',
      'images/rawfish.png', 'images/rawumbrella.png', 'images/rawboat.png', 'images/rawbutterfly.png', 'images/rawheart.png',
      'images/rawturd.png', 'images/rawflower.png', 'images/rawcrown.png', 'images/rawcat.png', 'images/rawrocket.png',
      'images/rawmug.png', 'images/rawtoiletpaper.png', 'images/rawchest.png', 'images/rawpresent.png', 'images/rawdiamond.png',
      'images/rawicecream.png', 'images/gettingstarted1ptgoal.png', 'images/gettingstarted2ptgoal.png', 'images/gettingstarted3ptgoal.png',
      'images/gettingstarted4ptgoal.png', 'images/gettingstarted5ptgoal.png', 'images/note1.png', 'images/note2.png',
      'images/note3.png', 'images/guidebutton.png', 'images/minus2pt.png', 'images/1pt.png', 'images/2pt.png',
      'images/3pt.png', 'images/4pt.png', 'images/5pt.png', 'images/6pt.png', 'images/mission1header.png',
      'images/mission2header.png', 'images/mission3header.png', 'images/mission4header.png', 'images/mission5header.png'
    ];

imagePaths.forEach(path => PRECACHE_ASSETS.push(path));

// ====================== SERVICE WORKER CODE (do not change) ======================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Pre-caching everything for offline use');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('✅ Service Worker activated');
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

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
