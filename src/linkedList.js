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

    /**
     * Creates and appends a new Node with an assigned value to the end of list.
     * @param {any} value - The value assigned to the new Node.
     */
    append(value = null) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            ++this.#length;
            return;
        }

        let dummy = this.head;
        while (dummy.next) {
            dummy = dummy.next;
        }

        dummy.next = node;
        ++this.#length;
    }

    prepend(value = null) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            ++this.#length;
            return;
        }

        let temp = this.head;
        this.head = node;
        this.head.next = temp;
        ++this.#length;
    }

    /**
     * Returns the last node in the Linked List or null if the list is empty.
     * @returns {Node|null} The last Node in the list or null.
     */
    tail() {
        if (!this.head) return null;
        let dummy = this.head;
        while (dummy.next) {
            dummy = dummy.next;
        }

        return dummy;
    }
}