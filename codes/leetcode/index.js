// n个一组，位置互换

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function reverseByK(arr = [], k = 3) {
    const len = arr.length;
    let idx = 0;

    while (idx <= len) {
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

        idx += stop;
    }
}

// reverseByK(arr, 3);

// 从数组 [1, 5, 8, 10, 12] 中找到两个数和为 9，返回 [1, 8] 这样的结果。
// const _n = (num) => num.toString(2).replace(/0/g, '').length;
const _n = num => {
    let count = 0;
    while (num > 0) {
        num &= num - 1;
        count++;
    }

    return count;
}


function findSumIsBy2(arr, N = 2, M = 9) {
    const result = [];
    const len = arr.length;
    // 计算所有选中未选中的组合
    const size = (1 << len) - 1;

    for (let i = (1 << N) - 1; i < size; i++) {
        if (_n(i) === N) {
            let sum = 0, temp = [];
            for (let j = 0; j < len; j++) {
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

// 爬楼梯，每次1阶或2阶，一共有多少中方法
function climbStairs(n) {
    if (n < 0) return 0;
    if (n === 1 || n === 2) {
        return n;
    }

    let next = 0;
    let pre = 2;
    let ppre = 1;

    for (let i = 3; i <= n; i++) {
        next = pre + ppre;
        ppre = pre;
        pre = next;
    }
    console.log('四阶楼梯：', next);
    return next;
}

// climbStairs(5)

function lengthOfLongestSubstring(str) {
    const arr = [];
    let max = 0;

    for (c of str) {
        const index = arr.indexOf(c);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(c);
        max = Math.max(arr.length, max);
    }

    return max;
}

function longestSunString(str) {
    let arr = [];
    let res = '';

    for (c of str) {
        const index = arr.indexOf(c);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }

        arr.push(c);

        if (arr.length > res.length) {
            res = arr.join('');
        };
    }

    return res;
}

// console.log(longestSunString('abcabdbb'));

class Schedule {
    arr = [1, 2, 3, 4, 5];

    add(promiseFun) {
        this.arr.push(promiseFun());
    }

    run() {
        this.arr.reduce((promFun, item) => {
            return promFun.then(() => {
                return new Promise(reslove => {
                    setTimeout(() => {
                        console.log(item)
                        reslove(item)
                    }, 500)
                })
            })
        }, Promise.resolve())
    }
}

const sch = new Schedule;
// sch.run()

function longestPalindrome(str) {
    let ans = '';
    let n = str.length;
    const dp = Array.from(new Array(n), () => new Array());

    for (let i = 0; i < n; i++) {
        for(let j = i; j >= 0; j--) {
            dp[i][j] = str[i] === str[j] && (i - j < 2 || dp[i - 1][j+1]);
            
            if (dp[i][j] && i - j + 1 > ans.length) {
                ans = str.slice(j, i+1)
            }
        }
    }

    return ans
}

console.log(longestPalindrome('sdafkfssa'))