const text = "hello";

const reverseString = (str) => {
  return str.split("").reverse().join("");
}

console.log(reverseString(text)); // Output: "olleh"
// O(n) - linear time complexity, where n is the length of the string.
// O(n) - linear space complexity, as we create a new array to hold the characters of the string.