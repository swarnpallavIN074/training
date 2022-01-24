function largestSubarraySum(arr)
{
    let len = arr.length;
    let ans = arr[0];
    let sum = 0;
    for(let i = 0; i < len; i++)
    {
        sum += arr[i];

        if(sum > ans)
        ans = sum;

        if(sum < 0)
        sum = 0;
    }
    return ans;
}

let arr = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(largestSubarraySum(arr));