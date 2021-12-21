// n个一组，位置互换

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

reverseByK(arr, 4);

// 从数组 [1, 5, 8, 10, 12] 中找到两个数和为 9，返回 [1, 8] 这样的结果。
// const _n = (num) => num.toString(2).replace(/0/g, '').length;
const _n = num => {
    let count = 0;
    while (num > 0) {
        num &= num - 1;
        count ++;
    }

    return count;
}


function findSumIsBy2(arr, N=2, M=9) {
    const result = [];
    const len = arr.length;
    // 计算所有选中未选中的组合
    const size = (1 << len) - 1;

    for(let i = 0; i < size; i++) {
        if (_n(i) === N) {
            let sum = 0, temp = [];
            for(let j = 0; j < len; j++) {
                if ((i & (1 << j)) !== 0) {
                    sum += arr[j];
                    temp.push(arr[j]);
                }
            }

            if (sum === M) {
                result.push(temp);
            }
        }
    }

    return result;
}
// console.log(findSumIsBy2([1,2,3,4,5,6,7,8, 9, 10, 12, 15], 3, 18));

// 将颜色rgb转换为16进制
function rgb2hex(str) {
    const numArr = str.match(/\d+/g).map(i => +i);
    // return `#${numArr.map(n => `${ +n < 16 ? '0' : '' }${(+n).toString(16)}`).join('')}`;
    const [r, g, b] = numArr;
    return '#' + ((r << 16) + (g << 8) + b).toString(16);
}


// console.log(rgb2hex('rgb(25, 25, 25)'));

// 岛屿数量问题
const grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
]
// const grid = [
//     [1, 1, 1, 1, 0],
//     [1, 1, 0, 1, 0],
//     [1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0]
// ]

function numIsLands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const dfs = (grid, r, c) => {
        const rows = grid.length;
        const cols = grid[0].length;

        if (r < 0 || c < 0 || c >= cols || r >= rows || grid[r][c] === 0) {
            return;
        }

        grid[r][c] = 0;

        dfs(grid, r, c + 1);
        dfs(grid, r + 1, c);
        dfs(grid, r, c - 1);
        dfs(grid, r - 1, c);
    }

    let n = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                dfs(grid, r, c);
                n++;
            }
        }
    }

    return n;
}
// console.log(numIsLands(grid));

