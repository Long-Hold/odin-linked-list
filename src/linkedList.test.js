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
});