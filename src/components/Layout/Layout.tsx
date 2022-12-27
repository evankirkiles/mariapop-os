/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */

import GridBackground from "../GridBackground/GridBackground";
import MenuBar from "../MenuBar/MenuBar";
import s from "./Layout.module.scss";
import mpop from "../../assets/ICONS/mpop.png";
import { ModalContextProvider } from "../../hooks/useModalContext";
import { useRef } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <div className={s.container}>
      <MenuBar />
      <div className={s.contents}>
        <GridBackground />
        <ModalContextProvider nodeRef={desktopRef.current}>
          <div className={s.desktop} ref={desktopRef}>
            <div className={s.copyleft}>
              <img src={mpop} alt="mpop" className={s.mpop} />
              MariapopOS v4.3
              <br />
              Christmas 2022
              <br />
              By Evan for Maria
            </div>
            <div className={s.copyright}>
              <img src={mpop} alt="mpop" className={s.mpop} />
              MariapopOS v4.3
              <br />
              Christmas 2022
              <br />
              By Evan for Maria
            </div>
            {children}
          </div>
        </ModalContextProvider>
      </div>
    </div>
  );
}
