const fs = require('fs');

function sortByNum() {
    let arr = require(process.argv[2]);

    arr = arr.sort((a, b) => {
        if (a.number.match(/[^0-9]/) || b.number.match(/[^0-9]/)) console.log(a.number.match(/[^0-9]/), b.number.match(/[^0-9]/));
        else return Number(a.number) < Number(b.number) ? -1 : 1;
    });

    console.log(arr);
}

sortByNum();