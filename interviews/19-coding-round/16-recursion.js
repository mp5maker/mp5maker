const factorial = (n, memo = {}) => {
  if (n <= 1) return 1;

  if (memo[n]) return memo[n];

  memo[n] = n * factorial(n - 1, memo);

  return memo[n];
};
