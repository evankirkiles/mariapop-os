/*
 * index.ts
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import ExplorerApp from "./SpacePlace/SpacePlace";
import AngelGameApp from "./2048Angel/2048Angel";
import LoveLinkApp from "./LoveLink/LoveLink";
import SettingsApp from "./Settings/Settings";
import OddsAndEndsApp from "./OddsAndEnds/OddsAndEnds";
import { Permission } from "../../util/permissions";
import ChocoCalApp from "./ChocoCal/ChocoCal";
import MashaMail from "./MashaMail/MashaMail";
import LoginApp from "./Login/Login";

export interface AppProps {
  width: number;
}

export type App = {
  icon: string;
  name: string;
  title: string;
  popuppable?: boolean;
  description?: string;
  notClosable?: boolean;
  notResizable?: boolean;
  component: React.FC<AppProps>;
  permissions: Permission;
};
export const DESKTOP_APPS = [
  AngelGameApp,
  ChocoCalApp,
  MashaMail,
  ExplorerApp,
  LoveLinkApp,
  SettingsApp,
  OddsAndEndsApp,
];

export const APPS = [
  ...DESKTOP_APPS,
  LoginApp
];
