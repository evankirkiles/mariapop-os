/*
 * Grid.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */
import Tile, { Pos, SerializedTile } from "./Tile";

export type Cell = Tile | null;
export type SerializedGridState = {
  size: number;
  cells: (SerializedTile | null)[][];
};

export default class Grid {
  size: number;
  cells!: Cell[][];

  constructor(size: number, previousState?: SerializedGridState) {
    this.size = size;
    this.cells = previousState
      ? this.fromState(previousState.cells)
      : this.empty();
  }

  empty() {
    const cells = [];
    for (let x = 0; x < this.size; x++) {
      const row: Cell[] = (cells[x] = []);
      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }
    return cells;
  }

  fromState(state: (SerializedTile | null)[][]) {
    const cells = [];
    for (let x = 0; x < this.size; x++) {
      const row: Cell[] = (cells[x] = []);
      for (let y = 0; y < this.size; y++) {
        const tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }
    return cells;
  }

  randomAvailableCell() {
    const cells = this.availableCells();
    if (!cells.length) return;
    return cells[Math.floor(Math.random() * cells.length)];
  }

  availableCells() {
    const cells: Pos[] = [];
    this.eachCell((x, y, cell) => {
      if (cell) return;
      cells.push({ x, y });
    });
    return cells;
  }

  cellsAvailable() {
    return !!this.availableCells().length;
  }
  cellAvailable(pos: Pos) {
    return !this.cellOccupied(pos);
  }
  cellOccupied(pos: Pos) {
    return !!this.cellContent(pos);
  }
  cellContent(pos: Pos) {
    if (!this.withinBounds(pos)) return null;
    return this.cells[pos.x][pos.y];
  }

  eachCell(callback: (x: number, y: number, c: Cell) => void) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  withinBounds(position: Pos) {
    return (
      position.x >= 0 &&
      position.x < this.size &&
      position.y >= 0 &&
      position.y < this.size
    );
  }

  insertTile(tile: Tile) {
    this.cells[tile.pos.x][tile.pos.y] = tile;
  }

  removeTile(tile: Tile) {
    this.cells[tile.pos.x][tile.pos.y] = null;
  }

  serialize(): SerializedGridState {
    const cells: (SerializedTile | null)[][] = [];
    for (let x = 0; x < this.size; x++) {
      const row: (SerializedTile | null)[] = (cells[x] = []);
      for (let y = 0; y < this.size; y++) {
        row.push(this.cells[x][y] ? this.cells[x][y]!.serialize() : null);
      }
    }
    return {
      size: this.size,
      cells: cells,
    };
  }
}
