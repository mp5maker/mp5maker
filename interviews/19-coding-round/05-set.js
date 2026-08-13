const numbers = new Set([1, 2, 3, 4, 5]);

const hasDuplicate = (arr) => {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
};

// O(n) - linear time complexity, where n is the length of the array.
// O(n) - linear space complexity, as we create a new Set to hold the seen numbers.

console.log(hasDuplicate([1, 2, 3, 4, 5])); // Output: false
console.log(hasDuplicate([1, 2, 3, 4, 5, 1])); // Output: true