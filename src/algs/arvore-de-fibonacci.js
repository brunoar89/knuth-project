export class FibonacciNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class FibonacciTree {
  constructor() {
    this.root = null;
  }

  buildTree(n) {
    if (n <= 0) {
      return null;
    }
    if (n === 1 || n === 2) {
      return new FibonacciNode(1);
    }

    const node = new FibonacciNode(this.fib(n));
    node.left = this.buildTree(n - 1);
    node.right = this.buildTree(n - 2);
    return node;
  }

  fib(n) {
    if (n <= 1) {
      return n;
    }
    return this.fib(n - 1) + this.fib(n - 2);
  }
}
