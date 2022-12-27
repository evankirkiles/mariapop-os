/*
 * HTMLActuator.ts
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space,
 */

import Grid from "./Grid";
import Localize from "./Localization";
import Tile, { Pos } from "./Tile";

export type HTMLElements = {
  tileContainer: HTMLDivElement;
  scoreContainer: HTMLDivElement;
  scorePoints: HTMLDivElement;
  bestContainer: HTMLDivElement;
  bestPoints: HTMLDivElement;
  messageContainer: HTMLDivElement;
};

export type CSSClasses = {
  tile: string;
  tileInner: string;
  tileSuper: string;
  tileMerged: string;
  tileNew: string;
  scoreAddition: string;
  gameWon: string;
  gameLost: string;
};

export default class HTMLActuator {
  dom: HTMLElements;
  classes: CSSClasses;
  score: number;
  points: number;
  size: number;

  constructor(dom: HTMLElements, classes: CSSClasses, size: number) {
    this.dom = dom;
    this.classes = classes;
    this.score = 0;
    this.points = 0;
    this.size = size;
  }

  actuate(
    grid: Grid,
    metadata: {
      score: number;
      points: number;
      over: boolean;
      won: boolean;
      bestScore: number;
      bestPoints: number;
      terminated: boolean;
    }
  ) {
    this.updateScore(metadata.score, metadata.points);
    this.updateBestScore(metadata.bestScore, metadata.bestPoints);
    if (metadata.terminated) {
      if (metadata.over) {
        this.message(false);
      } else if (metadata.won) {
        this.message(true);
      }
    }
  }

  continueGame() {
    this.clearMessage();
  }

  clearContainer(container: HTMLDivElement) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  stylePosition(element: HTMLElement, pos: Pos) {
    element.style.transform = `translate(calc(100% * ${pos.x} + ${pos.x * 5}px), calc(100% * ${pos.y} + ${pos.y * 5}px))`;
  }

  applyClasses(element: HTMLElement, classes: string[]) {
    element.setAttribute("class", classes.join(" "));
  }

  updateScore(score: number, points: number) {
    this.clearContainer(this.dom.scoreContainer);
    this.clearContainer(this.dom.scorePoints);
    const difference = score - this.score;
    this.score = score;
    const pointDifference = points - this.points;
    this.points = points;
    this.dom.scoreContainer.textContent = Localize(`p${this.score}`);
    this.dom.scorePoints.textContent = `${this.points}`;
    if (difference > 0) {
      const addition = document.createElement("div");
      addition.classList.add(this.classes.scoreAddition);
      addition.textContent = Localize(`p${this.score}`);
      this.dom.scoreContainer.appendChild(addition);
      setTimeout(() => {
        addition.remove();
      }, 1000);
    }
    if (pointDifference > 0) {
      const punti = document.createElement("div");
      punti.classList.add(this.classes.scoreAddition);
      punti.textContent = `+${pointDifference}`;
      this.dom.scorePoints.appendChild(punti);
      setTimeout(() => {
        punti.remove();
      }, 1000);
    }
  }

  updateBestScore(bestScore: number, bestPoints: number) {
    this.dom.bestContainer.textContent = Localize(`p${bestScore}`);
    this.dom.bestPoints.textContent = `${bestPoints}`;
  }

  message(won: boolean) {
    const message = Localize(won ? "game-won" : "game-over");
    this.dom.messageContainer.classList.add(
      won ? this.classes.gameWon : this.classes.gameLost
    );
    this.dom.messageContainer.getElementsByTagName("p")[0].textContent =
      message;
  }

  clearMessage() {
    this.dom.messageContainer.classList.remove(this.classes.gameWon);
    this.dom.messageContainer.classList.remove(this.classes.gameLost);
  }
}
