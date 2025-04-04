export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class TransposeList {
    constructor() {
        this.head = null;
    }

    insert(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    search(key) {
        if (!this.head || this.head.data === key) {
            return this.head;
        }

        let prev = null;
        let current = this.head;

        while (current && current.next) {
            if (current.next.data === key) {
                let temp = current.next;
                current.next = temp.next;
                temp.next = current;

                if (prev) {
                    prev.next = temp;
                } else {
                    this.head = temp;
                }
                return temp;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }

    display() {
        let current = this.head;
        let result = [];
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        console.log("Lista Encadeada Transpose:", result);
    }
}

// Função de Transpose para Arrays
function transpose(arr, item) {
    let index = arr.indexOf(item);
    if (index > 0) {
        [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]; // Troca os elementos
    }
}

// 🔹 Exemplo de Uso - Lista Encadeada
const tList = new TransposeList();
tList.insert(1);
tList.insert(2);
tList.insert(3);
tList.insert(4);
tList.insert(5);

console.log("\n🔹 Antes da busca na Lista Encadeada:");
tList.display();

tList.search(4);

console.log("\n🔹 Depois da busca (4 movido para frente):");
tList.display();

// 🔹 Exemplo de Uso - Array
const lista = [1, 2, 3, 4, 5];

console.log("\n🔹 Antes da transposição no Array:", lista);
transpose(lista, 4);
console.log("\n🔹 Depois da transposição no Array:", lista);
