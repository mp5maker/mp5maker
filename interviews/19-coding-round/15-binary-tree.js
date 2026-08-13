//      10
//    /    \
//   5      15
//  / \    /  \
// 3   7  12  20

const tree = {
  value: 10,

  left: {
    value: 5,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },

  right: {
    value: 15,
    left: {
      value: 12,
      left: null,
      right: null,
    },
    right: {
      value: 20,
      left: null,
      right: null,
    },
  },
};

// Tree traversal (Depth First Search)
// 1. Preorder -> Node -> Left -> Right
// 2. InOrder -> Left -> Node -> Right
// 3. PostOrder -> Left -> Right -> Node

const preOrder = (node) => {
  if (node === null) {
    return;
  }

  console.log(node.value);
  preOrder(node.left);
  preOrder(node.right);
};

const inOrder = (node) => {
  if (node === null) {
    return;
  }

  inOrder(node.left);
  console.log(node.value);
  inOrder(node.right);
};

const postOrder = (order) => {
  if (node === null) {
    return;
  }

  postOrder(node.left);
  postOrder(node.right);
  console.log(node.value);
};

// Bread First Search
const bfs = (root) => {
  if (root === null) {
    return;
  }

  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    console.log(node.value);

    if (node.left !== null) {
      queue.push(node.left);
    }

    if (node.right !== null) {
      queue.push(node.right);
    }
  }
};
