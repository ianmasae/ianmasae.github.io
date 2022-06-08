'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "792ee9e41bcb0cab87b0e2e94db07ef6",
"assets/assets/icons/burger.png": "1f3349c15e019aeb2486d5fdec78eb18",
"assets/assets/icons/drink.png": "12be6f741a94158388b97fbb78f29bf7",
"assets/assets/icons/fries.png": "4b35dec44587282ef4a0f7a97e4a0eda",
"assets/assets/icons/google-icon.png": "a2229b88eeb7a5118f0a2c38b1862c58",
"assets/assets/icons/hot-dog.png": "6ca40161566a1ee233372c8b155acd2d",
"assets/assets/icons/nachos.png": "efefd646585f289e67cf65d01c2462a6",
"assets/assets/icons/pizza.png": "a5f843dc18330f3094ba81a19b88b7cf",
"assets/assets/images/bg.webp": "03b5f7e6ac34524b75e6e99e3b8c4791",
"assets/assets/images/burger-with-fries.webp": "5645a0d91c9eafd872d184d45f0e1734",
"assets/assets/images/burger.webp": "f4965bc2a78b08ef7f268ec70412cf0f",
"assets/assets/images/cheese-burger-meat.webp": "ec77c26c605578e2e8f082bc3ee813a2",
"assets/assets/images/cheese-burger.webp": "f7624c08e6e75239677a63044e450370",
"assets/assets/images/cocacola.webp": "578bb6db795d66bd64f87b98d9b0ec6d",
"assets/assets/images/fries-burger.webp": "904dc1d192e453d11ec50f94b9fdf82f",
"assets/assets/images/fries-with-sauce.webp": "77f43ffeb4550589cc1c8bff4d19e6c4",
"assets/assets/images/meat-burger.webp": "fb3edf8f36b83b3fe05ac9696edffb96",
"assets/assets/images/noodle-with-shrimps.webp": "a0cccaf3a64022808fdc3262380cb857",
"assets/assets/images/pasta-lemon.webp": "e29d755e81ce62945ab43d5bf081426d",
"assets/assets/images/pasta-pepper.webp": "8dc4a564f4d59205bb4f228d0e4b4e98",
"assets/assets/images/pasta-salad.webp": "b264d9af552454d7ca40772effb6ae45",
"assets/assets/images/pasta.webp": "0751f17d45d3eb93ba2cef12bc4e039e",
"assets/assets/images/pizza.webp": "1b17bb41d57a851a6c658615e0661ebb",
"assets/assets/images/potato-fries.webp": "7123539b54c2cc1eaec7de3cd5f751e4",
"assets/assets/images/tomato-pizza.webp": "9269a3c145ab3571cb520a3a60a34fd6",
"assets/assets/svg/404.svg": "001704831e88b798df4c17f05886ef5c",
"assets/assets/svg/check-out.svg": "61d71513b1e38f1c59c29155cf1ebde6",
"assets/assets/svg/courier.svg": "0f1f288c03eb31552d0ef3c451a3aa7d",
"assets/assets/svg/delivery.svg": "689961e59fa83f90dca417ca8afdf670",
"assets/assets/svg/find-location.svg": "85169b0a7bcaff0f6b9964dbd469c28b",
"assets/assets/svg/location.svg": "b00a05ed23e11af20616d1faf7a376ae",
"assets/assets/svg/login.svg": "4581ba4184a7ba5b10720ab262b068a9",
"assets/assets/svg/package.svg": "70c14a74e502e417780c0ab05076e0cd",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "45bf187a498762abad7ef06bd80f824c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "16961bbe0324f5bbe50ef5e65e7b3da3",
"/": "16961bbe0324f5bbe50ef5e65e7b3da3",
"main.dart.js": "9adde46ffc4d9f481d546617e174b03e",
"manifest.json": "c7de370bf66cf14a4c037cd9e890c786",
"version.json": "db07dddb143f08ba580e06dddcc1025e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
