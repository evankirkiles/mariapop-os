/*
 * DesktopIcon.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space, 
 */
import s from "./DesktopIcon.module.scss";
import BEE from "../../assets/ICONS/TRASH.png";
import { App } from "../_apps";
import { useAppDispatch } from "../../app/hooks";
import { openApp } from "../../features/appSlice";

type DesktopIconProps = {
  app: App;
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const dispatch = useAppDispatch();
  return (
    <div className={s.container} onClick={() => {
      dispatch(openApp(app.name));
    }}>
      <img src={app.icon} className={s.icon} />
      {app.title}
    </div>
  );
}