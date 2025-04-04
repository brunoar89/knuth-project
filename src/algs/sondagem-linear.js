export default class LinearProbingHash {
  constructor(size = 53) {
    this.size = size;
    this.table = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    let index = this._hash(key);
    let start = index;

    while (this.table[index] && this.table[index][0] !== key) {
      index = (index + 1) % this.size;
      if (index === start) return; // tabela cheia
    }

    this.table[index] = [key, value];
  }

  get(key) {
    let index = this._hash(key);
    let start = index;

    while (this.table[index]) {
      if (this.table[index][0] === key) return this.table[index][1];
      index = (index + 1) % this.size;
      if (index === start) break;
    }

    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}
