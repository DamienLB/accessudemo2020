import shortid from 'shortid';


class DndClass extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  set id(val) {
    this.setAttribute('id', val);
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  get index() {
    return this.getAttribute('index');
  }

  set index(val) {
    this.setAttribute('index', val);
  }

  subscribe(notification, fnc) {
    if (!this.notifs[notification]) {
      this.notifs[notification] = [];
    }
    const index = this.notifs.length;
    this.notifs[notification].push(fnc);
    // return function to unsubscribe from notifs
    return () => {
      this.notifs[notification] = this.notifs[notification].splice(index, 1);
    }
  }

  subscribeAll(notifObject) {
    for (notification in notifObject) {
      const fnc = notifObject[notification];
      this.subscribe(notification, fnc);
    }
  }

  publish(notification, payload) {
    if (this.notifs[notification]) {
      this.overrides[notification] = false;
      this.notifs[notification].forEach(fnc => {
        fnc(payload, this.overrides, notification);
      });
    }
  }

  overrideResponse(notification) {
    return this.overrides[notification];
  }

  getParent(name='DND-AREA', el=false) {
    const useEl = el || this;
    if (useEl.tagName === name) return useEl;
    const parent = useEl.parentNode;
    return parent ? this.getParent(name, parent) : false;
  }

  getShape() {
    const bounds = this.getBoundingClientRect();
    return {
      x: (bounds.left + window.pageXOffset),
      y: (bounds.top + window.pageYOffset),
      w: bounds.width,
      h: bounds.height,
    };
  };
  
  generateId() {
    if (!this.id) {
      this.id = `${this.tagName}-${this.type || ''}-${shortid.generate()}`;
    } else {
      this.id = `${this.tagName}-${this.type || ''}-${this.id}`;
    }
  }

  moveSelected(selected, deltax, deltay) {
    const area = this.area || this;
    const selecteds = area.getSelectedPaths(selected.id);
    selecteds.forEach(token => {
        const event = new CustomEvent('movedetect', { detail: { deltax, deltay }, bubbles: true, composed: true });
        token.dispatchEvent(event);
    });
  }

  removeClassByPrefix(prefix) {
      const regx = new RegExp(`^${prefix}`);
      const classes = Array.from(this.classList.values());
      classes.forEach(classname => {
        if (regx.test(classname)) this.classList.remove(classname);
      });
  }

}

export default DndClass;
