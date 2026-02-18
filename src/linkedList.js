export class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList {
    #size;
    #head;
    #tail;
    constructor(head = null) {
        if (head instanceof Node || head === null) {
            this.#head = head;
            this.#tail = head;
            this.#size = head ? 1 : 0;
        } else throw new TypeError('head must be an instance of Node.');
    }

    get size() {
        return this.#size;
    }

    get head() {
        return this.#head;
    }

    /**
     * Returns the last node in the Linked List or null if the list is empty.
     * @returns {Node|null} The last Node in the list or null.
     */
    get tail() {
        return this.#tail;
    }

    /**
     * Creates and appends a new Node with an assigned value to the end of list.
     * @param {any} value - The value assigned to the new Node.
     */
    append(value = null) {
        const node = new Node(value);
        if (!this.#head) {
            this.#head = node;
            this.#tail = node;
            ++this.#size;
            return;
        }

        let dummy = this.#head;
        while (dummy.next) {
            dummy = dummy.next;
        }

        dummy.next = node;
        this.#tail = node;
        ++this.#size;
    }

    /**
     * Createss a new Node and prepends it to the start of the Linked List.
     * If no head Node exists, then the prepended Node becomes the head.
     * @param {any} value - The value assigned to the new Node.
     */
    prepend(value = null) {
        const node = new Node(value);
        if (!this.#head) {
            this.#head = node;
            ++this.#size;
            return;
        }

        let temp = this.#head;
        this.#head = node;
        this.#head.next = temp;
        ++this.#size;
    }

    at(index) {
        if (!Number.isInteger(index)) throw new TypeError('Index must be a positive integer value.');
        if (index < 0) throw new RangeError('Index must be a positive integer value.');

        if (index > (this.#size - 1)) return undefined;

        /**
         * If index = 0, then the while loop is never executed and the head is simply returned.
         * The loop will actually terminate when i = index - 1 because of how the list is iterated.
         * The current node after each loop execution is i + 1.
         */
        let dummy = this.#head;
        let i = 0;
        while (dummy.next && i < index) {
            dummy = dummy.next;
            ++i;
        }
        return dummy.value;
    }
}