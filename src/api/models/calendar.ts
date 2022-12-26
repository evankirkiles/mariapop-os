/*
 * calendar.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import createKeyFactory from "../../util/createKeyFactory";
import supabase from "../supabase";

/**
 * Gets a single calendar event by its id.
 *
 * @param mailid
 * @returns
 */
export const getCalendarEvent = async (id: string): Promise<CalendarEvent> => {
  const { data: event, error } = await supabase
    .from("calendar_events")
    .select("*,creator(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return event;
};

export const listCalendarEvents = async (
  p_month: number,
  p_year: number
): Promise<CalendarEvent[]> => {
  const { data: events, error } = await supabase.rpc("get_calendar_events", {
    p_month,
    p_year,
  });
  if (error) throw error;
  return events as CalendarEvent[];
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const calendarKeys = {
  ...createKeyFactory("calendar_events")
};
