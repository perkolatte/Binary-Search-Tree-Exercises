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

    function searchSubtree(node) {
      if (val === node.val) {
        return node;
      } else if (val < node.val && node.left) {
        return searchSubtree(node.left);
      } else if (val > node.val && node.right) {
        return searchSubtree(node.right);
      } else {
        return undefined;
      }
    }

    return searchSubtree(this.root);
    // return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {}

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {}

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {}

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {}

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
