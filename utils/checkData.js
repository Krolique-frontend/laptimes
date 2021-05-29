function checkData(arr) {
    if (JSON.parse(arr).demo === 'start') return 'start';
    else return JSON.parse(arr)[0].hasOwnProperty('date');
}

module.exports = checkData;