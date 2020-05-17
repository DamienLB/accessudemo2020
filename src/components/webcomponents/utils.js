export const centerOnTarget = (target) => ({ token }, overrides, notification) => {
  const { x, y, w, h } = target.getShape();
	const { w: tokenw } = token.getShape();

  let ydelta = 100;
  let xdelta = tokenw/2;

  if (target.type === 'cheese' && token.type === 'mouse') {
    ydelta = 310;
  }

  if (target.type === 'mouse' && token.type === 'cat') {
    ydelta = 270;
    xdelta = 200;
  }

	const newX = x + (w/2) - xdelta;
	const newY = y + (h/2) - ydelta;
	token.moveTo(newX, newY);
	overrides[notification]  = true;
};
