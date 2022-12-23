/*
 * index.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import ExplorerApp from "./SpacePlace/SpacePlace";
import AngelGameApp from "./2048Angel/2048Angel";
import LoveLinkApp from "./LoveLink/LoveLink";
import { Permission } from "../../features/userSlice";


export interface AppProps {
  width: number;
}

export type App = {
  icon: string;
  name: string;
  title: string;
  description?: string;
  component: React.FC<AppProps>;
  permissions: Permission
};

export const APPS = [AngelGameApp, ExplorerApp, LoveLinkApp];
export const DESKTOP_APPS = [AngelGameApp, ExplorerApp, LoveLinkApp];
