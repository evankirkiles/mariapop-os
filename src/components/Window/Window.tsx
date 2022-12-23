/*
 * Window.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import s from "./Window.module.scss";
import { Rnd } from "react-rnd";
import { MouseEventHandler, useEffect, useRef } from "react";

type WindowProps = {
  title: string;
  resizable?: boolean;
  zIndex?: number;
  children?: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
};

export default function Window({
  title,
  resizable,
  zIndex,
  children,
  onClick,
  onClose,
}: WindowProps) {
  const ref = useRef<Rnd>(null);

  // on double click, maximize
  const doubleClickListener: MouseEventHandler = (e) => {
    if (!resizable) return;
    if (ref.current && e.detail === 2) {
      const container: HTMLDivElement = ref.current.getParent();
      const self: HTMLElement | null = ref.current.getSelfElement();
      if (!self) return;
      const { width, height } = container.getBoundingClientRect();
      const ownBounds = self.getBoundingClientRect();
      console.log(self);
      self.style.transition =
        "width 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out";
      // if already big, return to a normal size
      if (
        ownBounds &&
        width === ownBounds.width &&
        height === ownBounds.height
      ) {
        ref.current.updatePosition({
          x: (window.innerWidth - 10) * 0.1,
          y: (window.innerHeight - 300) * 0.1,
        });
        ref.current.updateSize({
          width: window.innerWidth * 0.8,
          height: window.innerHeight * 0.8,
        });
        // otherwise, maximize
      } else {
        ref.current.updatePosition({ x: 0, y: 0 });
        ref.current.updateSize({ width, height });
      }
      setTimeout(() => {
        self.style.transition = "";
      }, 300);
    }
  };

  // if not resizable, make sure to set RnD position (default doesn't work)
  useEffect(() => {
    if (!resizable && ref.current) {
      ref.current.updatePosition({
        x: (window.innerWidth - 10) * 0.1,
        y: (window.innerHeight - 300) * 0.1,
      });
    }
  }, []);

  return (
    <Rnd
      default={
        resizable
          ? {
              x: (window.innerWidth - 10) * 0.1,
              y: (window.innerHeight - 300) * 0.1,
              width: window.innerWidth * 0.8,
              height: window.innerHeight * 0.8,
            }
          : undefined
      }
      dragHandleClassName={s.title_bar}
      bounds={"parent"}
      ref={ref}
      className={s.container}
      style={{
        zIndex,
      }}
      onMouseDown={onClick}
      enableResizing={resizable}
    >
      <div className={s.title_bar} onClick={doubleClickListener}>
        <div className={s.title_bar_background}></div>
        <div className={s.close_button_container}>
          <div
            className={s.close_button}
            onClick={onClose}
            onTouchStart={onClose}
          ></div>
        </div>
        <div className={s.title}>{title}</div>
      </div>
      {children}
    </Rnd>
  );
}
