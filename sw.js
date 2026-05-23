const CACHE_NAME = 'doodle-bash-v5.17';   // ← bump this every release

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  'manifest.json',
  // === ML MODEL ===
  'models/doodle/model.json',
  'models/doodle/metadata.json',
  'models/doodle/weights.bin',
  // === Pinned TF.js + OpenCV (these often cause precache failures) ===
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.21.0/dist/tf.min.js',
  'https://docs.opencv.org/4.10.0/opencv.js'
];

// ====================== IMAGE LIST ======================
const imagePaths = [
  'images/10pt.png', 'images/1pt.png', 'images/2pt.png', 'images/3pt.png', 'images/4pt.png',
  'images/5pt.png', 'images/6pt.png', 'images/7pt.png', 'images/audio.png', 'images/black1pt.png',
  'images/blackpointbubble.png', 'images/boat.png', 'images/butterfly.png', 'images/cat.png',
  'images/checkboxleft.png', 'images/checkboxright.png', 'images/chest.png', 'images/circle.png',
  'images/close.png', 'images/closewhite.png', 'images/cloud.png', 'images/coin.png', 'images/crown.png',
  'images/cube.png', 'images/cylinder.png', 'images/diamond.png', 'images/die.png', 'images/doodlebashlogo.png',
  'images/dot.png', 'images/drop.png', 'images/fish.png', 'images/flower.png', 'images/gear1.png',
  'images/gear2.png', 'images/gettingstarted1ptgoal.png', 'images/gettingstarted2ptgoal.png',
  'images/gettingstarted3ptgoal.png', 'images/gettingstarted4ptgoal.png', 'images/gettingstarted5ptgoal.png',
  'images/greyheader.png', 'images/guidebutton.png', 'images/halfcircle.png', 'images/heart.png',
  'images/house.png', 'images/icecream.png', 'images/learnbutton.png', 'images/lens.png',
  'images/letter.png', 'images/line.png', 'images/lock.png', 'images/logoblueback1.png',
  'images/logoblueback2.png', 'images/logocat.png', 'images/logod1.png', 'images/logod2.png',
  'images/logoe.png', 'images/logolpen.png', 'images/logomusic.png', 'images/logoo1.png',
  'images/logoo2.png', 'images/logopizza.png', 'images/logosubtitle.png', 'images/logounderline.png',
  'images/menu.png', 'images/minus2pt.png', 'images/mission1header.png', 'images/mission2header.png',
  'images/mission3header.png', 'images/mission4header.png', 'images/mission5header.png',
  'images/missionbonus.png', 'images/missiondetails.png', 'images/mug.png', 'images/music.png',
  'images/new.png', 'images/note1.png', 'images/note2.png', 'images/note3.png', 'images/notebook.png',
  'images/notebookscanguide.png', 'images/numberline.png', 'images/piano.png', 'images/pizza.png',
  'images/planet.png', 'images/portfoliobutton.png', 'images/present.png', 'images/purplepointbubble.png',
  'images/pyramid.png', 'images/rawboat.png', 'images/rawbutterfly.png', 'images/rawcat.png',
  'images/rawchest.png', 'images/rawcircle.png', 'images/rawcloud.png', 'images/rawcoin.png',
  'images/rawcrown.png', 'images/rawcube.png', 'images/rawcylinder.png', 'images/rawdiamond.png',
  'images/rawdie.png', 'images/rawdot.png', 'images/rawdrop.png', 'images/rawfish.png',
  'images/rawflower.png', 'images/rawhalfcircle.png', 'images/rawheart.png', 'images/rawhouse.png',
  'images/rawicecream.png', 'images/rawlens.png', 'images/rawletter.png', 'images/rawline.png',
  'images/rawmug.png', 'images/rawmusic.png', 'images/rawpiano.png', 'images/rawpizza.png',
  'images/rawplanet.png', 'images/rawpresent.png', 'images/rawpyramid.png', 'images/rawrocket.png',
  'images/rawsmiley.png', 'images/rawsquare.png', 'images/rawstar.png', 'images/rawsword.png',
  'images/rawteeth.png', 'images/rawtoiletpaper.png', 'images/rawtriangle.png', 'images/rawturd.png',
  'images/rawumbrella.png', 'images/rawwireless.png', 'images/rocket.png', 'images/scorebutton.png',
  'images/scoremarker.png', 'images/scorepin.png', 'images/scoresquiggle.png', 'images/shufflebutton.png',
  'images/shufflebuttonoutline.png', 'images/smiley.png', 'images/square.png', 'images/star.png',
  'images/sword.png', 'images/teeth.png', 'images/toiletpaper.png', 'images/triangle.png',
  'images/turd.png', 'images/tutimage1.png', 'images/tutimage10.png', 'images/tutimage11.png',
  'images/tutimage12.png', 'images/tutimage13.png', 'images/tutimage14.png', 'images/tutimage15.png',
  'images/tutimage16.png', 'images/tutimage17.png', 'images/tutimage18.png', 'images/tutimage19.png',
  'images/tutimage2.png', 'images/tutimage3.png', 'images/tutimage4.png', 'images/tutimage5.png',
  'images/tutimage6.png', 'images/tutimage7.png', 'images/tutimage8.png', 'images/tutimage9.png',
  'images/umbrella.png', 'images/varietybonus.png', 'images/varietybonusgrid.png', 'images/wireless.png',
  'images/yellowfooter.png'
];
imagePaths.forEach(path => PRECACHE_ASSETS.push(path));

// ====================== SERVICE WORKER ======================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Starting precache for', CACHE_NAME);
      return cache.addAll(PRECACHE_ASSETS)
        .then(() => console.log('✅ Pre-caching completed successfully'))
        .catch(err => {
          console.error('❌ Precache failed! Some files could not be cached:', err);
          // IMPORTANT: we still let the SW install so updates can continue
        });
    })
  );
  // NO skipWaiting() here — this is correct
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Delete ALL old version caches (this clears the old game files)
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
  console.log('✅ Service Worker activated — old caches cleaned');
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
    console.log('🔄 SKIP_WAITING received');
    self.skipWaiting();
  }
});
