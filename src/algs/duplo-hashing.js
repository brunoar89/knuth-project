export default class DoubleHashingHashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null);
    this.keys = new Array(size).fill(null);
  }

  // Primary hash function
  primaryHash(key) {
    return key % this.size;
  }

  // Secondary hash function
  secondaryHash(key) {
    return 1 + (key % (this.size - 1));
  }

  // Insert a key-value pair into the hash table
  insert(key, value) {
    let index = this.primaryHash(key);
    const stepSize = this.secondaryHash(key);

    while (this.table[index] !== null && this.keys[index] !== key) {
      index = (index + stepSize) % this.size;
    }

    this.table[index] = value;
    this.keys[index] = key;
  }

  // Retrieve a value by its key
  get(key) {
    let index = this.primaryHash(key);
    const stepSize = this.secondaryHash(key);

    while (this.keys[index] !== null) {
      if (this.keys[index] === key) {
        return this.table[index];
      }
      index = (index + stepSize) % this.size;
    }

    return null; // Key not found
  }
}
