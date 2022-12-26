/*
 * useProfile.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from 'react-query';
import { getProfile, profileKeys } from "../api/models/profiles";

/**
 * Returns the profile for the current user.
 * @returns 
 */
export default function useProfile() {
  const user = useUser();
  console.log(user);
  const profile = useQuery(
    profileKeys.getSelf(),
    () => getProfile(user!.id),
    {
      enabled: !!user
    }
  )
  return profile.data;
}