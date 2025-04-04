export class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class TransposeList {
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
export function transpose(arr, item) {
  let index = arr.indexOf(item);
  if (index > 0) {
    [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]; // Troca os elementos
  }
}
