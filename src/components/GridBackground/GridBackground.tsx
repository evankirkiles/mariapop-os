import React, {useEffect, useRef, useCallback } from 'react';
import s from './GridBackground.module.scss';

// constants to use in the canvas drawing
const START_HEIGHT = 200;
const LEFT_G = 0.1;
const RIGHT_G = 0.9;
const SPACES_Q = 50;
const STROKE_COLOR = '#d0d0d0';

const GridBackground: React.FC<{}> = React.memo(() => {

  // ref for accessing canvas and animation function
  const canvasRef = useRef<HTMLCanvasElement | null>();
  const ctxRef = useRef<CanvasRenderingContext2D | null>();
  const ticking = useRef<boolean>(false);
  const setRef = useCallback((node: HTMLCanvasElement) => {
    canvasRef.current = node;
    ctxRef.current = node?.getContext('2d');
  }, []);

  // animation loop. takes in the last known scroll position
  const animationLoop = (st: number) => {
    // 0. skip animation frame if canvas ref or ctx ref not set
    if (!canvasRef.current || !ctxRef.current) return;

    // 0. init variables
    let wCanv = window.innerWidth;
    let hCanv = window.innerHeight;
    let g_canvas = canvasRef.current;
    let g_ctx = ctxRef.current;

    // 1. clear the canvas grid
    g_ctx.clearRect(0, 0, wCanv, hCanv);

    // 2. set the canvas width and height
    g_canvas.width = wCanv;
    g_canvas.height = hCanv;

    // 3. draw the grid sides
    g_ctx.lineWidth = 0.3;
    g_ctx.beginPath();
    let speed = hCanv / 8500;
    let speedup = hCanv / 5000;
    // left side
    for (let i = -SPACES_Q; i < hCanv * 2; i += SPACES_Q) {
      g_ctx.moveTo(wCanv * LEFT_G, START_HEIGHT + i - st * speed);
      g_ctx.lineTo(0, START_HEIGHT + (i * 1.4) - st * speedup);
    }
    // right side
    for (let i = -SPACES_Q; i < hCanv * 2; i += SPACES_Q) {
      g_ctx.moveTo(wCanv * RIGHT_G, START_HEIGHT + i - st * speed);
      g_ctx.lineTo(wCanv, START_HEIGHT + (i * 1.4) - st * speedup);
    }
    g_ctx.strokeStyle = STROKE_COLOR;
    g_ctx.stroke();

    // 4. draw the horizontal lines
    g_ctx.beginPath();
    // horizontal lines
    for (let i = -SPACES_Q; i < hCanv * 2; i += SPACES_Q) {
      g_ctx.moveTo(wCanv * LEFT_G, START_HEIGHT + i - st * speed);
      g_ctx.lineTo(wCanv * RIGHT_G, START_HEIGHT + i - st * speed);
    }
    // vertical lines
    for (let i = -wCanv*0.25; i < wCanv * 2; i += SPACES_Q) {
      g_ctx.moveTo(i, 0);
      g_ctx.lineTo(i, hCanv);
    }
    g_ctx.strokeStyle = STROKE_COLOR;
    g_ctx.stroke();
  }

  const animationRequest = useCallback(() => {
    let lastknownScrollPosition = window.scrollY;
    if (!ticking.current) {
      requestAnimationFrame(() => {
        animationLoop(lastknownScrollPosition);
        ticking.current = false;
      })
      ticking.current = true;
    }
  }, []);

  // add scroll listeners for animation
  useEffect(() => {
    document.addEventListener('scroll', animationRequest);
    window.addEventListener('resize', animationRequest);
    animationRequest();
    return () => {
      document.removeEventListener('scroll', animationRequest);
      window.removeEventListener('resize', animationRequest);
    }
  }, [animationRequest]);

  return (
    <canvas ref={setRef} className={s.canvas} />
  );
});

export default GridBackground;