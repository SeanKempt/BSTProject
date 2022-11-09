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

  insertValue = (key, root = this.root) => {
    if (root === null) return (root = new Node(key));
    if (key < root.data) {
      root.left = this.insertValue(key, root.left);
    } else if (key > root.data) {
      root.right = this.insertValue(key, root.right);
    }
    return root;
  };

  findNode = (value, root = this.root) => {
    if (root === null) {
      return root;
    } else if (value === root) {
      return root;
    } else {
      if (value < root.data) {
        root = this.findNode(value, root.left);
      } else if (value > root.data) {
        root = this.findNode(value, root.right);
      }
    }
    return root;
  };

  //performs breadth first search on a given tree
  //putting somefunction here because thats what the assignment called for
  //If some function is not defined then we just return the results array with the values
  levelOrder = (root = this.root, someFunction = null) => {
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
  preOrder = (root = this.root, results = [], callbackFn) => {
    if (root === null) {
      return;
    } else {
      callbackFn ? callbackFn(root.data) : results.push(root.data);
      this.preOrder(root.left, results);
      this.preOrder(root.right, results);
    }
    return results;
  };

  //L, D, R
  inOrder = (root = this.root, results = [], callbackFn) => {
    if (root === null) {
      return;
    } else {
      this.inOrder(root.left, results);
      callbackFn ? callbackFn(root.data) : results.push(root.data);
      this.inOrder(root.right, results);
    }
    return results;
  };

  //L, R, D
  postOrder = (root = this.root, results = [], callbackFn) => {
    if (root === null) {
      return;
    } else {
      this.postOrder(root.left, results);
      this.postOrder(root.right, results);
      callbackFn ? callbackFn(root.data) : results.push(root.data);
    }
    return results;
  };

  height = (node) => {
    if (node === null) {
      return 0;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  depthRec = (node, root = this.root) => {
    if (root === null) {
      return -1;
    }

    let depth = -1;
    if (
      root.data === node ||
      (depth = this.depthRec(node, root.left)) >= 0 ||
      (depth = this.depthRec(node, root.right)) >= 0
    ) {
      return depth + 1;
    }
  };

  isBalanced = (root = this.root) => {
    let verdict;
    if (root === null) {
      return root;
    } else {
      let leftHeight = this.height(root.left);
      let rightHeight = this.height(root.right);
      if (leftHeight - rightHeight >= 1 || rightHeight - leftHeight >= 1) {
        verdict = false;
      } else {
        verdict = true;
      }
    }
    return verdict;
  };

  treeToArray = (root = this.root, xArray = []) => {
    if (root === null) {
      return root;
    } else {
      xArray.push(root.data);
      if (root.left !== null) this.treeToArray(root.left, xArray);
      if (root.right !== null) this.treeToArray(root.right, xArray);
    }
    return xArray;
  };

  reBalance = (root = this.root) => {
    let tree = new Tree(this.treeToArray(root));
    this.root = tree.root;
    return tree.root;
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

const testTree = new Tree([2, 5, 10, 20, 5, 3, 100, 44, 100, 6]);
const testOak = new Tree([30, 50, 70, 60, 80, 40]);
