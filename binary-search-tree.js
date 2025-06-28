class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let currentNode = this.root;

    while (true) {
      if (val < currentNode.val) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = new Node(val);
          break;
        }
      } else if (val > currentNode.val) {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = new Node(val);
          break;
        }
      } else {
        // val is equal to currentNode.val.
        // Break to avoid creating a duplicate node.
        break;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    function insertVal(node) {
      if (node === null) {
        return new Node(val);
      } else if (val < node.val) {
        node.left = insertVal(node.left);
        return node;
      } else if (val > node.val) {
        node.right = insertVal(node.right);
        return node;
      } else {
        return node;
      }
    }

    this.root = insertVal(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) {
      return undefined;
    }

    let node = this.root;

    while (true) {
      if (val === node.val) {
        return node;
      } else if (val < node.val && node.left) {
        node = node.left;
      } else if (val > node.val && node.right) {
        node = node.right;
      } else {
        return undefined;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (this.root === null) {
      return undefined;
    }
    return this._searchSubtreeForVal(val, this.root);
  }

  _searchSubtreeForVal(val, node) {
    if (node === null) {
      return undefined;
    }
    if (val === node.val) {
      return node;
    } else if (val < node.val) {
      return this._searchSubtreeForVal(val, node.left);
    } else if (val > node.val) {
      return this._searchSubtreeForVal(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if (!this.root) {
      return [];
    }

    const visitedNodes = [];

    function tourSubtree(node) {
      visitedNodes.push(node.val);
      if (node.left) {
        tourSubtree(node.left);
      }
      if (node.right) {
        tourSubtree(node.right);
      }
    }

    tourSubtree(this.root);
    return visitedNodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if (!this.root) {
      return [];
    }

    const visitedNodes = [];

    function tourSubtree(node) {
      if (node.left) {
        tourSubtree(node.left);
      }
      visitedNodes.push(node.val);
      if (node.right) {
        tourSubtree(node.right);
      }
    }

    tourSubtree(this.root);
    return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) {
      return [];
    }

    const visitedNodes = [];

    function tourSubtree(node) {
      if (node.left) {
        tourSubtree(node.left);
      }
      if (node.right) {
        tourSubtree(node.right);
      }
      visitedNodes.push(node.val);
    }

    tourSubtree(this.root);
    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) {
      return [];
    }

    const toVisit = [this.root];
    const visitedNodes = [];

    while (toVisit.length > 0) {
      let node = toVisit.shift();
      visitedNodes.push(node.val);
      if (node.left) {
        toVisit.push(node.left);
      }
      if (node.right) {
        toVisit.push(node.right);
      }
    }

    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (this.root === null) {
      return undefined;
    }

    const _searchSubtreeForValWithParent = (
      val,
      node = this.root,
      parent = undefined,
      leftOrRight
    ) => {
      if (node === null) {
        return undefined;
      }
      if (val === node.val && parent === undefined) {
        // val is in root node
        return [node];
      } else if (val === node.val) {
        return [node, parent, leftOrRight];
      } else if (val < node.val) {
        return _searchSubtreeForValWithParent(val, node.left, node, "left");
      } else if (val > node.val) {
        return _searchSubtreeForValWithParent(val, node.right, node, "right");
      }
    };

    const findSmallestInSubtree = (node, parent) => {
      if (node.left) {
        return findSmallestInSubtree(node.left, node);
      } else {
        return [node, parent];
      }
    };

    const destroyNodeNeatly = (node, parent = undefined, leftOrRight) => {
      if (parent === undefined) {
        this.root = undefined;
      } else if (!node.left && !node.right) {
        // Case 1: Node has no children
        parent[leftOrRight] = null;
      } else if (node.left && !node.right) {
        // Case 2: Node has only left child
        parent[leftOrRight] = node.left;
      } else if (node.right && !node.left) {
        // Case 3: Node has only right child
        parent[leftOrRight] = node.right;
      } else if (node.left && node.right) {
        // Case 3: Node has two children
        const [smallest, smallestParent] = findSmallestInSubtree(
          node.right,
          node
        );
        node.val = smallest.val;
        if (smallestParent.left === smallest) {
          smallestParent.left = smallest.right;
        } else {
          smallestParent.right = smallest.right;
        }
      }
    };

    const nodeToDestroyWithParent = _searchSubtreeForValWithParent(val);
    if (!nodeToDestroyWithParent) return undefined;
    return destroyNodeNeatly(...nodeToDestroyWithParent);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    if (this.root === null) {
      return true;
    }

    function checkHeightAndBalance(node) {
      if (!node) {
        return { height: -1, isBalanced: true };
      }

      const leftHeight = checkHeightAndBalance(node.left);
      const rightHeight = checkHeightAndBalance(node.right);

      if (!leftHeight.isBalanced || !rightHeight.isBalanced) {
        return { height: 0, isBalanced: false };
      }

      const currentHeight = Math.max(leftHeight.height, rightHeight.height) + 1;

      const currentIsBalanced =
        Math.abs(leftHeight.height - rightHeight.height) <= 1;

      return {
        height: currentHeight,
        isBalanced: currentIsBalanced,
      };
    }

    return checkHeightAndBalance(this.root).isBalanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    // No root or only 1 node
    if (!this.root || (!this.root.right && !this.root.left)) {
      return undefined;
    }

    let node = this.root;
    let parent = null;

    // Largest node has a left subtree
    while (node.right) {
      parent = node;
      node = node.right;
    }

    // Largest node has no left subtree
    if (node.left) {
      let temp = node.left;
      while (temp.right) {
        temp = temp.right;
      }
      return temp.val;
    }

    return parent.val;
  }
}

module.exports = BinarySearchTree;
