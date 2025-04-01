importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

if (workbox) {
  console.log("Workbox loaded ✅");

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.destination === "document",
    new workbox.strategies.StaleWhileRevalidate()
  );

  self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(self.clients.claim());
  });
} else {
  console.error("Workbox failed to load ❌");
}
