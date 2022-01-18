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

console.log(longestSunString('abcabdbb'));

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
    let resStr = '';
    const n = str.length;
    const dp = Array.from(new Array(n), () => []);

    for (let i = 0; i < n; i++) {
        for(let j = i; j >=0; j--) {
            dp[i][j] = str[i] === str[j] && (i - j < 2 || dp[i - 1][j + 1]);

            if (dp[i][j] && i - j + 1 > resStr.length) {
                resStr = str.substr(j, i - j + 1)
            }
        }
    }

    return resStr;
}


function convert(str, row) {
    const n = str.length;
    const res = Array.from(new Array(row), () =>[]);

    for (let i = 0; i < n; i++) {
        let f = i % (2 * (row - 1));
        let j = f >= row ? 2 * (row - 1) - f : f;
        
        res[j].push(str[i])
    }

    return res.reduce(((r, t) => r + t.join('')), '');
}

// console.log(convert('LEETCODEISHIRING', 4));

function reverseNum(num) {
    let res = 0;
    let f = num > 0 ? 1 : -1
    num = Math.abs(num)
    while(num !== 0) {
        res = res * 10 + num % 10;
        num = Math.floor(num / 10); 
    }

    return f * res;
}

function maxArea(arr) {
    let max = 0;
    const size = arr.length;
    for (let i = 0; i < size; i++) {
        for(let j = i; j < size; j++) {
            let currentArea = Math.abs(j - i) * Math.min(arr[i], arr[j]);

            max = Math.max(max, currentArea);
        }
    }

    return max;
}


/**
 * 整数转罗马数字
 * 注意4和9的处理方式，由于9的罗马文需要用到10，
 * I(1),V(5),X(10)处理范围[1,9]；
 * X(10),L(50),C(100)处理范围[10,90]；
 * C(100),D(500),M(1000)处理范围[100,900]；
 * @param {Number} num 
 */
function int2Roman(num) {
    const bit = {
        0: ['I', 'V', 'X'],
        1: ['X', 'L', 'C'],
        2: ['C', 'D', 'M'],
        3: ['M']
    }

    const toRoman = (n, curBit) => {
        if (n === 0) return '';
        if (n < 4) return curBit[0].repeat(n);
        if (n === 4) return curBit[0] + curBit[1];
        if (n < 9) return curBit[1] + curBit[0].repeat(n - 5)
        if (n === 9) return curBit[0] + curBit[2]
    }

    let N = num;
    const len = (num + '').length;
    let res = '';

    for (let i = len - 1; i >= 0; i--) {
        const curMod = Math.pow(10, i)
        let n = Math.floor(N/curMod);
        N %= curMod;
        res += toRoman(n, bit[i])
    }

    return res;
}


function roman2int(roman) {
    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    let num = 0;
    let lastRomanNum = 0;
    const len = roman.length;

    for(let i = len - 1; i >= 0; i--) {
        const curNum = romanMap[roman[i]];
        num += curNum < lastRomanNum ? -curNum : curNum;
        lastRomanNum = curNum;
    }

    return num;
}

// console.log(roman2int('LVIII'));


function longestCommonPrefix(strArr) {
    let comPre = strArr[0];
    const size =strArr.length;
    for (let i = 1; i < size; i++) {
        let j = 0;
        for(; j < strArr[i].length; j++) {
            if (comPre[j] !== strArr[i][j]) break;
        }

        if (j === 0) return '';

        comPre = comPre.substr(0, j)
    }

    return comPre;
} 
console.log(longestCommonPrefix(["flower","flow","flight"]))


function findKItemSumIs(arr, k = 3, M) {
    const result = [];
    const len = arr.length;
    const size = (1 << len) - 1;

    const _n = (n) => {
        let count = 0;
        while (n !== 0) {
            n &= n-1;
            count++;
        }
        return count;
    }

    for(let i = (1 << 3) - 1; i < size; i++) {
        if (_n(i) === k) {
            let temp = [];
            let count = 0;
            for (let j = 0; j < len; j++) {
                if ((i & (1 << j)) !== 0) {
                    temp.push(arr[j])
                    count += arr[j]
                }
            }
            if (count === M) {
                result.push(temp)
            }
        }
    }

    return result;
}

// console.log(findKItemSumIs([1,2,3,4,5,6,7,8, 9, 10, 12, 15], 3, 18));


/**
 * 
 * @param {Array<number>} nums [-1, 0, 1, 2, -1, -4]
 */
function threeSum(nums) {
    const reslut = [];
    nums = nums.sort((x, y) => x - y);

    for (let i = 0; i < nums.length; i++) {
        // 排好序的，后面不可能是0 
        if (nums[i] > 0) break;
        
        let left = i + 1, right = nums.length - 1;

        while (left < right) {
            if ( nums[i] + nums[left] + nums[right] === 0) {
                reslut.push([ nums[i], nums[left], nums[right] ]);

                while (nums[left] === nums[left + 1]) {
                    left++;
                }
                left++;

                while (nums[right] === nums[right - 1]) {
                    right--;
                }
                right--;
                continue;
            } else if (nums[i] + nums[left] + nums[right] > 0) {
                right--
            } else {
                left++
            }
        }
    }

    return reslut;
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

function threeSumCloseM(nums, M) {
    let result = [];
    let min = Infinity;
    nums = nums.sort((x, y) => x - y);
    const size = nums.length;

    for(let i = 0; i < size; i ++) {
        let left = i + 1, right = size - 1;

        if (nums[i] > M) break; 
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (Math.abs(M - sum) < min) {
                min  = Math.abs(M - sum);
                result = [nums[i], nums[left], nums[right]]
            }

            sum > M ? right-- : left ++;
        }
    }

    return result;
}

// console.log(threeSumCloseM([-1,2,1,-4], 1));

function letterCombinations(digits) {
    if (!digits) {
        return [];
    }

    const map = new Map();
    map.set("2", "abc");
    map.set("3", "def");
    map.set("4", "ghi");
    map.set("5", "jkl");
    map.set("6", "mno");
    map.set("7", "pqrs");
    map.set("8", "tuv");
    map.set("9", "wxyz");

    const tempArr = digits.split('').map(key => map.get(key));
    return tempArr.reduce((root, item) => {
        const resArr = [];
        root.forEach(b => {
            for (let i = 0; i < item.length; i++) {
                resArr.push(b + item[i])
            }
        });
        return resArr;
    }, [''])
}

// console.log(letterCombinations('239'));

function collaps(str) {
    const size = str.length;
    let left = 0, right = size - 1;
    let res = '';

    while (left < right) {
        res += (str[left] + '' + str[right]);
        left++;
        right--;
    }

    console.log(res);
}

// collaps('123456')
function zstr(str, n=4) {
    const res = Array.from(new Array(n), () => []);
    const size = str.length;
    const step = 2 * (n - 1);

    for(let i = 0; i < size; i++) {
        let c = i % step;
        const idx = c < n ? c : step - c;
        res[idx].push(str[i])
    }
    return res.reduce((s, sarr) => s + sarr.join(''), '')
}

// console.log(zstr('LEETCODEISHIRING', 4));