export class HashTableLinearProbing {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    hashFunction(key) {
        return key % this.size;
    }

    insert(key, value) {
        let index = this.hashFunction(key);
        while (this.table[index] !== null) {
            index = (index + 1) % this.size; // Sondagem Linear
        }
        this.table[index] = { key, value };
    }

    display() {
        console.log("Hash Table (Sondagem Linear):", this.table);
    }
}

// Exemplo de Uso
const hashLinear = new HashTableLinearProbing(10);
hashLinear.insert(15, "A");
hashLinear.insert(25, "B");
hashLinear.display();
