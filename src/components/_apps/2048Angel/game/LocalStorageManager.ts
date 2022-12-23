/*
 * LocalStorageManager.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import { SerializedGameState } from "./GameManager";


export default class LocalStorageManager {
  bestScoreKey = "bestScoreCupcakes";
  bestPointsKey = "bestPointsCupcakes";
  gameStateKey = "gameStateCupcakes";

  storage: Storage;

  constructor() {
    this.storage = this.localStorageSupported()
      ? window.localStorage
      : window.localStorage;
  }

  localStorageSupported() {
    try {
      window.localStorage.setItem("test", "1");
      window.localStorage.removeItem("test");
      return true;
    } catch (error) {
      return false;
    }
  }

  getBestScore() {
    return parseInt(this.storage.getItem(this.bestScoreKey) || "0");
  }

  setBestScore(score: number) {
    return this.storage.setItem(this.bestScoreKey, score.toString());
  }

  getBestPoints() {
    return parseInt(this.storage.getItem(this.bestPointsKey) || "0");
  }

  setBestPoints(score: number) {
    return this.storage.setItem(this.bestPointsKey, score.toString());
  }

  getGameState(): SerializedGameState | null {
    const stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
  }

  setGameState(gameState: SerializedGameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  }

  clearGameState() {
    this.storage.removeItem(this.gameStateKey);
  }
}
