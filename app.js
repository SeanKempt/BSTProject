class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(array);
  }
}

//function provided by the odin project that prints to the console the tree structure
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

//used with sort as the compare function. That way it doesn't conver to strings for comparison.
const compare = (a, b) => a - b;
//captures only unique elements from the given array utilizing ES6 Sets
const rmDuplicates = (array) => [...new Set(array)];

const buildTree = (array) => {
  const filteredArray = rmDuplicates(array).sort(compare);
  console.log(filteredArray);
  return createBST(filteredArray);
};

const minValue = (root) => {
  let minv = root.data;
  while (root.left !== null) {
    minv = root.left.data;
    root = root.left;
  }
  return minv;
};

const deleteNode = (root, key) => {
  if (root === null) {
    return root;
  }

  if (key > root.data) {
    root.right = deleteNode(root.right, key);
  } else if (key < root.data) {
    root.left = deleteNode(root.left, key);
  } else {
    //if node only has one child
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    root.data = minValue(root.right);

    root.right = deleteNode(root.right, root.data);
  }
  return root;
};

const insertValue = (root, key) => {
  if (root === null) return (root = new Node(key));
  if (key < root.data) {
    root.left = insertValue(root.left, key);
  } else if (key > root.data) {
    root.right = insertValue(root.right, key);
  }
  return root;
};

const createBST = (array, start = 0, end = array.length - 1) => {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  const root = new Node(
    array[mid],
    createBST(array, start, mid - 1),
    createBST(array, mid + 1, end)
  );
  return root;
};

const findNode = (root, value) => {
  if (root === null) {
    return root;
  } else if (value === root) {
    return root;
  } else {
    if (value < root.data) {
      root = findNode(root.left, value);
    } else if (value > root.data) {
      root = findNode(root.right, value);
    }
  }
  return root;
};

//performs breadth first search on a given tree
//putting somefunction here because thats what the assignment called for
//If some function is not defined then we just return the results array with the values
const levelOrder = (root, someFunction = null) => {
  const queue = [];
  const results = [];
  if (root === null) {
    return root;
  }

  queue.push(root);

  while (queue.length >= 1) {
    let currentNode = queue[0];
    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }
    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
    results.push(currentNode);
    queue.shift(currentNode);
  }

  if (someFunction === null) {
    return results;
  } else {
    return someFunction;
  }
};

//D, L, R
//leaving as someFunction until I know what function i'm passing to this function
// need to figure out how to only return the array without having to declare it outside of the function.
const preOrder = (root, someFunction, results = []) => {
  if (root === null) return;
  results.push(root.data);
  preOrder(root.left, results);
  preOrder(root.right, results);
  if (results.length > 0) return results;
};

//L, D, R
const inOrder = (root) => {
  const results = [];
};

//L, R, D
const postOrder = (root) => {
  const results = [];
};

const testTree = new Tree([2, 5, 10, 20, 5, 3, 100, 44, 100, 6]);
const testOak = new Tree([30, 50, 70, 60, 80, 40]);

console.log(testTree);
prettyPrint(testTree.root);
prettyPrint(testOak.root);
let treeRoot = testTree.root;
let oakRoot = testOak.root;

const checkTrue = (root) => {
  if (oakRoot.left === null) {
    console.log(true);
  }
  console.log(oakRoot.left);
};
