export class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class MoveToFrontList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  search(key) {
    let prev = null;
    let current = this.head;

    while (current) {
      if (current.data === key) {
        if (prev) {
          prev.next = current.next;
          current.next = this.head;
          this.head = current;
        }
        return current;
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
    console.log("Lista Move-to-Front:", result);
  }
}
