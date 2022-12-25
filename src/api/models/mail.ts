/*
 * mail.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

import supabase from "../supabase";

/**
 * Gets a single piece of mail by its id. 
 * 
 * @param mailid 
 * @returns 
 */
export const getMail = async (mailid: string) => {
  const { data: mail, error } = await supabase.from('mail').select('*,sender(*),recipient(*)').eq('id', mailid);
  if (error) throw error;
  return mail[0];
}

export const listReceivedMail = async (selfid: string) => {
  const { data: mail, error } = await supabase.from('mail').select(`*,sender(*)`).eq('recipient', selfid);
  if (error) throw error;
  return mail;
}

export const listSentMail = async (selfid: string) => {
  const { data: mail, error } = await supabase.from('mail').select(`*,recipient(*)`).eq('sender', selfid);
  if (error) throw error;
  return mail;
}

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const mailKeys = {
  all: ['mail'] as const,
  lists: () => [...mailKeys.all, 'list'] as const,
  list: (params: any) => [...mailKeys.lists(), params] as const,
  gets: () => [...mailKeys.all, 'get'] as const,
  get: (id: string) => [...mailKeys.gets(), id] as const
}