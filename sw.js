const CACHE_NAME = 'mythbrix-calendar-v11';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/calendar-math.js',
    '/holidays.js',
    'https://cdn.tailwindcss.com'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
