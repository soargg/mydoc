# LeetCode

## 基本

### 1、数组中N个数之和等于M

[传送门](./combination.md)

### 2、岛屿数量

```
题目描述：
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

示例 1：

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
示例 2：

输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
```

**思路：**`深度遍历`

- 深度遍历，需要记录已访问过的位置，这里只求岛屿数量，暂时先不记。

```js
function numOfLands(grid) {
  	const rows = grid.length, cols = grid[0].length;
    
    const dfs = (grid, cRow, cCol) => {
        if ( cRow < 0 || cRow >= rows || cCol < 0 || cCol >= cols || grid[cRow][cCol] == 0) {
            return;
        }
      
      	grid[cRow][cCol] = 0;
        dfs(grid, cRow + 1, cCol);
        dfs(grid, cRow - 1, cCol);
        dfs(grid, cRow, cCol + 1);
        dfs(grid, cRow, cCol - 1);
    };
  
    let n = 0;
  	for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                dfs(grid, r, c);
                n++
            }
        }
    }
    
    return n;
}
```

### 3、罗马数字转整数

罗马数字包含以下七种字符: `I` ， `V` ， `X` ， `L` ， `C` ， `D` 和 `M` 。

```js
function roman2int(roman) {
    if (!roman) return 0;
    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    let p = 0;
    let result = 0;
    const size = roman.length;
    for (let i = size - 1; i >=0; i--) {
        const c = romanMap[roman[i]];
        if (c < p) {
            result -= c;
        } else {
            result += c;
        }
        p = c;
    }

    return result;
}
```

### 4、数字转罗马字

```javascript
function int2roman(num) {
    if (num >= 4000 || num < 0) { throw new Error('位溢出') }

    const digitMap = {
        0: ['I', 'V', 'X'],
        1: ['X', 'L', 'C'],
        2: ['C', 'D', 'M'],
        3: ['M']
    };

    const toRoman = (n, digit) => {
        const map = digitMap[digit];
        if(n < 4) return map[0].repeat(n);
        if (n === 4) return map[0] + map[1];
        if (n < 9) return map[1] + map[0].repeat(n - 5);
        if (n === 9) return map[0] + map[2]
    }

    let result = '';
    let digit = 0;
    while (num > 0 && digit < 4) {
        const y = num % 10;
        result = toRoman(y, digit) + result;
        digit++

        num = Math.floor(num / 10);
    }

    return result;
}
```

### 5、两数之和等于target

```js
function towSum(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++){
        const n = target - arr[i];
        if (map.has(n)) {
            return [map.get(n), i];
        }

        map.set(arr[i], i);
    }

    return map;
}
console.log(towSum([2, 7, 11, 15], 18));
```

### 6、字符串无重复最长子串

```js
function longestSubstring(str) {
    let store = [];
    let result = '';
    const size = str.length;
    for (let i = 0; i < size; i++) {
        const idx = store.indexOf(str[i]);
        if (idx !== -1) {
            if (store.length > result.length) result = store.join('');
            store = store.splice(idx + 1);

        }
        store.push(str[i])
    }

    return result;
}
```

### 7、最长回文子串

```js
function longestPalindrome(str) {
    // 判断第i到j是不是回文
    // 需要知道第 i-1, j+1
    // j = i; j--;
    const size = str.length;
    const dp = Array.from(new Array(size), () => []);
    let res = '';

    for (let i = 0; i < size; i++) {
        for(let j = i; j >= 0; j--) {
            dp[i][j] = str[i] === str[j] && (j - i < 2 || dp[i - 1][j + 1]);

            if (dp[i][j] && i - j + 1 > res.length) {
                res = str.subStr(j, i - j + 1);
            }
        }
    }

    return res;
}
```

### 8、Z字形访问字符串

```js
function convert(str, cols = 4) {
    const step = (cols - 1) * 2;
    const rows = Array.from(new Array(4), () => []);

    for (let i = 0; i < str.length; i++) {
        const stepBy = i % step;
        const col = stepBy < cols ? stepBy : step - stepBy;
        rows[col].push(str[i]);
    }

    return rows.reduce((t, col) => t + col.join(''), '');
}
```

### 9、九宫格数字按键输出字母排列

```js
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

    return digits.split('').reduce((last, digit) => {
        const temp = [];
        const list = map.get(digit).split('');
        last.forEach(c => {
            for(let i = 0; i < list.length; i++) {
                temp.push(c + list[i]);
            }
        });

        return temp;
    }, ['']);
}
```

## 链表

### 0、ListNode

```js
class ListNode {
    next = null;
    constructor(value) {
        this.value = value;
    }
    static from(arr) {
        let currNode = null;
        let node = null;
        for (let v of arr) {
            const temp = new ListNode(v)
            if (currNode === null) {
                currNode = temp;
                node = temp;
            } else {
                currNode.next = temp;
                currNode = temp;
            }
        }

        return node;
    }
    toArray() {
        let head = this;
        const res = [];
        while(head) {
            res.push(head.value);
            head = head.next;
        }
        return res;
    }
}

module.exports = ListNode;
```



### 1、删除链表中倒数第二个节点

```js 
function removeLastNthNode(head, lastNth) {
    const noop = new ListNode(null);
    let i = 0;
    let $before = new ListNode(null);
    let $after = new ListNode(null);

    $before.next = head;
    $after.next = head;

    while($after) {
        if (i > lastNth) {
            $before = $before.next;
        }
        $after = $after.next;
        i++;
    }

    $before.next = ($before.next || noop).next;

    return head;
}
```

### 2、合并两个有序链表

- 方法1递归

```js
function mergeSoortListNode(list1, list2) {
    if (!list1) {
        return list2;
    }
    if (!list2) {
        return list1;
    }

    if (list1.value > list2.value) {
        list2.next = mergeSoortListNode(list1, list2.next);
        return list2;
    } else {
        list1.next = mergeSoortListNode(list1.next, list2);
        return list1;
    }
}
```

- 方法二 迭代

```js
function mergeSoortListNode(list1, list2) {
    const preHead = new ListNode(0);
    let $p = preHead;

    while(list1 && list2) {
        if (list1.value > list2.value) {
            $p.next = list2;
            list2 = list2.next;
        } else {
            $p.next = list1;
            list1 = list1.next;
        }
        $p = $p.next;
    }

    $p.next = list1 ? list1 : list2;

    return preHead.next;
}
```

### 3、合并k个有序链表

```js
function mergeKList(listArr) {
    return listArr.reduce((l1, l2) => {
        const dummyHead = new ListNode(null);
        let $p = dummyHead;
        
        while(l1 && l2) {
            if (l1.value > l2.value) {
                $p.next = l2;
                l2 = l2.next;
            } else {
                $p.next = l1;
                l1 = l1.next;
            }

            $p = $p.next;
        }

        $p.next = l1 ? l1 : l2;

        return dummyHead.next
    });
}
```

### 4、两数之和

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

```js
const ListNode = require("../js/listnode");

function towNumSum(list1, list2) {
    const dummyNode = new ListNode(0);
    let $p = dummyNode;
    let carry = 0;
    while(list1 !== null || list2 !== null) {
        let val;
        if (list1 === null) {
            val = list2.value;
            list2 = list2.next;
        } else if (list2 === null) {
            val = list1.value;
            list1 = list1.next;
        } else {
            val = list1.value + list2.value;
            list1 = list1.next;
            list2 = list2.next;
        }

        val += carry;
        carry = val > 9 ? 1 : 0;

        $p.next = new ListNode(val % 10);
        $p = $p.next;
    }

    if (carry === 1) {
        $p.next = new ListNode(1);
    }

    return dummyNode.next;
}
```

### 5、k个一组反转链表

```js
const ListNode = require("../js/listnode");

function reverseStepK(head, k = 3) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let $start = dummyHead;
    let $end = head;
    let i = 0;
    while($end) {
        i++;
        if (i % k === 0) {
            $start = reverse($start, $end.next);
            $end = $start.next;
        } else {
            $end = $end.next;
        }
    }

    function reverse(start, end) {
        let curr = start.next;
        let prev = start;
        const first = curr;

        while (curr !== end) {
            const temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }

        start.next = prev;
        first.next = end;

        return first;
    }

    return dummyHead.next;
}

console.log(reverseStepK(ListNode.from([1,2,3,4,5,6,7,8]), 3).toArray())
```

