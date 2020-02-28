import DndClass from './dndClass';
import { shapesOverlap } from './geometry';
import { StandardKeyActions } from './keyboard';


class DndToken extends DndClass {

  get selected() {
    return this.hasAttribute('selected');
  }

  set selected(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('selected', true);
    } else {
      this.removeAttribute('selected');
    }
  }

  updateDroppedClass() {
    if (this.target) {
      this.classList.add(`dnd-token-dropped-${this.target.type}`);
      this.classList.add(`dnd-token-dropped`);
      this.removeClassByPrefix('dnd-token-hovering');
    }else{
      this.removeClassByPrefix('dnd-token-dropped');
    }
  }

  updateHoverClass() {
    let overlapping = false;
    this.hovering.forEach((result) => {
      this.classList.add(`dnd-token-hovering-${result.target.type}`);
    });

    if (this.hovering.length) {
      this.classList.add(`dnd-token-hovering`);
    }else{
      this.removeClassByPrefix('dnd-token-hovering');
    }
  }

  updateHovering() {
    if (this.selected) {
      const shape = this.getShape();
      const alltargets = this.area.getSelectedPaths('', 'DND-TARGET');
      const containedTargetIds = this.area.getSelectedPathIds(this.id, 'DND-TARGET');

      // need to account for targets not inside this token
      const applicableTargets = alltargets.filter(target => {
        return !containedTargetIds.includes(target.id);
      });

      const hovering = applicableTargets.reduce(this.hoverResultReducer(shape), []);
      const fn = this.notify('HOVERING', { hovering });
      if (fn) { fn(); return; }

      const event = new CustomEvent('hoveringupdate', { detail: { hovering, token: this }, bubbles: true, composed: true }, );
      this.area.dispatchEvent(event);
      this.hovering = hovering;
      this.updateHoverClass();
    }
  }

  placeInside(target) {
    if (target) {
      this.target = target;
      const node = this.target.token || this.target
      this.area.insertBefore(this, node.nextSibling);
      this.area.mvToken(this.id, target.id);
    }
    this.updateDroppedClass();
    this.focus();
  }

  placeOutside() {
    if (this.target) {
      delete this.target;
      this.updateDroppedClass();
    }
    this.area.insertBefore(this, null);
    this.area.mvToken(this.id);
    const containedTokens = this.area.getSelectedPaths(this.id);
    containedTokens.reverse().forEach(token => {
      this.area.insertBefore(token, this.nextSibling);
    });
    this.focus();
  }

  drop() {
    if (this.selected) {
      this.pickedup = false;
      const target = this.hovering.reduce(this.dropTargetReducer, false);
      let fn = this.notify('DROPPING', { target });
      if (fn) { fn(); return; }
      this.placeInside(target);
      fn = this.notify('DROPPED', { target });
      if (fn) fn();
    }
  }

  pickup() {
     if (this.selected) {
      let fn = this.notify('GRABBING');
      if (fn) { fn(); return; }

      this.pivotTarget = this.target;
      this.pivotX = this.x;
      this.pivotY = this.y;
      this.pickedup = true;
      this.placeOutside();

      fn = this.notify('GRABBED');
      if (fn) { fn(); }
    }
  }

  select() {
    if (!this.selected) {
      let fn = this.notify('SELECTING');
      if (fn) { fn(); return; }
      this.selected = true;
      fn = this.notify('SELECTED');
      if (fn) fn();
    }
  }

  unselect() {
    this.selected = false;
  }

  returnToPivot() {
    this.moveTo(this.pivotX, this.pivotY);
    if (this.pivotTarget) this.placeInside(this.pivotTarget);
  }

  moveLeft(fast=false) {
    if (fast) {
      this.moveSelected(this, -this.area.keyIncrementFast, 0);
    } else {
      this.moveSelected(this, -this.area.keyIncrement, 0);
    }
  }

  moveRight(fast=false) {
    if (fast) {
      this.moveSelected(this, this.area.keyIncrementFast, 0);
    } else {
      this.moveSelected(this, this.area.keyIncrement, 0);
    }
  }

  moveUp(fast=false) {
    if (fast) {
      this.moveSelected(this, 0, -this.area.keyIncrementFast);
    } else {
      this.moveSelected(this, 0, -this.area.keyIncrement);
    }
  }

  moveDown(fast=false) {
    if (fast) {
      this.moveSelected(this, 0, this.area.keyIncrementFast);
    } else {
      this.moveSelected(this, 0, this.area.keyIncrement);
    }
  }

  adjustForBoundary(xparam, yparam){
    const { w: objwidth, h: objheight } = this.getShape();
    const { w: conwidth, h: conheight } = this.area.getShape();
    let x = xparam;
    let y = yparam;
    if (x + objwidth >= conwidth) {
      x = conwidth - objwidth;
    }
    if (x <= 0) {
      x = 1;
    }
    if (y <= 0) {
      y = 1;
    }
    if (y + objheight >= conheight) {
      y = conheight - objheight;
    }
    return { x, y };
  }

  updateTopLeft() {
    this.style.top = `${this.y}px`;
    this.style.left = `${this.x}px`;
  }

  newPosition(xparam, yparam) {
    const { x, y } = this.adjustForBoundary(xparam, yparam);
    this.x = x;
    this.y = y;
    this.updateTopLeft();
    this.updateHovering();
  }

  moveTowards(deltax, deltay) {
    const newx = this.x + deltax;
    const newy = this.y + deltay;
    if (this.selected) {
      const fn = this.notify('MOVING_TOWARDS', { x: this.x, y: this.y, newx, newy });
      if (fn) { fn(); return; }
    }
    this.newPosition(newx, newy);
  }

  moveTo(x, y) {
    const deltax = x - this.x;
    const deltay = y - this.y;
    this.moveSelected(this, deltax, deltay);
  }

  updatePosition() {
    const { x, y } = this.getShape();
    const { x: containerx, y: containery} = this.area.getShape();
    this.x = x - containerx;
    this.y = y - containery;
    this.updateTopLeft();
  }

  initposition() { 
    this.classList.add("dnd-token-initstate");
    this.updatePosition();
    setTimeout(() => {
      this.classList.remove("dnd-token-initstate");
      this.style.display = 'inline-block';
      this.style.position = 'absolute';
    }, 20);
  }

  connectedCallback() {
    if (!this.initd) {
      this.generateId();
      this.role="application";
      this.classList.add("dnd-token");
      this.tabIndex = 0;
      this.area = this.getParent();
      this.hovering = [];
      this.initposition();
      this.area.track(this); 
      this.initd = true;
    }
  }

  constructor() {
    super();
    this.initd = false;
    this.notify = () => false;
    this.hoverResultReducer = (shape) => (result, target) => {
      const targetShape = target.getShape();
      const overlap = shapesOverlap(shape, targetShape);

      if ((!result.length && overlap > 0) ||  (overlap > 0 && overlap > result.overlap)) {
        result.push({ target, overlap });
      }
      return result;
    };
    this.dropTargetReducer = (result, object) => object.target;
    this.keyboardConfig = StandardKeyActions;

    this.addEventListener('touchstart', (e) => {
      this.select();
      this.pickup();
    });

    this.addEventListener('mousedown', (e) => {
      this.select();
      this.pickup();
    });

    this.addEventListener('mouseup', (e) => {
      this.drop();
    });

    this.addEventListener('touchend', (e) => {
      this.drop();
    });

    this.addEventListener('touchcancel', (e) => {
      this.drop();
    });

    this.addEventListener('movedetect', (e) => {
      const { deltax, deltay } = e.detail;
      this.moveTowards(deltax, deltay);
    });

    this.addEventListener('keydown', (e) => {
       this.keyboardConfig(e);
    });

    this.addEventListener('focus', (e) => {
      this.select();
    });

    this.addEventListener('blur', (e) => {
      this.unselect();
    });
  }
}

export default DndToken;
