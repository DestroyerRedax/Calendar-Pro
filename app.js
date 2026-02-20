document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    const DOMElements = {
        calendarGrid: document.getElementById('calendar-grid'),
        weekdayHeaders: document.getElementById('weekday-headers'),
        headerPrimary: document.getElementById('header-primary-label'),
        headerSecondary: document.getElementById('header-secondary-label'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        viewBtns: document.querySelectorAll('.segment-btn'),
        fullHolidayBtn: document.getElementById('full-holiday-btn'),
        fullHolidayModal: document.getElementById('full-holiday-modal'),
        holidayContent: document.getElementById('full-holiday-content'),
        modalOverlay: document.getElementById('modal-overlay')
    };

    // ফিক্স: অ্যাপ ওপেন করলে আজকের তারিখ দেখাবে
    let state = { date: new Date(), view: 'en' }; 

    function render() {
        const y = state.date.getFullYear(), m = state.date.getMonth();
        DOMElements.calendarGrid.innerHTML = ''; DOMElements.weekdayHeaders.innerHTML = '';
        
        const mid = new Date(y, m, 15);
        const bnM = CalendarMath.getBengaliDate(mid), arM = CalendarMath.getHijriDate(mid, 0);
        const enMonthName = new Date(y, m, 1).toLocaleString('en-US', { month: 'long' });

        if (state.view === 'en') {
            DOMElements.headerPrimary.textContent = `${enMonthName} ${y}`;
            DOMElements.headerSecondary.textContent = `বাংলা ${bnM.yearBn} | হিজরী ${arM.yearAr}`;
        } else if (state.view === 'bn') {
            DOMElements.headerPrimary.textContent = `${bnM.monthName} ${bnM.yearBn}`;
            DOMElements.headerSecondary.textContent = `${enMonthName} ${y} | হিজরী ${arM.yearAr}`;
        } else {
            DOMElements.headerPrimary.textContent = `${arM.monthName} ${arM.yearAr}`;
            DOMElements.headerSecondary.textContent = `${enMonthName} ${y} | বাংলা ${bnM.yearBn}`;
        }

        ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র'].forEach(d => {
            DOMElements.weekdayHeaders.appendChild(Object.assign(document.createElement('div'), {className:'weekday-header', textContent:d}));
        });

        const start = new Date(y, m, 1);
        const offset = (start.getDay() + 1) % 7;
        for (let i = 0; i < offset; i++) DOMElements.calendarGrid.appendChild(Object.assign(document.createElement('div'), {className: 'calendar-cell muted'}));

        const totalDays = new Date(y, m + 1, 0).getDate();
        for (let d = 1; d <= totalDays; d++) {
            const curr = new Date(y, m, d);
            const bnD = CalendarMath.getBengaliDate(curr), arD = CalendarMath.getHijriDate(curr, 0);
            const hols = HolidayData.getHolidaysForDate(curr);
            const isW = curr.getDay() === 5 || curr.getDay() === 6;

            const cell = document.createElement('div');
            cell.className = `calendar-cell ${isW ? 'weekend' : ''}`;
            if (curr.toDateString() === new Date().toDateString()) cell.classList.add('is-today');

            let main = d, tL = bnD.dayBn, bR = arD.dayAr;
            if(state.view === 'bn') { main = bnD.dayBn; tL = d; bR = arD.dayAr; }
            else if(state.view === 'ar') { main = arD.dayAr; tL = d; bR = bnD.dayBn; }

            cell.innerHTML = `<span class="date-top-left">${tL}</span><span class="date-main">${main}</span><span class="date-bottom-right">${bR}</span>`;
            
            if (hols.length > 0) {
                cell.appendChild(Object.assign(document.createElement('div'), {className: 'holiday-dot'}));
                cell.onclick = () => {
                    document.getElementById('modal-date-title').textContent = curr.toLocaleDateString('bn-BD', { weekday: 'long', day: 'numeric', month: 'long' });
                    document.getElementById('modal-holidays-list').innerHTML = hols.map(h => `
                        <div class="p-4 bg-teal-50 border border-teal-100 rounded-2xl">
                            <p class="text-sm font-black text-teal-800">${h.title}</p>
                            <p class="text-[11px] text-teal-600 mt-1 font-medium">${h.description}</p>
                            <span class="inline-block mt-2 px-2 py-1 bg-white text-teal-600 text-[9px] font-bold rounded-lg border border-teal-100">${h.category}</span>
                        </div>
                    `).join('');
                    openModal('holiday-modal');
                };
            }
            DOMElements.calendarGrid.appendChild(cell);
        }
    }

    function renderFullHolidayList() {
        const list = HolidayData.getAllHolidays2026();
        DOMElements.holidayContent.innerHTML = list.map(h => {
            const [y, m, d] = h.date.split('-');
            const dateObj = new Date(y, parseInt(m)-1, parseInt(d));
            return `<div class="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] mb-2"><div class="border-r border-slate-200 pr-4 min-w-[65px] text-center shrink-0"><p class="text-mint font-black text-xl leading-none">${dateObj.getDate()}</p><p class="text-[9px] font-bold text-slate-400 uppercase mt-1">${dateObj.toLocaleString('bn-BD', {month:'short'})}</p></div><div class="flex flex-col gap-1"><p class="text-sm font-bold text-slate-700 leading-tight">${h.title}</p><p class="text-[9px] font-bold text-slate-500 bg-white border border-slate-200 self-start px-2 py-0.5 rounded-md">${h.category}</p></div></div>`;
        }).join('');
    }

    function openModal(id) { document.getElementById(id).classList.add('show'); DOMElements.modalOverlay.classList.add('show'); }
    function closeModal() { document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('show')); DOMElements.modalOverlay.classList.remove('show'); }

    DOMElements.prevBtn.onclick = () => { state.date.setMonth(state.date.getMonth() - 1); render(); };
    DOMElements.nextBtn.onclick = () => { state.date.setMonth(state.date.getMonth() + 1); render(); };
    DOMElements.viewBtns.forEach(btn => btn.onclick = () => {
        state.view = btn.dataset.view;
        DOMElements.viewBtns.forEach(b => b.classList.replace('text-mint', 'text-slate-500'));
        btn.classList.replace('text-slate-500', 'text-mint');
        render();
    });
    
    DOMElements.fullHolidayBtn.onclick = () => { renderFullHolidayList(); openModal('full-holiday-modal'); };
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = closeModal);
    DOMElements.modalOverlay.onclick = closeModal;

    render();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(null, e => console.log(e));
        });
    }
});
