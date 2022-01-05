const nums = [1, 6, 4, 9, 2, 1];
// let n_1 = 0;
// let n_2 = 0;

// for (let i = 0; i < nums.length; i ++) {
//     const temp = n_1;
//     n_1 = Math.max(nums[i] + n_2, n_1);
//     n_2 = temp;
// }

/**
 * 打劫
 * 每隔一个位置选择一个数累加，寻找最大和
 * 思路还是和其他简单的动态规划问题一样，我们的本质上是解决对于第【i】个房子抢还是不抢的问题
 * 判断的标准就是总价值哪个更大，那么对于抢的话，就是当前的房子的价值 + dp[i - 2]; (i - i)不能抢
 * 如果不抢，就是dp[i-1]
 * dp[i] = Math.max(dp[i - 2] + nums[n], dp[i]); n = i - 2
 * dp[i] 对应的就是 nums[i - 2] 的价值
 * @param {Array} nums 
 * @returns 
 */
function rob(nums = []) {
    const dp = [0, 0];

    for(let i = 2; i < nums.length + 2; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i - 2], dp[i - 1]);
    }

    console.log('rob：', dp[nums.length + 1]);
    return dp[nums.length + 1];
}

rob(nums);


// let num = parseInt('000000000000000001', 2);

// let c = 0;

// while(num !== 0) {
//     num = num & (num - 1)
//     c ++;
// }

// console.log(c)
