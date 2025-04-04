export class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export default class AVLTree {
  insert(node, key) {
    if (!node) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this.insert(node.left, key);
    } else {
      node.right = this.insert(node.right, key);
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    return node;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  inorder(node) {
    if (node) {
      this.inorder(node.left);
      this.inorder(node.right);
    }
  }
}
