export default class PerfectHashKnuth {
  constructor(keys) {
    const { table, size } = this._buildPerfectHash(keys);
    this.table = table;
    this.size = size;
  }

  _buildPerfectHash(keys) {
    const n = keys.length;
    let size = n;

    while (true) {
      const table = new Array(size);
      let success = true;

      for (const key of keys) {
        const h1 = this._hash1(key, size);
        let h2 = this._hash2(key, size) || 1;

        let index = h1;
        let i = 0;

        while (table[index] !== undefined && table[index] !== key) {
          i++;
          index = (h1 + i * h2) % size;
          if (i > size) {
            success = false;
            break;
          }
        }

        if (!success) break;

        table[index] = key;
      }

      if (success) {
        return { table, size };
      }

      size++;
    }
  }

  _hash1(key, mod) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % mod;
    }
    return hash;
  }

  _hash2(key, mod) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 17 + key.charCodeAt(i)) % mod;
    }
    return hash;
  }

  has(key) {
    const h1 = this._hash1(key, this.size);
    let h2 = this._hash2(key, this.size) || 1;

    let index = h1;
    let i = 0;

    while (this.table[index] !== undefined) {
      if (this.table[index] === key) return true;
      i++;
      index = (h1 + i * h2) % this.size;
      if (i > this.size) break;
    }

    return false;
  }

  getTable() {
    return this.table;
  }
}
