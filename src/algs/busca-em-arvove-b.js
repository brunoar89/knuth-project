export class BTreeNode {
    constructor(t, leaf = false) {
        this.t = t; // Grau mínimo (t)
        this.leaf = leaf; // Define se é folha
        this.keys = []; // Lista de chaves
        this.children = []; // Lista de filhos
    }
}

class BTree {
    constructor(t) {
        this.root = new BTreeNode(t, true);
        this.t = t;
    }
}

class BTreeSearch extends BTree {
    search(node, key) {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }
        if (i < node.keys.length && node.keys[i] === key) {
            return true;
        }
        if (node.leaf) {
            return false;
        }
        return this.search(node.children[i], key);
    }
}

// Exemplo de uso
const btSearch = new BTreeSearch(2);
const root = btSearch.root;
root.keys = [10, 20, 30]; // Inserindo manualmente

console.log("Busca pelo 20:", btSearch.search(root, 20) ? "Encontrado" : "Não encontrado"); // True
console.log("Busca pelo 50:", btSearch.search(root, 50) ? "Encontrado" : "Não encontrado"); // False
