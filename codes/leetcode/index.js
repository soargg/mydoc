const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function reverseByK(arr = [], k = 3) {
    const len = arr.length;

    function reverse(idx) {
        const stop = (len - idx >= k) ? k : len - idx;

        for (let i = 0; i < stop / 2; i++) {
            let temp = arr[idx + i];
            const tIdx = idx + stop - i - 1;
            arr[idx + i] = arr[tIdx];
            arr[tIdx] = temp;
        }

        if (len - idx <= k) {
            return;
        }

        reverse(idx + stop)
    }

    reverse(0)
}

// reverseByK(arr, 4);

// 从数组 [1, 5, 8, 10, 12] 中找到两个数和为 9，返回 [1, 8] 这样的结果。

const arr2 = [1, 5, 8, 10, 12];


const _n = (num) => num.toString(2).replace(/0/g, '').length;

function findSumIsBy2(arr, count=2, total=9) {
    const size = (1 << arr.length) - 1;

    // for (let i=0; i < len; i++) {
    //     for (let j = i+1; j < len; j++) {
    //         if (arr[i] + arr[j] === 9) {
    //             return [arr[i], arr[j]]
    //         }
    //     }
    // }

    const resList = [];

    for (let i = 0; i < size; i++) {
        if (_n(i) === count) {
            let temp = [], sum = 0;
            for (let j = 0; j < arr.length; j++) {
                if ((i & (1 << j)) !== 0) {
                    sum += arr[j];
                    temp.push(arr[j]);
                }
            }

            if (sum === total) {
                resList.push(temp)
            }
        }
    }

    return resList;
}
// console.log(findSumIsBy2([1,2,3,4,5,6,7,8], 3, 9));

// 将颜色rgb转换为16进制
function rgb2hex(str) {
    const numArr = str.match(/\d+/g);
    return `#${numArr.map(n => `${ +n < 16 ? '0' : '' }${(+n).toString(16)}`).join('')}`;
}

console.log(rgb2hex('rgb(15, 15, 15)'));
