/**
 * @private
 */
export default class Map {
  constructor() {
    this.k = [];
    this.v = [];

    this.l = 0;
  }

  set(k, v) {
    const i = this.index(k);
    const o = this.v[i];

    this.k[i] = k;
    this.v[i] = v;

    return o;
  }

  get(k, d) {
    return this.v[this.index(k)] || d;
  }

  has(k) {
    return this.get(k) !== undefined;
  }

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
