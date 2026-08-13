// An array sotres elements in an ordered collections

const numbers = [10, 20, 30, 40];


// numbers.push(50);     // O(1) amortized
// numbers.pop();        // O(1)
// numbers.unshift(5);   // O(n)
// numbers.shift();      // O(n)

const findMax = (numbers = numbers) => {
  let max = numbers[0];
  for (const number of numbers) {
    if (number > max) {
      max = number;
    }
  }
  return max;
}

console.log(findMax(numbers)); // 40
// O(n) - linear time complexity, where n is the length of the array.
// O(1) - constant time complexity, for accessing an element by index.