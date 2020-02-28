const ID = 'ANNYANG_SCRIPT';

export const load = (el, onload) => {
  const elexists = document.getElementById(ID);
  if (!elexists) {
    const script = document.createElement('script');
    script.id = ID;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js';
    script.onload = onload;
    el.append(script);
  }
}