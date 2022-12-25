/*
 * Window.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import s from "./Window.module.scss";
import { Rnd } from "react-rnd";
import { MouseEventHandler, useRef } from "react";
import { OpenWindow } from "../../features/appSlice";

type WindowProps = {
  title: string;
  popupURL?: string;
  resizable?: boolean;
  zIndex?: number;
  draggable?: boolean;
  children?: React.ReactNode;
  defaultPos?: OpenWindow["position"];
  onClick?: () => void;
  onClose?: () => void;
  onTransform?: (transform: NonNullable<OpenWindow["position"]>) => void;
};

export default function Window({
  title,
  popupURL,
  resizable,
  draggable = true,
  zIndex,
  children,
  onClick,
  onClose,
  onTransform,
  defaultPos,
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

  // on transform finish, submit the current state
  const transformFinishListener = () => {
    if (!ref.current || !onTransform) return;
    const { x, y } = ref.current.getDraggablePosition();
    let { width, height }: { width: string | number; height: string | number } =
      ref.current.getSelfElement()!.getBoundingClientRect();
    if (!resizable) {
      width = "auto";
      height = "auto";
    }
    onTransform({ x, y, width, height });
  };

  // maximize (pop up in own window)
  const popupListener = () => {
    if (!ref.current) return;
    let { width, height }: { width: string | number; height: string | number } =
      ref.current.getSelfElement()!.getBoundingClientRect();
    window.open(
      popupURL,
      title,
      `popup=yes,scrollbars=no,resizable=${
        resizable ? "yes" : "no"
      },location=no,toolbar=no,menubar=no,width=${width}px,height=${height + 22}px`
    );
    if (onClose) onClose();
  };

  return (
    <Rnd
      default={
        defaultPos || {
          x: (window.innerWidth - 10) * 0.1,
          y: (window.innerHeight - 300) * 0.1,
          width: resizable ? window.innerWidth * 0.8 : "auto",
          height: resizable ? window.innerHeight * 0.8 : "auto",
        }
      }
      dragHandleClassName={s.title_bar}
      bounds={"parent"}
      ref={ref}
      className={s.container}
      style={{
        zIndex,
      }}
      onDragStop={transformFinishListener}
      onResizeStop={transformFinishListener}
      onMouseDown={onClick}
      enableResizing={resizable}
      disableDragging={!draggable}
    >
      <div className={s.title_bar} onClick={doubleClickListener}>
        <div className={s.title_bar_background}></div>
        {onClose ? (
          <div className={s.close_button_container}>
            <div
              className={s.close_button}
              onClick={onClose}
              onTouchStart={onClose}
            ></div>
          </div>
        ) : null}
        <div className={s.title}>{title}</div>
        {popupURL ? (
          <div className={s.popout_button_container}>
            <div
              className={s.popout_button}
              onClick={popupListener}
              onTouchStart={popupListener}
            ></div>
          </div>
        ) : null}
      </div>
      {children}
    </Rnd>
  );
}
