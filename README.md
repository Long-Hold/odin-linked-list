# Linked List

A JavaScript implementation of the Linked List data structure, written as part of The Odin Project curriculum. The implementation covers the core data structure alongside a comprehensive unit test suite.

## Overview

A linked list is a linear data structure where each element, called a node, holds a value and a reference to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory, which gives them different performance characteristics for insertion, deletion, and traversal.

This project implements both the `Node` and `LinkedList` classes using modern JavaScript, with private class fields to enforce encapsulation.

## Features

- Append and prepend nodes by value
- Insert one or more values at a specified index
- Remove a node at a specified index, or pop the head
- Access a node's value by index
- Search by value with `contains()` and `findIndex()`
- String representation of the list via `toString()`
- Tracked `head`, `tail`, and `size` properties, kept in sync across all operations

## Project Structure

```
src/
  linkedList.js       # Node and LinkedList class implementations
  linkedList.test.js  # Jest unit tests
  main.js             # Manual usage example
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Running Tests

```bash
npm run test
```

## API

### `Node`

| Constructor | Description |
|---|---|
| `new Node(value, next)` | Creates a node. Both parameters default to `null`. |

### `LinkedList`

| Constructor | Description |
|---|---|
| `new LinkedList(node)` | Creates a list. Accepts a `Node` instance or `null`. Throws `TypeError` for any other value. |

| Property | Description |
|---|---|
| `size` | The number of nodes in the list. |
| `head` | The first node in the list, or `null`. |
| `tail` | The last node in the list, or `null`. |

| Method | Description |
|---|---|
| `append(value)` | Creates a new node with the given value and adds it to the end of the list. |
| `prepend(value)` | Creates a new node with the given value and adds it to the front of the list. |
| `at(index)` | Returns the value of the node at the given index, or `undefined` if out of range. Throws `TypeError` for non-integers and `RangeError` for negative values. |
| `pop()` | Removes and returns the value of the head node. Returns `undefined` if the list is empty. |
| `contains(value)` | Returns `true` if any node holds the given value, otherwise `false`. |
| `findIndex(value)` | Returns the index of the first node matching the given value, or `-1` if not found. |
| `insertAt(index, ...values)` | Inserts one or more values starting at the given index. Throws `TypeError` for non-integer index and `RangeError` if the index is out of range. |
| `removeAt(index)` | Removes the node at the given index. Throws `TypeError` for non-integer index and `RangeError` if the index is out of range. |
| `toString()` | Returns a string representation of the list, e.g. `(1) -> (2) -> (3) -> null`. Returns `"null"` if the list is empty. |

## Technologies

- JavaScript (ES Modules)
- Jest for unit testing
- ESLint 9 with flat configuration
- Prettier for code formatting