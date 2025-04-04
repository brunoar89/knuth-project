export class HashTableDoubleHashing {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    hashFunction1(key) {
        return key % this.size;
    }

    hashFunction2(key) {
        return 1 + (key % (this.size - 1)); // Segunda função hash
    }

    insert(key, value) {
        let index = this.hashFunction1(key);
        let step = this.hashFunction2(key);

        while (this.table[index] !== null) {
            index = (index + step) % this.size; // Duplo Hashing
        }
        this.table[index] = { key, value };
    }

    display() {
        console.log("Hash Table (Duplo Hashing):", this.table);
    }
}

// Exemplo de Uso
const hashDouble = new HashTableDoubleHashing(10);
hashDouble.insert(15, "A");
hashDouble.insert(25, "B");
hashDouble.display();
