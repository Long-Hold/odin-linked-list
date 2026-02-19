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

    /**
     * Iterates over the Linked List to the specified index and returns the value of the node there.
     * @param {number} index - A positive integer value that represents which node to return the value. 
     * @returns {number|undefined}  Returns the value of the node or undefined if it cannot be located.
     */
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

    /**
     * Removes the head node and returns it's value. The second node in the list becomes the new head node,
     * or head becomes null if it was the only node in the list.
     * @returns {number|undefined} Returns the value of the head node or undefined if there isn't one.
     */
    pop() {
        if (!this.#head) return undefined;

        const headValue = this.#head.value;
        this.#head = this.#head.next;
        --this.#size;

        return headValue;
    }

    /**
     * Searches the Linked List and compares each Node's value to the passed value parameter.
     * If a match is found, immediately returns true, otherwise returns false.
     * 
     * If there is no head node, returns false.
     * @param {any} value - The value to compare against each Node's value property.
     * @returns {boolean} True if list contains the value. False if not.
     */
    contains(value) {
        if (!this.#head) return false;

        let dummy = this.#head;
        while (dummy.next) {
            if (dummy.value === value) return true;
            dummy = dummy.next;
        }

        return dummy.value === value;
    }

    /**
     * Returns the index of the first node that has a matching value, or -1 if it cannot be found.
     * @param {any} value - The value of the node to find the index of.
     * @returns {number} The index of the node with the matching value, or -1 if it cannot be found.
     */
    findIndex(value) {
        if (!this.#head) return -1;

        let nodeCounter = 0;
        let dummy = this.#head;
        while (dummy) {
            if (dummy.value === value) return nodeCounter;
            dummy = dummy.next;
            ++nodeCounter;
        }

        return -1;
    }

    /**
     * Converts the Linked List node values into a string representation, in the order
     * they are linked.
     * @returns {string} A string representation of the Linked List.
     */
    toString() {
        if (!this.#head) return 'null';
        let nodeString = '';
        let dummy = this.#head;
        while (dummy) {
            nodeString += `(${dummy.value}) -> `;
            dummy = dummy.next;
        }
        nodeString += 'null';
        return nodeString;
    }

    /**
     * Inserts n number of values at the specific index.
     * The existing node at index is relinked to the end of the newly insert nodes,
     * and the node before the index is linked to the start of the new values.
     * 
     * @param {number} index - The position in the Linked List to insert the new values at.
     * @param  {...any} values - A group of values to insert.
     */
    insertAt(index, ...values) {
        if (!Number.isInteger(index)) throw TypeError('Index must be an integer.');
        if (index < 0 || index >= this.#size) throw RangeError('Index must be within range of the list size.');

        /**
         * Prepends a node to the head node.
         * 
         * With previousNode starting it's iteration at sentinel, it will stop
         * at the node before the passed index value.
         * 
         * This means previousNode.next can begin appending the new values.
         */
        const sentinel = new Node(null, this.#head);
        let previousNode = sentinel;
        for (let i = 0; i < index; ++i) {
            previousNode = previousNode.next;
        }

        /**
         * rightNode stores the node list starting at the 'index' param, which is the next
         * index from previousNode. 
         * 
         * New values will be inserted at it's position, so it needs to be stored in a temporary
         * variable.
         */
        let rightNode = previousNode.next;
        values.forEach(value => {
            previousNode.next = new Node(value);
            previousNode = previousNode.next;
            ++this.#size;
        });
        previousNode.next = rightNode;

        /**
         * In the event insertAt() receives index 0 (the head node), then it'll need to be re-assigned.
         * sentinel.next would have it's value overwritten with the new values from ...values,
         * and since sentinel is before the 'head' node, it's next value will be the new head.
         */
        this.#head = sentinel.next;
    }

    removeAt(index) {
        if (!Number.isInteger(index)) throw new TypeError('Index must be an integer.');
        if (index < 0 || index >= this.#size) throw new RangeError('Index must be within list size range.');
        let dummy = this.#head;

        if (index === 0) {
            this.pop();
            return;
        }

        if (index === this.#size - 1) {
            for (let i = 0; i < index - 1; ++i) {
                dummy = dummy.next;
            }
            dummy.next = null;
            this.#tail = dummy;
            --this.#size;
            return;
        }
    }
}
