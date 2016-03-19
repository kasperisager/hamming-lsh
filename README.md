# Hamming LSH

> An implementation of [LSH](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) for [Hamming space](https://en.wikipedia.org/wiki/Hamming_space)

## Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [License](#license)

## Installation

```sh
$ npm install --save hamming-lsh
```

## Usage

```js
import {Vector as V, Table as T} from 'hamming-lsh';

const t = T(4, 2, 3);

t.add(V(1, 0, 1, 1));
t.add(V(0, 1, 0, 0));
t.add(V(0, 1, 1, 0));

t.query(V(1, 0, 0, 1), 2);
// => V(1, 0, 1, 1) with high probability
```

## API

### Table

**Parameters**

-   `d` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of dimensions of vectors in the table.
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width of each vector hash.
-   `l` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of hash tables to use.

**Examples**

```javascript
const d = 4;
const k = 2;
const l = 2;
const t = Table(d, k, l);
```

#### add

Add a vector `v` to the lookup table.

**Parameters**

-   `v` **Vector** The vector to add to the lookup table.

**Examples**

```javascript
const v = Vector(1, 0, 1, 0);
t.add(v);
```

#### query

Query the lookup table for the nearest neighbour of a query vector `q` within distance `r`.

**Parameters**

-   `q` **Vector** The query vector to look up the nearest neighbour of.
-   `r` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The maximum allowed distance between the query vector and the neighbour.

**Examples**

```javascript
const q = Vector(0, 1, 0, 1);
const r = 2;
t.query(q, r);
// => Vector(...)
```

Returns **Vector** The nearest neighbouring vector if found.

#### size

Get the number of vectors in the lookup table.

**Examples**

```javascript
t.add(Vector(...));
t.size();
// => 1
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of vectors in the lookup table.

### Vector

**Parameters**

-   `cs` **...[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The components of the vector.

**Properties**

-   `value` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The binary value of the vector.
-   `length` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of components in the vector.

**Examples**

```javascript
const v = Vector(1, 0, 1);

v[0]; // => 1
v[1]; // => 0
v[2]; // => 1

v.value; // => 101
v.length; // => 3
```

## License

Copyright © 2016 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
