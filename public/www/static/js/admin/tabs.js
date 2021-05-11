'use strict';
const tabs = document.querySelectorAll('.navLink');
tabs.forEach(link =>
    link.onclick = event => {
        event.preventDefault();

        const target = event.target;
        const tabId = target.hash;

        if (target.tagName !== 'A') return;

        if (target.classList.value !== 'navLink active') {
            document.querySelector('.navLink.active').classList.remove('active');
            target.classList.add('active');
        } else return;
        document.querySelector('.tab.active').classList.remove('active');
        document.querySelector(tabId).classList.add('active');
    }
);
