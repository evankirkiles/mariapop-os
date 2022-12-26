/*
 * ChocoCal.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import { useEffect, useState } from "react";
import { App, AppProps } from "..";
import icon from "../../../assets/GIFS/doki.jpg";
import { Permission } from "../../../util/permissions";
import s from "./ChocoCal.module.scss";
import { useQuery } from "react-query";
import { calendarKeys, listCalendarEvents } from "../../../api/models/calendar";
import React from "react";

function calculateMonthInfo(date: Date) {
  return {
    daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    monthStart: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
  };
}

const ChocoCalApp: React.FC<AppProps> = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { monthStart, daysInMonth } = calculateMonthInfo(viewDate);

  // get the user's calendar events
  const { data: events } = useQuery(
    calendarKeys.list([viewDate.getMonth(), viewDate.getFullYear()]),
    () => listCalendarEvents(viewDate.getMonth(), viewDate.getFullYear())
  );
  // parse events into month day-indexed map
  const eventMap = events?.reduce<{ [key: number]: CalendarEvent[] }>(
    (acc, curr) => {
      // if repeating on every weekday, add on every matching one
      if (curr.repeat_every_weekday) {
        for (
          let i = 1 + ((curr.weekday - monthStart) % 7);
          i < daysInMonth;
          i += 7
        ) {
          if (!acc[i]) acc[i] = [];
          acc[i].push(curr);
        }
      } else if (curr.repeat_every_month) {
        if (!acc[curr.day]) acc[curr.day] = [];
        acc[curr.day].push(curr);
      }
      return acc;
    },
    {}
  );

  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  useEffect(() => {
    if (selectedDate && eventMap)
      setDayEvents(eventMap[selectedDate.getDate()] || []);
    else {
      setDayEvents([]);
    }
  }, [selectedDate]);

  // parse monthinfo into numbers to display in the calendar
  const current_date = new Date();
  const month_cells: React.ReactNode[] = [];
  let ind = -monthStart + 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      // if is a valid day of the month
      if (ind >= 1 && ind <= daysInMonth) {
        const thisInd = ind;
        // check if it is the current day
        const isCurrentDay =
          viewDate.getFullYear() === current_date.getFullYear() &&
          viewDate.getMonth() === current_date.getMonth() &&
          ind === current_date.getDate();
        // also check if it is the selected day
        const isSelectedDay =
          selectedDate &&
          viewDate.getFullYear() === selectedDate.getFullYear() &&
          viewDate.getMonth() === selectedDate.getMonth() &&
          ind === selectedDate.getDate();
        // get the corresponding events
        const events = (eventMap && eventMap[ind]) || [];
        // update styles accordingly
        month_cells.push(
          <div
            className={`${s.container_cell} ${
              isSelectedDay ? s.container_cell__selected : ""
            }`}
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
            {events.map(({ title, icon }) => (
              <img
                src={icon || ""}
                key={`${title}_${i}_${j}`}
                className={s.event_icon}
                alt={`${title}`}
              />
            ))}
          </div>
        );
        // otherwise just push the default square
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
        <div
          className={s.selected_day}
          onClick={() => {
            if (selectedDate) {
              setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
            }
          }}
        >
          {selectedDate?.toLocaleDateString("default", {
            dateStyle: "full",
          })}
        </div>
      </div>
      <div className={s.calendar_day_info}>
        {!selectedDate ? (
          "Click a day to view its events! <3"
        ) : (
          <>
            {dayEvents.map((event, i) => (
              <div className={s.event_description} key={`${event.id}_${i}`}>
                <img
                  src={event.icon || ""}
                  className={s.event_icon_lg}
                  alt={`${event.title}`}
                />
                <div className={s.event_right_col}>
                  <div className={s.event_title}>[{event.title}]</div>
                  {event.contents}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default {
  icon: icon,
  title: "Doki Cal",
  name: "DokiCal",
  popuppable: true,
  component: React.memo(ChocoCalApp),
  notResizable: true,
  permissions: Permission.OP,
} as App;
