import Vector from './vector';

export default class Mask {
  constructor(d, k) {
    const m = this.m = Array(k);

    for (let i = 0; i < k; i++) {
      m[i] = Math.random() * d | 0;
    }
  }

  project(v) {
    const m = this.m;
    const n = m.length;
    const c = Array(n);

    for (let i = 0; i < n; i++) {
      c[i] = v.get(m[i]);
    }

    return new Vector(c);
  }
}
