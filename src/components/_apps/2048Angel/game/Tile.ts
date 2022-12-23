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

  previousPosition: Pos | null;
  mergedFrom: Tile[] | null;

  
  constructor(pos: Pos, value: number) {
    this.pos = pos;
    this.value = value || 2;
    this.previousPosition = null;
    this.mergedFrom = null;
  }

  savePosition() {
    this.previousPosition = { ...this.pos };
  }

  updatePosition(newPos: Pos) {
    this.pos = {...newPos};
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