# Hamming LSH

> An implementation of [locality-sensitive hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) for [Hamming space](https://en.wikipedia.org/wiki/Hamming_space)

[![Build Status](https://travis-ci.org/kasperisager/hamming-lsh.svg?branch=master)](https://travis-ci.org/kasperisager/hamming-lsh) [![Inline docs](http://inch-ci.org/github/kasperisager/hamming-lsh.svg?branch=master)](http://inch-ci.org/github/kasperisager/hamming-lsh)

Locality-sensitive hashing (abbreviated _LSH_) is a method often used for answering approximate nearest neighbour queries in high-dimensional data sets. This library implements a version of LSH for solving the approximate nearest neighbour problem for binary vectors in Hamming space.

## Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [License](#license)

## Installation

```console
$ npm install --save hamming-lsh
```

## Usage

```js
import {Vector as V, Table as T} from 'hamming-lsh';

const t = T(4, 2, 3);

t.add(V([1, 0, 1, 1]));
t.add(V([0, 1, 0, 0]));
t.add(V([0, 1, 1, 0]));

t.query(V([1, 0, 0, 1]));
// => V([1, 0, 1, 1]) with high probability
```

## API

### Table

Construct a lookup table for vectors of dimensionality `d` where vectors are hashed using `k`-width hash values
(random vector projections) into `l` sets of hashes.

**Parameters**

-   `d` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of dimensions of vectors in the table.
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width of each vector hash.
-   `l` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of hash sets to use.

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
const v = Vector([1, 0, 1, 0]);
t.add(v);
```

#### query

Query the lookup table for the nearest neighbour of a query vector `q`.

**Parameters**

-   `q` **Vector** The query vector to look up the nearest neighbour of.

**Examples**

```javascript
const q = Vector([0, 1, 0, 1]);
t.query(q);
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

### contains

Check if the lookup table contains a specific vector.

**Parameters**

-   `v` **Vector** The vector to check for.

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `true` if the table contains the vector, otherwise `false`.

### Vector

Construct a vector consisting of binary components where truthy values represent 1 and falsy values represent 0.

**Parameters**

-   `cs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>=** The components of the vector. (optional, default `[]`)

**Examples**

```javascript
const v = Vector([1, 0, 1]);
```

#### get

Get the component at the specified index of the vector.

**Parameters**

-   `i` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the component to get.

**Examples**

```javascript
const v = Vector([1, 0, 1, 1]);
v.get(0);
// => 1
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The component at the index if found.

#### size

Get the number of components in the vector.

**Examples**

```javascript
const v = Vector([1, 0, 0, 1]);
v.size();
// => 4
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of components in the vector.

## License

Copyright © 2016 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
