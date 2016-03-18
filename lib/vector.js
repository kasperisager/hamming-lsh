export default function Vector(...c) {
  return c;
}

export function length(v) {
  return v.length;
}

export function merge(...v) {
  let c = [];

  for (let i = 0, n = v.length; i < n; i++) {
    c = c.concat(v[i]);
  }

  return Vector(...c);
}

export function hash(v) {
  return `@@${v}`;
}
