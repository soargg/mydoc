var arr = [10, 11, 0, 5, 1, 2,  6, 7, 3, 4, 8, 9];

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

function reverseByK(arr = [], k = 3) {
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

// console.log(findSumIsMArrayList(arr, 3, 8));
// reverseByK(arr, 4);
// reverse(arr);


// console.log(arr);

// 冒泡排序
Array.prototype.bubblingSort = function() {
    if (this.length < 2) {
        return this;
    }

    for (let i = 0; i < this.length - 1; i++) {
        const tep = this[i];
        if (tep > this[i + 1]) {
            this[i] = this[i + 1];
            this[i + 1] = tep;
        }
    }

    return this;
}

/**
 * 选择排序
 * @returns Array
 */
Array.prototype.selSort = function() {
    const arr = this;
    const size = this.length;

    for (let i = 0; i < size - 1; i++) {
        for (let j = i + 1; j < size; j++) {
            if (arr[i] > arr[j] ) {
                let t = arr[i];    
                arr[i] = arr[j];
                arr[j] = t;
            }
        }
    }

    return this;
}

/**
 * 插入排序
 * @returns Array
 */
Array.prototype.insertSort = function() {
    const arr = this;
    const size = this.length;

    for (let i = 1; i < size - 1; i++) {
        for(let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                let t = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = t;
            } else {
                break;
            }
        }
    }

    return this;
}

console.log(arr.insertSort())