const twoSum = (numbers, target) => {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left, right];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
};

console.log(twoSum([1, 2, 3, 4, 5, 6, 7], 7));

// This one works because the array is sorted
// Time: O(n)
// Space: O(1)
