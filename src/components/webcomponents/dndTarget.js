import DndClass from './dndClass';


class DndTarget extends DndClass {
      
  connectedCallback() {
    if (!this.initd) {
      this.generateId();
      this.classList.add("dnd-target");
      this.area = this.getParent();
      this.token = this.getParent('DND-TOKEN');
      this.area.track(this);
      this.initd = true;
    }

    this.area.addEventListener('hoveringupdate', (e) => {
      const { token, hovering } = e.detail;
      const result = hovering.find((result) => { return result.target.id === this.id });
      if (result && result.overlap ) {
        this.classList.add(`dnd-target-hovered`);
        this.classList.add(`dnd-target-hoveredby-${token.id}`);
      }else{
        this.classList.remove('dnd-target-hovered');
        this.classList.remove(`dnd-target-hoveredby-${token.id}`);
      }
    });
  }

  constructor() {
    super();
    this.initd = false;
  }
}

export default DndTarget;
