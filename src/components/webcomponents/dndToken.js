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
    this.removeClassByPrefix('dnd-token-hovering');
    if (this.target) {
      this.classList.add(`dnd-token-dropped-${this.target.type}`);
      this.classList.add(`dnd-token-dropped`);
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

  moveToTargetFunction(dir='FWD') {
    const hoveringTarget = this.hovering.reduce(this.dropTargetReducer, false);
    const targets = this.getEligibleTargets();

    const END = (dir === 'FWD' ? targets.length : 1);
    const BEGIN = (dir === 'FWD' ? 1 : targets.length);
    const INCREMENT = (dir === 'FWD' ? 1 : -1);

    if (!hoveringTarget) {
      this.returnToPivotOnEmptyTab = true;
      const unsubscribe = this.subscribe('DROPPED', () => {
        this.returnToPivotOnEmptyTab = false;
        unsubscribe();
      });
    }

    if (this.returnToPivotOnEmptyTab && hoveringTarget && parseInt(hoveringTarget.index) === END) {
      this.moveTo(this.pivotX, this.pivotY);
      return;
    }

    const findIndex = hoveringTarget && parseInt(hoveringTarget.index) !== END && parseInt(hoveringTarget.index) + INCREMENT || BEGIN;

    let dest;
    for (let i=0; i<targets.length; i++) {
      dest = targets.find(target => {
        return parseInt(target.index) === findIndex;
      });
      if (dest) {
        break;
      }
      findIndex = findIndex === END ? BEGIN : findIndex + INCREMENT;
    }

    if (dest) {
      const { x, y } = dest.getShape();
      dest.publish('MOVING_TO', { token: this });
      if (dest.overrideResponse('MOVING_TO')) return;
      this.moveTo(x, y);
    }
  }

  moveToNextTarget() {
    this.moveToTargetFunction('FWD');
  }
  moveToPrevTarget() {
    this.moveToTargetFunction('BACK');
  }

  getEligibleTargets() {
      const alltargets = this.area.getSelectedPaths('', 'DND-TARGET');
      const containedTargetIds = this.area.getSelectedPathIds(this.id, 'DND-TARGET');

      // need to account for targets not inside this token
      const applicableTargets = alltargets.filter(target => {
        return !containedTargetIds.includes(target.id);
      });
    return applicableTargets;
  }

  updateHovering() {
    if (this.selected && this.pickedup) {
      const shape = this.getShape();

      const applicableTargets = this.getEligibleTargets();
      const hovering = applicableTargets.reduce(this.hoverResultReducer(shape), []);
      this.publish('HOVERING', { hovering });
      if (this.overrideResponse('HOVERING')) return;

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
    this.area.updateIndexes();
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

    this.area.updateIndexes();
    this.focus();
  }

  drop() {
    if (this.selected) {
      this.pickedup = false;
      const target = this.hovering.reduce(this.dropTargetReducer, false);
      this.publish('DROPPING', { target });
      if (target) target.publish('DROPPING', { token: this });
      if (this.overrideResponse('DROPPING')) return;
      this.placeInside(target);
      this.publish('DROPPED');
      if (target) target.publish('DROPPED', { token: this });
    }
  }

  pickup() {
     if (this.selected) {
      this.publish('GRABBING');
      if (this.overrideResponse('GRABBING')) return;
      this.pivotTarget = this.target;
      this.pivotX = this.x;
      this.pivotY = this.y;
      this.pickedup = true;
      this.placeOutside();

      this.publish('GRABBED');
    }
  }

  select() {
    if (!this.selected) {
      this.publish('SELECTING');
      if (this.overrideResponse('SELECTING')) return;
      this.selected = true;
      this.publish('SELECTED');
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
      this.publish('MOVING_TOWARDS', { x: this.x, y: this.y, newx, newy })
      if (this.overrideResponse('MOVING_TOWARDS')) return;
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
      this.setAttribute('role', "application");
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
    this.notifs = {};
    this.overrides = {};
    this.hoverResultReducer = (shape) => (result, target) => {
      let newresult = [];
      const targetShape = target.getShape();
      const overlap = shapesOverlap(shape, targetShape);
      if (
        // there's no result and there's any overlap
        (!result.length && overlap > 0) ||
        // OR there's any overlap and the target is "above" the current result target
        // (result.length  && overlap > 0 && target.index > result.target.index) ||
        // OR there's overlap and its more than the current result target
        (result.length && overlap > 0 && overlap > result[result.length-1].overlap)
      ) {
        newresult.push({ target, overlap });
      } else {
        newresult = result.slice();
      }
      return newresult;
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
