/*
 * createKeyFactory.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

export default function createKeyFactory(name: string) {
  const keys = {
    all: [name] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (params: any) => [...keys.lists(), params] as const,
    gets: () => [...keys.all, 'get'] as const,
    get: (id: string) => [...keys.gets(), id] as const,
  }
  return keys;
}