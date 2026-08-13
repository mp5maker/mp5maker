const isValidParenthesis = (str) => {
  const stack = [];

  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of str) {
    if (["(", "[", "{"].includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

console.log(isValidParenthesis("(([[]]))"));
// Time O(n)
// Space O(n)