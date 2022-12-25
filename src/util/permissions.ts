/*
 * permissions.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

export enum Permission {
  BASIC = 1 << 0,
  FRIEND = 1 << 1,
  OP = 1 << 2
}