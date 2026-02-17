import { Node, LinkedList } from "./linkedList";

describe('Class Node', () => {
    test('creates a Node with default values', () => {
        const node = new Node();
        expect(node.value).toBeNull();
        expect(node.next).toBeNull();
    });

    test('creates a Node with custom value', () => {
        const node = new Node(1);
        expect(node.value).toBe(1);
        expect(node.next).toBeNull();
    });

    test('creates a Node with value and next reference', () => {
        const nextNode = new Node(2);
        const node = new Node(1, nextNode);
        expect(node.value).toBe(1);
        expect(node.next).toBe(nextNode);
        expect(node.next.value).toBe(2);
        expect(node.next.next).toBeNull();
    });

    test('can link new nodes after creation', () => {
        const node = new Node(1);
        const nodeTwo = new Node(2);
        node.next = nodeTwo;
        expect(node.value).toBe(1);
        expect(node.next).toBe(nodeTwo);
        expect(node.next.value).toBe(2);
    });

    test('handles chains of nodes', () => {
        const node3 = new Node(3);
        const node2 = new Node(2, node3);
        const node1 = new Node(1, node2);

        expect(node1.value).toBe(1);
        expect(node1.next.value).toBe(2);
        expect(node1.next.next.value).toBe(3);
        expect(node1.next.next.next).toBeNull();
    });

    test('handles unlinking a node', () => {
        const node3 = new Node(3);
        const node2 = new Node(2, node3);
        const node1 = new Node(1, node2);

        node2.next = null;
        expect(node1.next.next).toBeNull()
    })
});

describe('Class LinkedList', () => {
    describe('Error Throwing:', () => {
        test.each([1, 'hello, world', {}])(
            'throws TypeError when passed %s', (value) => {
                expect(() => new LinkedList(value)).toThrow(TypeError);
            }
        );
        test('does not throw an Error when constructor is empty or passed null', () => {
            expect(() => new LinkedList()).not.toThrow();
            expect(() => new LinkedList(null)).not.toThrow();
        });
    });
    describe('methods', () => {
        test('size() returns 0 when constructor is empty or passed null', () => {
            const emptyConstructor = new LinkedList();
            const nullConstructor = new LinkedList(null);
            expect(emptyConstructor.size()).toBe(0);
            expect(nullConstructor.size()).toBe(0);
        });

        describe('append() and size()', () =>  {
            test('append() creates a new head if linked list is empty', () => {
                const linkedList = new LinkedList();
                linkedList.append('hello');
                expect(linkedList.head.value).toBe('hello');
            });
            test('append() does not override the head if one exists', () => {
                const head = new Node(1);
                const linkedList = new LinkedList(head);
                linkedList.append(2);
                expect(linkedList.head.value).toBe(1);
            });
            test('append() adds many nodes to the end in sequence', () => {
                const linkedList = new LinkedList();
                linkedList.append();
                linkedList.append(2);
                linkedList.append();

                expect(linkedList.head.value).toBeNull();
                expect(linkedList.head.next.value).toBe(2);
                expect(linkedList.head.next.next.value).toBeNull();
            });
            test('append() increments #size', () => {
                const linkedList = new LinkedList();
                expect(linkedList.size()).toBe(0);

                linkedList.append(1);
                linkedList.append(2);
                linkedList.append(3);
                expect(linkedList.size()).toBe(3);

                const node = new Node();
                const headList = new LinkedList(node);
                expect(headList.size()).toBe(1);
            })
        });

        describe('tail()', () => {
            test('return null on an empty list', () => {
                const linkedList = new LinkedList();
                expect(linkedList.tail()).toBeNull();
            });
            test('returns the head node if it only exists', ()=> {
                const node = new Node();
                const linkedList = new LinkedList(node);
                expect(linkedList.tail()).toBe(linkedList.head);

                const appendedList = new LinkedList();
                appendedList.append('test');
                expect(appendedList.tail()).toBe(appendedList.head);
            });
            test('returns the tail node of the list', () => {
                const linkedList = new LinkedList();
                linkedList.append(1);
                linkedList.append(2);
                linkedList.append(3);
                expect(linkedList.tail()).toBe(linkedList.head.next.next);

                const head = new Node();
                const headedList = new LinkedList(head);
                headedList.append(2);
                headedList.append(3);
                expect(headedList.tail()).toBe(headedList.head.next.next);
            });
        });
    });
});