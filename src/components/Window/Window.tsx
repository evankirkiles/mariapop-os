/*
 * Window.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import s from "./Window.module.scss";
import { Rnd } from "react-rnd";

type WindowProps = {
  title: string;
  zIndex?: number;
  children?: React.ReactNode;
  onClose?: () => void;
};

export default function Window({
  title,
  zIndex,
  children,
  onClose,
}: WindowProps) {
  return (
    <Rnd
      default={{
        x: (window.innerWidth - 10) * 0.1,
        y: (window.innerHeight - 300) * 0.1,
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
      }}
      dragHandleClassName={s.title_bar}
      bounds={"parent"}
      className={s.container}
      style={{
        zIndex,
      }}
    >
      <div className={s.title_bar}>
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
