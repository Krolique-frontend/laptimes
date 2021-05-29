function sortByStatus(arr) {
    return arr.sort((a, b) => {
        let as = a.status === 'session'
            ? 3
            : a.status === 'standby'
                ? 2
                : 1;

        let bs = b.status === 'session'
            ? 3
            : b.status === 'standby'
                ? 2
                : 1;

        return as > bs ? -1 : 1;
    });
}

module.exports = sortByStatus;