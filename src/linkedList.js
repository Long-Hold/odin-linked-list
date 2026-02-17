export class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList {
    #length;
    constructor(head = null) {
        if (head instanceof Node || head === null) {
            this.head = head;
            this.#length = head ? 1 : 0;
        } else throw new TypeError('head must be an instance of Node.');
    }

    size() {
        return this.#length;
    }
}