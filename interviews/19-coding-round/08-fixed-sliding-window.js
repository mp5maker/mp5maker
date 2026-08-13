const maxSumConsecutive = (numbers, k) => {
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += numbers[i];
  }

  let max = windowSum;

  for (let right = k; right < numbers.length; right++) {
    windowSum += numbers[right];
    windowSum -= numbers[right - k];

    max = Math.max(max, windowSum);
  }

  return max;
};

console.log(maxSumConsecutive([2, 1, 5, 1, 3, 2], 3));
