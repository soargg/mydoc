var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const _n = (n) => {
    let count = 0;
    while(n !== 0) {
        n &= n - 1;
        count ++
    }

    return count;
}

function findSumIsMArrayList(array = [], n, SUM) {
    const length = array.length;
    const size = (1 << length) - 1;
    const result = [];

    for(let i = (1 << n) - 1; i <= size; i++) {
        if (_n(i) === n) {
            let sum = 0, temp = [];
            for(let j = 0; j < length; j++) {
                if ((i & (1 << j)) !== 0) {
                    sum += array[j];
                    temp.push(array[j]);
                }
            }

            if (sum === SUM) {
                result.push(temp);
            }
        }
    }

    return result;
}

function divisionByKreverse(arr = [], k = 3) {
    if (k < 2) return;

    const size = arr.length;
    
    function reverseInner(index = 0) {
        const stop = (size - index >= k ? k : size - index) - 1;

        for (let i = 0; i < stop / 2; i++) {
            const t = arr[index + i];
            arr[index + i] = arr[index + stop - i];
            arr[index + stop - i] = t;
        }

        if (size - index > k) {
            reverseInner(index + k)
        }
    }

    reverseInner(0)
}

/**
 * 翻转数组
 * @param {Array} arr 
 */
function reverse(arr = []) {
    const stop = arr.length - 1;
    
    for(let i = 0; i < stop / 2; i++) {
        const t = arr[i];
        arr[i] = arr[stop - i];
        arr[stop - i] = t;
    }
}

console.log(findSumIsMArrayList(arr, 3, 8));
// divisionByKreverse(arr, 4);
// reverse(arr);


// console.log(arr);
