/*
 * KeyboardManager.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

type KeyEvent = "move" | "restart" | "keepPlaying" | "crowd";
type KeyCallbackData = number;
type KeyCallback = (data?: KeyCallbackData) => void;

const MAP: {[key: string]: number} = {
  ArrowUp: 0,
  ArrowRight: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
  j: 0,
  l: 1,
  k: 2,
  h: 3,
  w: 0,
  d: 1,
  s: 2,
  a: 3
}

export type HTMLButtonElements = {
  retryButton: HTMLDivElement;
  keepGoingButton: HTMLDivElement;
  newGameButton: HTMLDivElement;
}

export default class KeyboardInputManager {
  events: { [key in KeyEvent]?: KeyCallback[] };
  boundKeyListener: (e: KeyboardEvent) => any;
  domElement: HTMLDivElement;
  buttons: HTMLButtonElements;
  listening = false;

  constructor(domElement: HTMLDivElement, buttons: HTMLButtonElements) {
    this.events = {};
    this.domElement = domElement;
    this.buttons = buttons;
    this.boundKeyListener = (e) => this.keyListener(e);
    this.listen();
  }

  on(event: KeyEvent, callback: KeyCallback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event]!.push(callback);
  }

  emit(event: KeyEvent, data?: KeyCallbackData) {
    const callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  listen() {
    this.listening = true;
    // respond to direction keys
    document.addEventListener("keydown", this.boundKeyListener, false);

    // game buttons
    this.buttons.retryButton.addEventListener("mousedown", (e) => this.restart(e), false);
    this.buttons.newGameButton.addEventListener("mousedown", (e) => this.restart(e), false);
    this.buttons.keepGoingButton.addEventListener("mousedown", (e) => this.keepPlaying(e), false);

    // respond to touch events
    let touchStartClientX: number, touchStartClientY: number;
    // touch start listener
    this.domElement.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1 || e.targetTouches.length > 1) return;
      touchStartClientX = e.touches[0].clientX;
      touchStartClientY = e.touches[0].clientY;
      e.preventDefault();
    });
    // touch move listener
    this.domElement.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
    // touch end listener
    this.domElement.addEventListener("touchend", (e) => {
      if (e.touches.length > 1 || e.targetTouches.length > 1) return;
      const touchEndClientX = e.changedTouches[0].clientX;
      const touchEndClientY = e.changedTouches[0].clientY;
      const dx = touchEndClientX - touchStartClientX;
      const absDx = Math.abs(dx);
      const dy = touchEndClientY - touchStartClientY;
      const absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) > 10) {
        this.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
      }
    });
  }

  keyListener(e: KeyboardEvent) {
    // var modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    let mapped = MAP[e.key];
    if (mapped !== undefined) {
      e.preventDefault();
      this.emit("move", mapped);
    }
  }

  clearBindings() {
    if (!this.listening) return;
    document.removeEventListener("keydown", this.boundKeyListener, false);
  }

  restart(e: MouseEvent) {
    e.preventDefault();
    this.emit("restart");
  }

  keepPlaying(e: MouseEvent) {
    e.preventDefault();
    this.emit("keepPlaying");
  }

  crowd(e: MouseEvent) {
    e.preventDefault();
    this.emit("crowd");
  }
}
