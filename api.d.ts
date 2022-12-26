/*
 * api.d.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

import type { Database } from "./src/api/API";

declare global {

  type CalendarEvent = Database["public"]["Tables"]["calendar_events"]["Row"]; 
  type Mail = Database["public"]["Tables"]["mail"]["Row"]; 
  type Profile = Database["public"]["Tables"]["profiles"]["Row"]; 

}