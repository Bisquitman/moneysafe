// Preloader
export const preload = {
  elem: document.createElement('div'),
  // content: '<div class="preload"><p class="preload__text">Загрузка...</p></div>',
  content: `
    <div class="preload">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  `,
  add() {
    main.style.display = 'flex';
    main.append(this.elem);
  },
  remove() {
    this.elem.remove();
    main.style = '';
  },
  init() {
    this.elem.className = 'preload';
    this.elem.innerHTML = this.content;
  },
};

