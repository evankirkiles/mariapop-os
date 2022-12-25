/*
 * 2048Game.tsx
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space,
 */
import { useEffect, useRef } from "react";
import s from "./2048Game.module.scss";
import GameManager from "./game/GameManager";
import React from "react";

type Game2048Props = {
  size: number;
};

export default React.memo(function Game2048({ size = 4 }: Game2048Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileContainer = useRef<HTMLDivElement>(null);
  const scoreContainer = useRef<HTMLDivElement>(null);
  const scorePoints = useRef<HTMLDivElement>(null);
  const bestContainer = useRef<HTMLDivElement>(null);
  const bestPoints = useRef<HTMLDivElement>(null);
  const messageContainer = useRef<HTMLDivElement>(null);
  const retryButton = useRef<HTMLDivElement>(null);
  const keepGoingButton = useRef<HTMLDivElement>(null);
  const newGameButton = useRef<HTMLDivElement>(null);

  const manager = useRef<GameManager | null>(null);

  useEffect(() => {
    manager.current = new GameManager(
      size,
      containerRef.current!,
      {
        tileContainer: tileContainer.current!,
        scoreContainer: scoreContainer.current!,
        scorePoints: scorePoints.current!,
        bestContainer: bestContainer.current!,
        bestPoints: bestPoints.current!,
        messageContainer: messageContainer.current!,
        retryButton: retryButton.current!,
        keepGoingButton: keepGoingButton.current!,
        newGameButton: newGameButton.current!
      },
      {
        tile: s.tile,
        tileInner: s.tile_inner,
        tileSuper: s.tile_super,
        tileMerged: s.tile_merged,
        tileNew: s.tile_new,
        scoreAddition: s.score_addition,
        gameWon: s.game_won,
        gameLost: s.game_lost,
      }
    );
    return () => {
      // remove bindings on demount
      manager.current!.inputManager.clearBindings();
    };
  }, [size]);

  return (
    <>
      <div className={s.game_container} ref={containerRef}>
        <div className={s.grid_container}>
          {new Array(size).fill(undefined).map((_, i) => (
            <div className={s.grid_row} key={`row${i}$`}>
              {new Array(size).fill(undefined).map((_, j) => (
                <div className={s.grid_cell} key={`${i}${j}`}></div>
              ))}
            </div>
          ))}
        </div>
        <div className={s.tile_container} ref={tileContainer}></div>
        <div className={s.game_message} ref={messageContainer}>
          <p>Game over!</p>
          <span className={s.keep_going} ref={keepGoingButton}>Keep going</span>
          <span className={s.retry} ref={retryButton}>Retry</span>
        </div>
      </div>
      {/* Join the angels! */}
      <div className={s.metadata}>
        <div className={s.score_container}>
          <div className={s.score_title}>SCORE</div>
          <div className={s.score} ref={scorePoints}>
            3
          </div>
        </div>
        <div className={s.score_container}>
          <div className={s.score_title}>ANGEL</div>
          <div className={s.score} ref={scoreContainer}>
            NY Tourist
          </div>
        </div>
        <div className={s.score_container}>
          <div className={s.score_title}>BEST SCORE</div>
          <div className={s.score} ref={bestPoints}>
            3
          </div>
        </div>
        <div className={s.score_container}>
          <div className={s.score_title}>BEST ANGEL</div>
          <div className={s.score} ref={bestContainer}>
            3
          </div>
        </div>
      </div>
      <div className={s.instructions}>
        <div>Join the angels!</div>
        <div className={s.restart_button} ref={newGameButton}>New game</div>
      </div>
    </>
  );
});
