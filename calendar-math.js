(function(window) {
    'use strict';
    const BN_MONTHS = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
    const AR_MONTHS = ["মহরম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"];
    const BN_NUMBERS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    function isLeap(y) { return ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0); }
    function toBn(n) { return n.toString().replace(/\d/g, d => BN_NUMBERS[d]); }

    // Bengali Date Calculation (Bangla Academy Rule 2019)
    function getBengaliDate(date) {
        let gy = date.getFullYear(), gm = date.getMonth(), gd = date.getDate();
        let by = (gm < 3 || (gm === 3 && gd < 14)) ? gy - 594 : gy - 593;
        let startYear = (gm < 3 || (gm === 3 && gd < 14)) ? gy - 1 : gy;
        let diff = Math.floor((Date.UTC(gy, gm, gd) - Date.UTC(startYear, 3, 14)) / 86400000);
        let lengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap(startYear + 1) ? 30 : 29, 30];
        let mi = 0; while(diff >= lengths[mi]) { diff -= lengths[mi]; mi++; }
        return { yearBn: toBn(by), monthName: BN_MONTHS[mi], dayBn: toBn(diff + 1) };
    }

    // Hijri Date Calculation (Tabular Algorithm)
    function getHijriDate(date, offset) {
        let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
        if (m <= 2) { y--; m += 12; }
        const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + (2 - Math.floor(y/100) + Math.floor(Math.floor(y/100)/4)) - 1524 + offset;
        let days = jd - 1948439.5;
        let hy = Math.floor(days / 354.367);
        let remain = Math.floor(days - (hy * 354.367));
        let hm = Math.min(11, Math.floor(remain / 29.5));
        let hd = Math.floor(remain - (hm * 29.5)) + 1;
        return { yearAr: toBn(hy + 1), monthName: AR_MONTHS[hm], dayAr: toBn(hd) };
    }

    window.CalendarMath = { getBengaliDate, getHijriDate };
})(window);
