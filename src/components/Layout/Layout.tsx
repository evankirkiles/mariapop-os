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

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={s.container}>
      <MenuBar />
      <div className={s.contents}>
        <GridBackground />
        <div className={s.desktop}>
          <div className={s.copyleft}>
            <img src={mpop} alt="mpop" className={s.mpop} />
            MariapopOS v4.3
            <br />
            Christmas 2022
            <br />
            By Evan for Maria
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
