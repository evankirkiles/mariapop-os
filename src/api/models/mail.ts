/*
 * mail.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import supabase from "../supabase";
import { MailInsert, MailRecipientInsert, MailWithSender } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a single piece of mail by its id.
 *
 * @param mailid
 * @returns
 */
export const getMail = async (mailid: string) => {
  const { data: mail, error } = await supabase
    .from("mail")
    .select("*,sender:sender_id(*)")
    .eq("id", mailid);
  if (error) throw error;
  return mail[0] as MailWithSender;
};

export const listReceivedMail = async (selfid: string) => {
  const { data: mail, error } = await supabase
    .from("mail")
    .select(`*,sender:sender_id(*),mail_recipients!inner(*)`)
    .eq("mail_recipients.recipient_id", selfid)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return mail as MailWithSender[];
};

export const listSentMail = async (selfid: string) => {
  const { data: mail, error } = await supabase
    .from("mail")
    .select(`*,recipient(*)`)
    .eq("sender", selfid);
  if (error) throw error;
  return mail;
};

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a Masha Mail element
 * @param input 
 * @returns 
 */
export const createMail = async (input: MailInsert) => {
  const { data: mail, error } = await supabase.from('mail').insert(input).select().single();
  if (error) throw error;
  return mail;
}

/**
 * Creates a mail recipient, allowing users to link recipients with their emails
 * @param input 
 * @returns 
 */
export const createMailRecipient = async (input: MailRecipientInsert) => {
  const { data: mail_recipient, error } = await supabase.from('mail_recipients').insert(input).select().single();
  if (error) throw error;
  return mail_recipient;
}

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const mailKeys = {
  all: ["mail"] as const,
  lists: () => [...mailKeys.all, "list"] as const,
  list: (params: any) => [...mailKeys.lists(), params] as const,
  gets: () => [...mailKeys.all, "get"] as const,
  get: (id: string) => [...mailKeys.gets(), id] as const,
};
