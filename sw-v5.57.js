// ====================== DOODLE BASH SERVICE WORKER — DIAGNOSTIC ======================
const CACHE_NAME = 'doodle-bash-v5.57';   // ← BUMP THIS EVERY TEST

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  'manifest.json',
  'opencv.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.21.0/dist/tf.min.js',
  'models/doodle/model.json',
  'models/doodle/metadata.json',
  'models/doodle/weights.bin',
];

// === ALL SOUND FILES (33 total) ===
const soundPaths = [
  'sounds/clack1.mp3', 'sounds/clack2.mp3', 'sounds/clack3.mp3',
  'sounds/learn.mp3',
  'sounds/remove.mp3',
  'sounds/snap.mp3',
  'sounds/score.mp3',
  'sounds/win.mp3',
  'sounds/modalslide1.mp3', 'sounds/modalslide2.mp3', 'sounds/modalslide3.mp3', 'sounds/modalslide4.mp3',
  'sounds/button1.mp3', 'sounds/button2.mp3', 'sounds/button3.mp3',
  'sounds/circle1.mp3', 'sounds/circle2.mp3', 'sounds/circle3.mp3', 'sounds/circle4.mp3',
  'sounds/button9.mp3', 'sounds/button10.mp3', 'sounds/button11.mp3',
  'sounds/01raindisabled.mp3',           // BGM
  'sounds/flap1.mp3', 'sounds/flap2.mp3', 'sounds/flap3.mp3',
  'sounds/flap4.mp3', 'sounds/flap5.mp3', 'sounds/flap6.mp3',
  'sounds/pointbubble1.mp3', 'sounds/pointbubble2.mp3',
  'sounds/pointbubble3.mp3', 'sounds/pointbubble4.mp3'
];

soundPaths.forEach(path => PRECACHE_ASSETS.push(path));

// Paste your full imagePaths array here (same as before)
const imagePaths = ['images/10pt.png', 'images/1pt.png', 'images/2pt.png', 'images/3pt.png', 'images/4pt.png',
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
  'images/yellowfooter.png'];
imagePaths.forEach(path => PRECACHE_ASSETS.push(path));

console.log(`[SW] 🚀 Service Worker starting — version ${CACHE_NAME}`);

self.addEventListener('install', event => {
  console.log(`[SW] 📥 Install event for ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log(`[SW] 📦 Pre-caching ${PRECACHE_ASSETS.length} assets...`);
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      console.log(`[SW] ✅ Precache complete — skipping waiting`);
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  console.log(`[SW] 🔥 Activate event — claiming clients`);
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(names => {
        console.log(`[SW] 🗑️ Found caches:`, names);
        return Promise.all(
          names.map(name => {
            if (name !== CACHE_NAME) {
              console.log(`[SW] 🗑️ Deleting old cache: ${name}`);
              return caches.delete(name);
            }
          })
        );
      })
    ])
  );
  console.log(`[SW] ✅ Activated ${CACHE_NAME}`);
});

self.addEventListener('fetch', event => {
  // Only log a few fetches to avoid spam
  if (event.request.url.includes('sw.js') || Math.random() < 0.05) {
    console.log(`[SW] 📡 Fetch: ${event.request.url}`);
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

self.addEventListener('message', event => {
  console.log(`[SW] 📨 Message received:`, event.data);
  if (event.data?.type === 'SKIP_WAITING') {
    console.log(`[SW] ⏩ SKIP_WAITING requested — activating new version`);
    self.skipWaiting();
  }
});
