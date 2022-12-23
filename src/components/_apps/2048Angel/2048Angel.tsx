/*
 * Explorer.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import { App, AppProps } from "..";
import { Permission } from "../../../features/userSlice";
import floppy from "../../../assets/ICONS/pxArt.png";
import Game2048 from "./2048Game";
import s from "./2048Game.module.scss";

const AngelGame: React.FC<AppProps> = () => {
  return <div className={s.container}>
    <Game2048 size={4} />
  </div>;
};

export default {
  icon: floppy,
  title: "2048 Angel",
  name: "2048angel",
  notResizable: true,
  component: AngelGame,
  permissions: Permission.BASIC,
} as App;
