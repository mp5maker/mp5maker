
function frequency(numbers) {
  const count = new Map();

  for (const number of numbers) {
    count.set(number, (count.get(number) || 0) + 1);
  }

  return count;
}

console.log(frequency([1, 2, 2, 3, 3, 3])); // Output: Map { 1 => 1, 2 => 2, 3 => 3 }
// O(n) - linear time complexity, where n is the length of the array.
// O(n) - linear space complexity, as we create a new Map to hold the frequency counts.