/*
 * types.ts
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space, 
 */

import { Database } from "./API";

type Tables = Database["public"]["Tables"]

export type CalendarEvent = Tables["calendar_events"]["Row"];
export type CalendarEventWithCreator = CalendarEvent & { creator: Profile }
export type Mail = Tables["mail"]["Row"];
export type MailWithSender = Mail & { sender: Profile }
export type MailInsert = Tables["mail"]["Insert"];
export type MailRecipient = Tables["mail_recipients"]["Row"];
export type MailRecipientInsert = Tables["mail_recipients"]["Insert"];
export type Profile = Tables["profiles"]["Row"]; 