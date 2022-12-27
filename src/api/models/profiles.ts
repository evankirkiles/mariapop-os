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

/**
 * Lists the profiles in the database.
 * @returns 
 */
export const listProfiles = async (search?: string) => {
  let resp;
  if (search) {
    resp = await supabase.rpc("search_profiles", { p_search_term: search }).select('*');
  } else {
    resp = await supabase.from('profiles').select('*');
  }
  const { data: profiles, error } = resp;
  if (error) throw error;
  return profiles;
}

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const profileKeys = {
  ...createKeyFactory("profile"),
  getSelf: () => [...profileKeys.gets(), 'self'] as const
}