/*
 * MenuBar.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import s from "./MenuBar.module.scss";
import mpop from "../../assets/ICONS/mpop.png";
import clock from "../../assets/ICONS/clock.png";
import mail from "../../assets/ICONS/mail.png";
import { useEffect, useState } from "react";

export default function MenuBar() {
  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <nav className={s.container}>
      <img src={mpop} alt="mpop43" className={s.logo} />
      <div>File</div>
      <div>Edit</div>
      <div>Help</div>
      <div style={{ flex: 1 }}></div>
      <div className={s.right_icons}>
        <img src={mail} alt="mail" className={s.icon} />
        <img src={clock} alt="clock" className={s.icon} />
        <div>{date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}:{date.getSeconds().toString().padStart(2, '0')}</div>
      </div>
    </nav>
  );
}
