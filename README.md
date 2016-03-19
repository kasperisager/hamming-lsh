# Hamming LSH

> An implementation of [LSH](https://en.wikipedia.org/wiki/Locality-sensitive_hashing) for [Hamming distances](https://en.wikipedia.org/wiki/Hamming_distance)

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

```

## API

### Table

**Parameters**

-   `d` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `k` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `l` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

#### add

Add a vector `v` to the lookup table.

**Parameters**

-   `v` **Vector** 

#### query

Query the lookup table for the nearest neighbour of a query vector `q` within distance `r`.

**Parameters**

-   `q` **Vector** 
-   `r` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Vector** 

#### size

Get the number of vectors in the lookup table.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### Vector

**Parameters**

-   `cs` **...[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

**Properties**

-   `value` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `length` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

## License

Copyright © 2016 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
