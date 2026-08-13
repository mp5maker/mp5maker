

const map = new Map();

map.set("name", "John");
map.set("age", 30);
map.set("city", "New York");

console.log(map.get("name")); // Output: John
console.log(map.has("age")); // Output: true
console.log(map.size); // Output: 3

// get -> O(1) - constant time complexity, for retrieving a value by key.
// set -> O(1) - constant time complexity, for adding or updating a key-value pair.
// delete -> O(1) - constant time complexity, for removing a key-value pair by key.