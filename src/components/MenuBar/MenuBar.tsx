/*
 * MenuBar.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import s from "./MenuBar.module.scss";
import mpop from "../../assets/ICONS/mpop.png";
import clock from "../../assets/ICONS/clock.png";

export default function MenuBar() {
  return (
    <nav className={s.container}>
      <img src={mpop} alt="mpop43" className={s.logo} />
      <div>File</div>
      <div>Edit</div>
      <div>Profiler</div>
      <div style={{ flex: 1 }}></div>
      <div className={s.right_icons}>
        <div>00:00</div>
        <img src={clock} alt="clock" className={s.logo} />
      </div>
    </nav>
  );
}
