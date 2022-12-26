/*
 * profiles.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */


import createKeyFactory from "../../util/createKeyFactory";
import supabase from "../supabase";

/**
 * Gets a single profile by its id
 * 
 * @param mailid 
 * @returns 
 */
export const getProfile = async (pid: string) => {
  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', pid).single();
  if (error) throw error;
  return profile;
}

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const profileKeys = {
  ...createKeyFactory("profile"),
  getSelf: () => [...profileKeys.gets(), 'self'] as const
}