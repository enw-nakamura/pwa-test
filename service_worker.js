// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches-v1-002';
var urlsToCache = [
 '/poster-keisuke.github.io/',
];

// インストール処理
self.addEventListener('install', function(event) {
 event.waitUntil(
  caches
  .open(CACHE_NAME)
  .then(function(cache) {
   return cache.addAll(urlsToCache);
  })
 );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
 event.respondWith(
  caches
  .match(event.request)
  .then(function(response) {
   return response ? response : fetch(event.request);
  })
 );
});

self.addEventListener('push', function (event) {
 console.log('Received a push message', event);
 var title = "プッシュ通知です！";
 var body = "プッシュ通知はこのようにして送られるのです";

 event.waitUntil(
  self.registration.showNotification(title, {
   body: body,
   icon: 'http://free-images.gatag.net/images/201108090000.jpg',
   tag: 'push-notification-tag'
  })
 );
});

self.addEventListener('notificationclick', function (event) {
 event.notification.close();
 clients.openWindow("/");
}, false);