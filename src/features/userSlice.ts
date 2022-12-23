/*
 * userSlice.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space, 
 */

export const enum Permission {
  BASIC = 1 << 0,
  FRIEND = 1 << 1,
  OP = 1 << 2
};