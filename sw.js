const CACHE_NAME = 'bd-calendar-pro-v12';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/calendar-math.js',
    '/holidays.js',
    '/manifest.json'
];

// ইনস্টল ইভেন্ট - ফাইলগুলো অফলাইনের জন্য সেভ করবে
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Promise.allSettled ব্যবহার করা হয়েছে যাতে কোনো একটি ফাইল মিসিং থাকলেও বাকিগুলো ক্যাশ হয়
            return Promise.allSettled(
                STATIC_ASSETS.map(asset => cache.add(asset).catch(err => console.warn('Cache failed for:', asset)))
            );
        })
    );
    self.skipWaiting();
});

// অ্যাক্টিভেট ইভেন্ট - পুরনো ক্যাশ ডিলিট করে নতুনটা চালু করবে
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
        ))
    );
    self.clients.claim();
});

// ফেচ ইভেন্ট - অফলাইনে থাকলে ক্যাশ থেকে দেখাবে, অনলাইনে থাকলে নতুন ডেটা আনবে
self.addEventListener('fetch', event => {
    // শুধু GET রিকোয়েস্টগুলো ক্যাশ করবে (ক্রোম এক্সটেনশন বা অন্যান্য এরর এড়াতে)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // ক্যাশে না থাকলে নেটওয়ার্ক থেকে আনবে এবং ডাইনামিকালি সেভ করে রাখবে (যেমন Tailwind)
            return fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    // থার্ড-পার্টি বা এক্সটার্নাল ফাইলগুলোও ক্যাশে যুক্ত হয়ে যাবে
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                console.log('You are totally offline and asset is missing.');
            });
        })
    );
});
