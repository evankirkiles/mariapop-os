/*
 * ChocoCal.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import { useEffect, useRef, useState } from "react";
import { App, AppProps } from "..";
import icon from "../../../assets/GIFS/choco.png";
import { Permission } from "../../../features/userSlice";
import s from "./ChocoCal.module.scss";

interface MonthInformation {
  daysInMonth: number;
  monthStart: number;
}

function calculateMonthInfo(date: Date) {
  return {
    daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    monthStart: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
  };
}

const ChocoCalApp: React.FC<AppProps> = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // parse monthinfo into numbers to display in the calendar
  const current_date = new Date();
  const month_cells: React.ReactNode[] = [];
  const { monthStart, daysInMonth } = calculateMonthInfo(viewDate);
  let ind = -monthStart + 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (ind >= 1 && ind <= daysInMonth) {
        const thisInd = ind;
        const isCurrentDay =
          viewDate.getFullYear() === current_date.getFullYear() &&
          viewDate.getMonth() === current_date.getMonth() &&
          ind === current_date.getDate();
        month_cells.push(
          <div
            className={s.container_cell}
            key={ind}
            onClick={() => {
              setSelectedDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth(), thisInd)
              );
            }}
          >
            <div
              className={`${s.calendar_day} ${
                isCurrentDay ? s.calendar_day__current : ""
              }`}
            >
              {ind}
            </div>
          </div>
        );
      } else {
        month_cells.push(
          <div
            className={`${s.container_cell} ${s.container_cell__unset}`}
            key={ind}
          ></div>
        );
      }
      ind += 1;
    }
  }

  // increment or decrement the viewdate by a month
  function changeMonth(size: number) {
    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + size, 1)));
  }

  return (
    <div className={s.container}>
      <div className={s.calendar}>
        <div className={s.calendar_header}>S</div>
        <div className={s.calendar_header}>M</div>
        <div className={s.calendar_header}>T</div>
        <div className={s.calendar_header}>W</div>
        <div className={s.calendar_header}>Th</div>
        <div className={s.calendar_header}>F</div>
        <div className={s.calendar_header}>S</div>
        {month_cells}
      </div>
      <div className={s.calendar_metadata}>
        <div className={s.calendar_movement}>
          <div className={s.calendar_button} onClick={() => changeMonth(-1)}>
            {"<"}
          </div>
          {viewDate.toLocaleDateString("default", {
            year: "numeric",
            month: "short",
          })}
          <div className={s.calendar_button} onClick={() => changeMonth(1)}>
            {">"}
          </div>
        </div>
        <div className={s.selected_day}>
          {selectedDate?.toLocaleDateString()}
        </div>
      </div>
      <div className={s.calendar_day_info}>
        Click a day to view its events! {"<3"}
      </div>
    </div>
  );
};

export default {
  icon: icon,
  title: "Choco Cal",
  name: "ChocoCal",
  popuppable: true,
  component: ChocoCalApp,
  notResizable: true,
  permissions: Permission.OP,
} as App;
