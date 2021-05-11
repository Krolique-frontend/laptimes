"use strict";
const socket = new WebSocket('ws://localhost:3002');
const login = document.querySelector('#login');
const password = document.querySelector('#password');
const loginForm = document.querySelector('#loginForm');
const jsonMonitor = document.getElementById('jsonMonitor');
const racers = [];

// console.dir(loginForm);

document.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        loginForm.submit = function(e) {
            e.preventDefault();
            const data = {};
            for (let item of loginForm ) {
                if (item.type === 'text' && item.value === '') {
                    loginForm.insertAdjacentHTML(`beforeend`, `<p>login and password required!!!</p>`);
                    return;
                }
                else {
                    data[item.id.slice(0,1)] = item.value;
                }
            }
            socket.send(JSON.stringify(data));

            return false;
        };
        loginForm.submit(event);
    }
});

socket.onopen = function (e) {
    console.log('[open] Connection established');
    console.log('Sending data to server');
    // console.log(e);
    // socket.send(e);
};

document.forms.adminka.onsubmit = event => {
    event.preventDefault();

    const form = event.target;
    const data = [];

    for (let item of form) {
        item.checked === true ? data.push({name: item.name, status: item.value}) : null;
        (item.type === 'text' && item.value !== '')
            ? data.find(el => {
                if (el.name === item.dataset.name) {
                    const timesArr = item.parentNode.childNodes;
                    el['times'] = [];

                    timesArr.forEach(child => child.value !== ''
                        ? el.times.push(child.value)
                        : null
                    );

                    return el.times;
                } else return null;
            })
            : null;
    }

    console.log(data);

    socket.send(JSON.stringify(data));

    return false;
};

document.forms.racerAdminka.onsubmit = event => {
    event.preventDefault();

    const form = event.target;
    const data = {
    };

    for (let item of form) {
        data[item.id] = item.value;
        delete data['racerButton'];
    }

    racers.push(data);

    let display = racers.map(obj => JSON
        .stringify(obj)
        .replaceAll('",', '"\n')
        .replaceAll('"}', '"}\n\n'));

    jsonMonitor.innerText = display;

    for (let item of form) {
        if (item.type === 'text') item.value = '';
    }

    return false;
};

const sendToDb = document.querySelector('#sendJSON');
sendToDb.onclick = function() {
    console.log(racers);
    socket.send(JSON.stringify(racers));
};

// отправка сообщения из формы
// document.forms.pilotsStatus.onsubmit = event => {
//     event.preventDefault();
//     // code here ....
//     return false;
// };


