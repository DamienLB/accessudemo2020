const X = 0;
const Y = 1;

class Rect {
  constructor(rect) {
    this.rect = rect;
  }

  topLeft() {
    return [this.rect.x, this.rect.y];
  }

  topRight() {
    return [(this.rect.x + this.rect.w), this.rect.y];
  }

  bottomLeft() {
    return [this.rect.x, (this.rect.y + this.rect.h)];
  }

  bottomRight() {
    return [(this.rect.x + this.rect.w), (this.rect.y + this.rect.h)];
  }

  union(rect) {
    const x1 = Math.max(this.topLeft()[X], rect.topLeft()[X]);
    const x2 = Math.min(this.topRight()[X], rect.topRight()[X]);
    const y1 = Math.max(this.topLeft()[Y], rect.topLeft()[Y]);
    const y2 = Math.min(this.bottomLeft()[Y], rect.bottomLeft()[Y]);
    if (x1 > x2 || y1 > y2) {
      return false;
    }
    return { x: x1, y: y1, w: (x2 - x1), h: (y2 - y1) };
  }
}

// shape = { x, y, w, h };
export const shapesOverlap = (shapea, shapeb) => {
  const recta = new Rect(shapea);
  const rectb = new Rect(shapeb);
  const result = recta.union(rectb);
  return (result ? (result.w * result.h) : 0);
};
