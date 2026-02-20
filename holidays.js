(function(window) {
    'use strict';

    const bdHolidays2026 = [
        // সাধারণ ছুটি
        { date: "2026-02-21", title: "শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস", category: "সাধারণ ছুটি", description: "ভাষা শহীদদের প্রতি শ্রদ্ধা নিবেদনের জন্য।" },
        { date: "2026-03-20", title: "জুমাতুল বিদা", category: "সাধারণ ছুটি", description: "রমজানের শেষ শুক্রবার।" },
        { date: "2026-03-21", title: "ঈদুল ফিতর", category: "সাধারণ ছুটি", moonDependent: true, description: "পবিত্র ঈদুল ফিতর।" },
        { date: "2026-03-26", title: "স্বাধীনতা ও জাতীয় দিবস", category: "সাধারণ ছুটি", description: "বাংলাদেশের মহান স্বাধীনতা দিবস।" },
        { date: "2026-04-13", title: "চৈত্র সংক্রান্তি", category: "সাধারণ ছুটি", note: "ক্ষুদ্র নৃ-গোষ্ঠীর জন্য", description: "ক্ষুদ্র নৃ-গোষ্ঠীর প্রধান সামাজিক উৎসব।" },
        { date: "2026-05-01", title: "মে দিবস", category: "সাধারণ ছুটি", description: "আন্তর্জাতিক শ্রমিক দিবস।" },
        { date: "2026-05-01", title: "বুদ্ধ পূর্ণিমা (বৈশাখী পূর্ণিমা)", category: "সাধারণ ছুটি", moonDependent: true, description: "বৌদ্ধ ধর্মাবলম্বীদের প্রধান উৎসব।" },
        { date: "2026-05-28", title: "ঈদুল আযহা", category: "সাধারণ ছুটি", moonDependent: true, description: "পবিত্র ঈদুল আযহা।" },
        { date: "2026-08-05", title: "জুলাই গণঅভ্যুত্থান দিবস", category: "সাধারণ ছুটি", description: "বিশেষ জাতীয় দিবস।" },
        { date: "2026-08-26", title: "ঈদ-ই-মিলাদুন্নবী (সা.)", category: "সাধারণ ছুটি", moonDependent: true, description: "মহানবী (সা.)-এর জন্ম ও ওফাত দিবস।" },
        { date: "2026-09-04", title: "জন্মাষ্টমী", category: "সাধারণ ছুটি", description: "হিন্দু ধর্মাবলম্বীদের উৎসব।" },
        { date: "2026-10-21", title: "দুর্গাপূজা (বিজয়া দশমী)", category: "সাধারণ ছুটি", description: "হিন্দু ধর্মাবলম্বীদের প্রধান উৎসব।" },
        { date: "2026-12-16", title: "বিজয় দিবস", category: "সাধারণ ছুটি", description: "বাংলাদেশের মহান বিজয় দিবস।" },
        { date: "2026-12-25", title: "যিশু খ্রিস্টের জন্মদিন (বড়দিন)", category: "সাধারণ ছুটি", description: "খ্রিস্টান ধর্মাবলম্বীদের প্রধান উৎসব।" },

        // নির্বাহী আদেশে ছুটি
        { date: "2026-02-04", title: "শবে বরাত", category: "নির্বাহী আদেশে ছুটি", moonDependent: true, description: "পবিত্র শবে বরাত।" },
        { date: "2026-03-17", title: "শবে কদর", category: "নির্বাহী আদেশে ছুটি", moonDependent: true, description: "পবিত্র লাইলাতুল কদর।" },
        { date: "2026-03-19", title: "ঈদুল ফিতরের আগে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল ফিতর উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-03-20", title: "ঈদুল ফিতরের আগে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল ফিতর উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-03-22", title: "ঈদুল ফিতরের পরে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল ফিতর উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-03-23", title: "ঈদুল ফিতরের পরে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল ফিতর উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-04-14", title: "বাংলা নববর্ষ", category: "নির্বাহী আদেশে ছুটি", description: "পহেলা বৈশাখ।" },
        { date: "2026-05-26", title: "ঈদুল আযহার আগে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল আযহা উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-05-27", title: "ঈদুল আযহার আগে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল আযহা উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-05-29", title: "ঈদুল আযহার পরে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল আযহা উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-05-30", title: "ঈদুল আযহার পরে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল আযহা উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-05-31", title: "ঈদুল আযহার পরে ছুটি", category: "নির্বাহী আদেশে ছুটি", description: "ঈদুল আযহা উপলক্ষে সরকারি ছুটি।" },
        { date: "2026-06-26", title: "আশুরা", category: "নির্বাহী আদেশে ছুটি", moonDependent: true, description: "১০ মহররম।" },
        { date: "2026-10-20", title: "দুর্গাপূজা (নবমী)", category: "নির্বাহী আদেশে ছুটি", description: "শারদীয় দুর্গাপূজার মহানবমী।" }
    ];

    window.HolidayData = {
        getHolidaysForDate: (gDate) => {
            if (gDate.getFullYear() !== 2026) return [];
            const key = `${gDate.getFullYear()}-${(gDate.getMonth() + 1).toString().padStart(2, '0')}-${gDate.getDate().toString().padStart(2, '0')}`;
            return bdHolidays2026.filter(h => h.date === key);
        },
        getAllHolidays2026: () => {
            return bdHolidays2026.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    };
})(window);
