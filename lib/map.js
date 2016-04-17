/**
 * A simple hash map implementation for storing keys with custom equality definitions.
 *
 * @private
 */
export default class Map {
  /**
   * Construct a new map.
   */
  constructor() {
    this.k = [];
    this.v = [];
    this.l = 0;
  }

  /**
   * @param {{hash: Function, equals: Function}} k
   * @param {*} v
   * @return {*} The old value, if any.
   */
  set(k, v) {
    const i = this.index(k);
    const o = this.v[i];

    this.k[i] = k;
    this.v[i] = v;

    return o;
  }

  /**
   * @param {{hash: Function, equals: Function}} k
   * @param {*} [d]
   * @return {*}
   */
  get(k, d) {
    return this.v[this.index(k)] || d;
  }

  /**
   * @param {{hash: Function, equals: Function}} k
   * @return {boolean}
   */
  has(k) {
    return this.get(k) !== undefined;
  }

  /**
   * @param {{hash: Function, equals: Function}} k
   * @return {number}
   * @private
   */
  index(k) {
    let i = k.hash();
    let l;

    while ((l = this.k[i]) !== undefined) {
      if (k.equals(l)) {
        break;
      }

      i++;
    }

    return i;
  }
}
