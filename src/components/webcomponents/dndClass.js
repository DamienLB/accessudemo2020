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
      this.classList.forEach(classname => {
        if(regx.test(classname)) {
          this.classList.remove(classname);
        }
      });
  }

}

export default DndClass;
