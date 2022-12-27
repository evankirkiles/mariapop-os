/*
 * GameManager.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import Grid, { Cell, SerializedGridState } from "./Grid";
import HTMLActuator, { CSSClasses, HTMLElements } from "./HTMLActuator";
import KeyboardInputManager, { HTMLButtonElements } from "./KeyboardInputManager";
import LocalStorageManager from "./LocalStorageManager";
import Tile, { Pos } from "./Tile";

const KCAL: { [key: number]: number } = {
  2: 200,
  4: 250,
  8: 320,
  16: 400,
  32: 500,
  64: 650,
  128: 820,
  256: 1000,
  512: 1200,
  1024: 1500,
  2048: 2000,
  4096: 3000,
  8192: 5000
};

export type SerializedGameState = {
  grid: SerializedGridState;
  score: number;
  points: number;
  over: boolean;
  won: boolean;
  keepPlaying: boolean;
};

export default class GameManager {
  size: number;
  inputManager: KeyboardInputManager;
  storageManager: LocalStorageManager;
  actuator: HTMLActuator;
  startTiles = 2;

  grid!: Grid;
  score: number = 0;
  points: number = 0;
  over = false;
  won = false;
  keepPlaying = false;

  constructor(
    size: number,
    domElement: HTMLDivElement,
    elements: HTMLElements & HTMLButtonElements,
    classes: CSSClasses
  ) {
    this.size = size;
    Tile.classes = classes;
    Tile.container = elements.tileContainer;
    this.actuator = new HTMLActuator(elements, classes, size);
    this.inputManager = new KeyboardInputManager(domElement, elements);
    this.storageManager = new LocalStorageManager();
    this.inputManager.on("move", (dir) => this.move(dir! as 0 | 1 | 2 | 3));
    this.inputManager.on("restart", () => this.restart());
    this.inputManager.on("keepPlaying", () => this.continuePlaying());
    this.setup();
  }

  /* ------------------------------- LISTENERS ------------------------------ */

  restart() {
    this.storageManager.clearGameState();
    this.actuator.continueGame(); // clear won/lost message
    this.setup();
  }

  crowd() {
    this.storageManager.clearGameState();
    this.actuator.continueGame();
    this.grid = new Grid(this.size);
    this.score = 0;
    this.points = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;
    this.actuate();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const value = Math.pow(2, i * this.size + j);
        if (value <= Math.max(...(Object.keys(KCAL) as unknown as number[])))
          this.grid.insertTile(new Tile({ x: j, y: i }, value));
      }
    }
  }

  continuePlaying() {
    this.keepPlaying = true;
    this.actuator.continueGame();
  }

  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  // Set up the game
  setup() {
    this.actuator.clearContainer(Tile.container);
    let previousState = this.storageManager.getGameState();
    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid);
      this.score = previousState.score;
      this.points = previousState.points;
      this.over = previousState.over;
      this.won = previousState.won;
      this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid = new Grid(this.size);
      this.score = 0;
      this.points = 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;
      this.addStartTiles();
    }
    this.actuate();
  }

  addStartTiles() {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  addRandomTile() {
    if (!this.grid.cellsAvailable()) return;
    const value = Math.random() < 0.9 ? 2 : 4;
    const tile = new Tile(this.grid.randomAvailableCell()!, value);
    this.grid.insertTile(tile);
  }

  actuate() {
    if (this.storageManager.getBestScore() < this.score)
      this.storageManager.setBestScore(this.score);
    if (this.storageManager.getBestPoints() < this.points)
      this.storageManager.setBestPoints(this.points);
    // clear the state when game is over
    if (this.over) {
      this.storageManager.clearGameState();
    } else {
      this.storageManager.setGameState(this.serialize());
    }

    this.actuator.actuate(this.grid, {
      score: this.score,
      points: this.points,
      over: this.over,
      won: this.won,
      bestScore: this.storageManager.getBestScore(),
      bestPoints: this.storageManager.getBestPoints(),
      terminated: this.isGameTerminated(),
    });
  }

  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      points: this.points,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying,
    };
  }

  cullTiles() {
    this.grid.eachCell((x, y, tiles) => {
      if (tiles && tiles.length === 3) {
        tiles[1].destroy();
        tiles[2].destroy();
        this.grid.cells[x][y] = [tiles[0]];
      }
    })
  }

  // moveTile(tile: Tile, cell: Pos) {
  //   this.grid.cells[tile.pos.x][tile.pos.y] = null;
  //   this.grid.cells[cell.x][cell.y] = tile;
  //   tile.updatePosition(cell);
  // }

  move(direction: 0 | 1 | 2 | 3) {
    if (this.isGameTerminated()) return;
    let cell: Pos, tiles: Cell;
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;
    // traverse the grid in the right direction and move tiles
    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        cell = { x, y};
        tiles = this.grid.cellContent(cell);
        if (tiles) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);
          if (next && next.length === 1 && next[0].value === tiles[0].value) {
            const merged = this.grid.mergeTile(tiles[0], next[0]);
            this.points += KCAL[tiles[0].value] * 2;
            if (merged.value > this.score) this.score = merged.value;
            if (merged.value === 2048) this.won = true;
            tiles[0].updatePosition(merged.pos);
            moved = true;
          } else {
            // move tile 
            this.grid.cells[tiles[0].pos.x][tiles[0].pos.y] = null;
            this.grid.cells[positions.farthest.x][positions.farthest.y] = [tiles[0]];
            tiles[0].updatePosition(positions.farthest);
            moved = true;
          }
        }
      });
    });
    // if any tile moved, destroy lingering tiles and add a new one
    if (moved) {
      // destroy tiles which have been merged
      this.cullTiles();
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.over = true;
      }
      this.actuate();
    }
  }

  getVector(direction: 0 | 1 | 2 | 3) {
    return {
      0: { x: 0, y: -1 }, // up
      1: { x: 1, y: 0 }, // right
      2: { x: 0, y: 1 }, // down
      3: { x: -1, y: 0 }, // left
    }[direction];
  }

  buildTraversals(vector: Pos) {
    const traversals: { x: number[]; y: number[] } = { x: [], y: [] };
    for (let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }
    // always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();
    return traversals;
  }

  findFarthestPosition(cell: Pos, vector: Pos) {
    let previous: Pos;
    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));
    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  tileMatchesAvailable() {
    var tile;
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        tile = this.grid.cellContent({ x: x, y: y });
        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = this.getVector(direction as 0 | 1 | 2 | 3);
            var cell = { x: x + vector.x, y: y + vector.y };
            var other = this.grid.cellContent(cell);
            if (other && other[0].value === tile[0].value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }
    return false;
  }

  positionsEqual(first: Pos, second: Pos) {
    return first.x === second.x && first.y === second.y;
  }
}
