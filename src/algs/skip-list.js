export class SkipNode {
  constructor(value, level) {
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

export default class SkipList {
  constructor(maxLevel, probability) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.header = new SkipNode(null, maxLevel);
    this.level = 0;
  }

  randomLevel() {
    let lvl = 0;
    while (Math.random() < this.probability && lvl < this.maxLevel) {
      lvl++;
    }
    return lvl;
  }

  insert(value) {
    let update = new Array(this.maxLevel + 1).fill(null);
    let current = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    let lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) {
        update[i] = this.header;
      }
      this.level = lvl;
    }

    let newNode = new SkipNode(value, lvl);
    for (let i = 0; i <= lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  search(value) {
    let current = this.header;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
    }
    current = current.forward[0];
    return current && current.value === value ? current : null;
  }
}
