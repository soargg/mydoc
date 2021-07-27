# LeetCode

## 一、数组中N个数之和等于M

[传送门](./combination.md)

## 二、岛屿数量

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

