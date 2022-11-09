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
  //function provided by the odin project that prints to the console the tree structure
  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  minValue = (root = this.root) => {
    let minv = root.data;
    while (root.left !== null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  };

  deleteNode = (key, root = this.root) => {
    if (root === null) {
      return root;
    }

    if (key > root.data) {
      root.right = this.deleteNode(key, root.right);
    } else if (key < root.data) {
      root.left = this.deleteNode(key, root.left);
    } else {
      //if node only has one child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      root.data = minValue(root.right);

      root.right = this.deleteNode(root.data, root.right);
    }
    return root;
  };
}

createBST = (array, start = 0, end = array.length - 1) => {
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

buildTree = (array) => {
  //used with sort as the compare function. That way it doesn't conver to strings for comparison.
  const compare = (a, b) => a - b;
  //captures only unique elements from the given array utilizing ES6 Sets
  const rmDuplicates = (array) => [...new Set(array)];
  const filteredArray = rmDuplicates(array).sort(compare);
  return createBST(filteredArray);
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
const preOrder = (root, results = [], callbackFn) => {
  if (root === null) {
    return;
  } else {
    callbackFn ? callbackFn(root.data) : results.push(root.data);
    preOrder(root.left, results);
    preOrder(root.right, results);
  }
  if (results.length > 0) return results;
};

//L, D, R
const inOrder = (root, results = [], callbackFn) => {
  if (root === null) {
    return;
  } else {
    inOrder(root.left, results);
    callbackFn ? callbackFn(root.data) : results.push(root.data);
    inOrder(root.right, results);
  }
  return results;
};

//L, R, D
const postOrder = (root, results = [], callbackFn) => {
  if (root === null) {
    return;
  } else {
    postOrder(root.left, results);
    postOrder(root.right, results);
    callbackFn ? callbackFn(root.data) : results.push(root.data);
  }
  return results;
};

const height = (root) => {
  if (root === null) {
    return 0;
  }
  let leftHeight = height(root.left);
  let rightHeight = height(root.right);
  return Math.max(leftHeight, rightHeight) + 1;
};

const depthRec = (root, node) => {
  if (root === null) {
    return -1;
  }

  let depth = -1;
  if (
    root.data === node ||
    (depth = depthRec(root.left, node)) >= 0 ||
    (depth = depthRec(root.right, node)) >= 0
  ) {
    return depth + 1;
  }
};

const isBalanced = (root) => {
  let verdict;
  if (root === null) {
    return root;
  } else {
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);
    if (leftHeight - rightHeight >= 1 || rightHeight - leftHeight >= 1) {
      verdict = false;
    } else {
      verdict = true;
    }
  }
  return verdict;
};

const treeToArray = (root, xArray = []) => {
  if (root === null) {
    return root;
  } else {
    xArray.push(root.data);
    if (root.left !== null) treeToArray(root.left, xArray);
    if (root.right !== null) treeToArray(root.right, xArray);
  }
  return xArray;
};

const reBalance = (root) => {
  let tree = new Tree(treeToArray(root));
  return tree.root;
};

const testTree = new Tree([2, 5, 10, 20, 5, 3, 100, 44, 100, 6]);
const testOak = new Tree([30, 50, 70, 60, 80, 40]);
