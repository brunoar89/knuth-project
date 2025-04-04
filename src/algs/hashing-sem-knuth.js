export default class HashTable {
  constructor(size = 53) {
    this.buckets = new Array(size);
    this.size = size;
  }

  // Função de hash simples (sem Knuth)
  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key.charCodeAt(i);
      hash = (hash * PRIME + char) % this.size;
    }
    return hash;
  }

  // Inserir ou atualizar chave-valor
  set(key, value) {
    const index = this._hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value; // Atualiza valor se chave já existe
        return;
      }
    }

    this.buckets[index].push([key, value]); // Inserção nova
  }

  // Buscar valor pela chave
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    if (bucket) {
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
    }
    return undefined;
  }

  // Verificar se a chave existe
  has(key) {
    return this.get(key) !== undefined;
  }
}
