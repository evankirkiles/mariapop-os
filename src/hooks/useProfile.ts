/*
 * useProfile.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from 'react-query';
import { getProfile, profileKeys } from "../api/models/profiles";

/**
 * Returns the profile for the current user.
 * @returns 
 */
export default function useProfile() {
  const sessionContext = useSessionContext();
  const user = sessionContext.session?.user;
  const profile = useQuery(
    profileKeys.getSelf(),
    () => getProfile(user!.id),
    {
      enabled: !!user
    }
  );
  return { isLoading: sessionContext.isLoading, profile: profile.data };
}