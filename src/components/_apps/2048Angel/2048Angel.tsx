/*
 * Explorer.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space, 
 */

import { App, AppProps } from "..";
import { Permission } from "../../../features/userSlice";
import floppy from "../../../assets/ICONS/pxArt.png";
const AngelGame: React.FC<AppProps> = () => {
  return (
    <div>
      2048 Angel
    </div>
  )
}

export default {
  icon: floppy,
  title: "2048 Angel",
  name: '2048angel',
  component: AngelGame,
  permissions: Permission.BASIC
} as App;