import DndClass from './dndClass';


class DndArea extends DndClass {
  get keyIncrement() {
    return parseInt(this.getAttribute('keyIncrement'));
  }

  set keyIncrement(val) {
    // Reflect the value of the open property as an HTML attribute.
    this.setAttribute('keyIncrement', val);
  }

  get keyIncrementFast() {
    return parseInt(this.getAttribute('keyIncrementFast'));
  }

  set keyIncrementFast(val) {
    // Reflect the value of the open property as an HTML attribute.
    this.setAttribute('keyIncrementFast', val);
  }

  getSelectedToken() {
    return this.querySelector('dnd-token[selected]');
  }

  getPath(el, path='') {
    if (el.tagName === 'DND-AREA') {
      return path;
    }
    const thispath = `/${el.id}${path}`;
    return this.getPath(el.parentNode, thispath);
  }

  getSelectedPathIds(tokenpath, type='DND-TOKEN') {
    let results = [];
    this.trackedPaths.forEach(path => {
      const pathregex = new RegExp(`/${tokenpath}(.+)`);
      const matches = path.match(pathregex);
      if (matches) {
        const tokenregex = new RegExp(`(${type}[^\/]+)`, 'g');
        const tokenmatches = matches[0].match(tokenregex);
        if (tokenmatches) {
          const flattenedmatches = tokenmatches.map(r => r[1]);
          results = results.concat(tokenmatches);
        }
      }
    });
    // returns unique values
    return results.filter((value, index, self) => {
      return self.indexOf(value) === index
    });
  }

  getSelectedPaths(tokenpath, type='DND-TOKEN') {
    const results = this.getSelectedPathIds(tokenpath, type);
    return results.map(r => document.getElementById(r));
  }

  mvToken(tokenpath, dest=false) {
    let destprefix = '/';
    if (dest) {
      const destregex = new RegExp(`${dest}$`);
      // find the path where the dest is at the end of the string
      destprefix = `${this.trackedPaths.find(path => {
        return destregex.test(path);
      })}/`;
    }
    this.trackedPaths.forEach((path, index) => {
      // find the paths that you are moving where the path begins with the token
      const pathregex = new RegExp(`/(${tokenpath}.*)`);
      const match = path.match(pathregex);
      if (match) {
        this.trackedPaths[index] = `${destprefix}${match[0]}`;
      }
    });
  }

  track(el) {
    const path = this.getPath(el);
    this.trackedPaths.push(path);
  }

  initposition() { 
    this.classList.add("dnd-area-initstate");
    setTimeout(() => {
      this.classList.remove("dnd-area-initstate");
      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.boxSizing = 'border-box';
    }, 50);
  }

  connectedCallback() {
    if (!this.initd) {
      this.initposition();
      this.classList.add("dnd-area");
      this.generateId();
      this.mousex = false;
      this.mousey = false;
      this.keyIncrement = this.keyIncrement  || 7;
      this.keyIncrementFast = this.keyIncrementFast || 35;
      this.trackedPaths = [];
      this.initd = true;
    }
  }

  constructor() {
    super();
    this.initd = false;

    document.addEventListener('mousedown', (e) => {
      this.mousex = e.x;
      this.mousey = e.y;
    });

    document.addEventListener('touchstart', (e) => {
      this.mousex = e.touches[0].clientX;
      this.mousey = e.touches[0].clientY;
    });

    document.addEventListener('mouseup', (e) => {
      this.mousex = false;
      this.mousey = false;
    });

    document.addEventListener('mousemove', (e) => {
      const selectedToken = this.getSelectedToken();
      if (selectedToken && this.mousex && this.mousey) {
        const { x: newmousex, y: newmousey } = e;
        const deltax = newmousex - this.mousex;
        const deltay = newmousey - this.mousey;
        this.moveSelected(selectedToken, deltax, deltay);
        this.mousex = newmousex;
        this.mousey = newmousey;
      }
    });

    document.addEventListener('touchmove', (e) => {
      const selectedToken = this.getSelectedToken();
      if (selectedToken && this.mousex && this.mousey) {
        const { clientX: newmousex, clientY: newmousey } = e.touches[0];
        const deltax = newmousex - this.mousex;
        const deltay = newmousey - this.mousey;
        this.moveSelected(selectedToken, deltax, deltay);
        this.mousex = newmousex;
        this.mousey = newmousey;
      }
    });
  }
}

export default DndArea;
