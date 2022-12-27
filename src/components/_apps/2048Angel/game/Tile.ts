/*
 * Tile.ts
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space, 
 */

export type Pos = { x: number, y: number };
export type SerializedTile = { position: Pos, value: number };

export default class Tile {
  pos: Pos;
  value: number;
  element: HTMLDivElement;

  static container: HTMLDivElement;
  static classes: {
    tile: string;
    tileInner: string;
    tileSuper: string;
    tileMerged: string;
    tileNew: string;
  };
  
  constructor(pos: Pos, value: number) {
    this.pos = pos;
    this.value = value || 2;
    const wrapper = document.createElement("div");
    wrapper.classList.add(Tile.classes.tile);
    if (value > 2048) wrapper.classList.add(Tile.classes.tileSuper);
    const inner = document.createElement("div");
    inner.classList.add(Tile.classes.tileInner);
    const img = document.createElement("img");
    img.src = `img/2048/${value}.png`;
    inner.appendChild(img);
    wrapper.appendChild(inner);
    this.element = wrapper;
    this.element.style.zIndex = "1"; // just added tiles go on top
    this.element.style.transform = `translate(calc(100% * ${pos.x} + ${pos.x * 5}px), calc(100% * ${pos.y} + ${pos.y * 5}px))`;
    Tile.container.appendChild(this.element);
  }

  updatePosition(pos: Pos) {
    this.pos = {...pos};
    this.element.style.zIndex = "0"; // moving tiles operate underneath
    this.element.style.transform = `translate(calc(100% * ${pos.x} + ${pos.x * 5}px), calc(100% * ${pos.y} + ${pos.y * 5}px))`;
  }

  destroy() {
    setTimeout(() => {
      this.element.remove();
    }, 100);
  }

  serialize(): SerializedTile {
    return {
      position: {
        ...this.pos
      },
      value: this.value
    }
  }
}