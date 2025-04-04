export class FibonacciNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class FibonacciTree {
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

// Função para imprimir a árvore de forma estruturada
function printTree(node, level = 0) {
    if (node !== null) {
        printTree(node.right, level + 1);
        console.log("   ".repeat(level) + node.value);
        printTree(node.left, level + 1);
    }
}

// Exemplo de uso
const fibTree = new FibonacciTree();
fibTree.root = fibTree.buildTree(6);

console.log("Árvore de Fibonacci estruturada:");
printTree(fibTree.root);
