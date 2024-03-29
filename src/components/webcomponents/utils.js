export const centerOnTarget = (target) => ({ token }, overrides, notification) => {
  const { x, y, w, h } = target.getShape();
	const { w: tokenw } = token.getShape();
	const newX = x + (w/2) - (tokenw/2);
	const newY = y + (h/2) - 100;
	token.moveTo(newX, newY);
	overrides[notification]  = true;
};
