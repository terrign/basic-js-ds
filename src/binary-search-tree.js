const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor () {
    this.Root = null
  }

  root() {
    return this.Root;
  }

  add(value) {
    const addNode = (node, value) => {
      if (!node) return new Node(value)
      if (node.data === value) return node
      if (node.data > value) node.left = addNode(node.left, value)
      if (node.data < value) node.right = addNode(node.right, value)
      return node;
    }
    this.Root = addNode(this.root(), value)

  }

  has(value) {
    const search = (node,value) => {
      if (!node) return false
      if (node.data === value) return true
      if (node.data > value) return search(node.left, value)
      if (node.data < value) return search(node.right, value)
    }
    return search(this.root(), value)
  }

  find(value) {
    const searchNode  = (node, value) => {
      if (!node) return null
      if (node.data === value) return node
      if (node.data > value) return searchNode(node.left, value)
      if (node.data < value) return searchNode(node.right, value)
    }
    return searchNode(this.root(), value)
  }

  remove(value) {
    const removeNode = (node, value) => {
      if (!node) return null

      if (!node.left && !node.right) return null

      if (node.data > value ) {
        node.left = removeNode(node.left, value)
        return node
      }

      if (node.data < value) {
        node.right = removeNode(node.right, value)
        return node
      }

      if (!node.left) {
          node = node.right
          return node
      }

      if (!node.right) {
          node = node.left
          return node
      }

      let maxLeft = node.left;
      while (maxLeft.right) maxLeft = maxLeft.right;
      node.data = maxLeft.data;
      node.left = removeNode(node.left, maxLeft.data);
      return node;
    }
    this.Root = removeNode(this.root(), value)
  }

  min() {
    if (!this.root()) return;
    let node = this.root()
    while (node.left) node = node.left
    return node.data
  }

  max() {
    if (!this.root()) return;
    let node = this.root()
    while (node.right) node = node.right
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};