export default class HashTableChaining {
  constructor(size) {
    this.size = size;
    this.table = Array.from({ length: size }, () => []);
  }

  hashFunction(key) {
    return key % this.size;
  }

  insert(key, value) {
    let index = this.hashFunction(key);
    this.table[index].push({ key, value }); // Encadeamento Separado
  }

  display() {
    console.log("Hash Table (Encadeamento Separado):", this.table);
  }
}
