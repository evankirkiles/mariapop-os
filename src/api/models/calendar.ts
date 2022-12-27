/*
 * calendar.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import createKeyFactory from "../../util/createKeyFactory";
import supabase from "../supabase";
import { CalendarEvent, CalendarEventWithCreator } from "../types";

/**
 * Gets a single calendar event by its id.
 *
 * @param mailid
 * @returns
 */
export const getCalendarEvent = async (id: string): Promise<CalendarEventWithCreator> => {
  const { data: event, error } = await supabase
    .from("calendar_events")
    .select("*,creator:creator_id(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return event as CalendarEventWithCreator;
};

export const listCalendarEvents = async (
  p_month: number,
  p_year: number
): Promise<CalendarEventWithCreator[]> => {
  const { data: events, error } = await supabase.rpc("get_calendar_events", {
    p_month,
    p_year,
  }).select("*,creator:creator_id(name)");
  if (error) throw error;
  return events as CalendarEventWithCreator[];
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const calendarKeys = {
  ...createKeyFactory("calendar_events")
};
