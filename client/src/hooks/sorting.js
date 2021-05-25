class Sortings {

    byTimeAsc(arr) {
        let tempVar;

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j]['time'] < arr[i]['time']) {
                    tempVar = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tempVar;
                }
            }
        }
        return arr;
    }

    byTimeDesc(arr) {
        let tempVar;

        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j]['time'] > arr[i]['time']) {
                    tempVar = arr[j];
                    arr[j] = arr[i];
                    arr[i] = tempVar;
                }
            }
        }
        return arr;
    }

    filterBy(arr) {
        arr.map((el, i, ar) => {
            while ( ar.indexOf(el, i+1) !== -1 ) ar.splice(ar.indexOf(el, i+1), 1);
        });
        return arr;
    }
}

export default Sortings;