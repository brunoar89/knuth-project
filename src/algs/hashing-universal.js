export class UniversalHashing {
    constructor(tableSize, prime) {
        this.m = tableSize; // Tamanho da tabela
        this.p = prime; // Número primo grande
        this.a = Math.floor(Math.random() * (this.p - 1)) + 1; // 1 ≤ a < p
        this.b = Math.floor(Math.random() * this.p); // 0 ≤ b < p
    }

    hash(key) {
        return ((this.a * key + this.b) % this.p) % this.m;
    }
}

// Exemplo de uso:
const hashTable = new UniversalHashing(10, 97);
console.log(hashTable.hash(42)); // Saída: um índice entre 0 e 9



                                            