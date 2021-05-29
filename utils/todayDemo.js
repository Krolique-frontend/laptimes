function random(num) {
    return Math.floor(Math.random() * num);
}

function todayDemo() {
    const list = db.map(el => {
        el.status = 'park';
        el.times = [];
        return el;
    });

    let p1 = list[5];
    let p2 = list[7];
    let p3 = list[12];
    let p4 = list[28];
    let p5 = list[20];
    let p6 = list[25];
    let p7 = list[14];
    let p8 = list[6];
    let p9 = list[3];

    setTimeout(() => {
        [p1, p2, p3].forEach(p => p.status = 'session');
        [p4, p5, p6].forEach(p => p.status = 'standby');
        sortByStatus(list);

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 3000);

    setTimeout(() => {
        [p1, p2, p3].forEach(p => {
            let time = `01:0${random(2)}:${
                random(59) < 10 ? `0${random(9)}` : random(59)
            }`;

            p.times.push(time);
        });

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 10000);

    setTimeout(() => {
        [p1, p2, p3].forEach(p => {
            p.status = 'park';
        });

        [p4, p5, p6].forEach(p => {
            p.status = 'session';
        });

        [p7, p8, p9].forEach(p => {
            p.status = 'standby';
        });

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 14000);

    setTimeout(() => {
        sortByStatus(list);

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 17500);

    setTimeout(() => {
        [p4, p5, p6].forEach(p => {
            let time = `01:0${random(2)}:${
                random(59) < 10 ? `0${random(9)}` : random(59)
            }`;

            p.times.push(time);
        });

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 21000);

    setTimeout(() => {
        [p4, p5, p6].forEach(p => {
            p.status = 'park';
        });

        [p7, p8, p9].forEach(p => {
            p.status = 'session';
        });

        sortByStatus(list);

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(list));
        } );
    }, 24000);
}

module.exports = todayDemo;