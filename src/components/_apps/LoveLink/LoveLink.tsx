/*
 * 2048Angel.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space, 
 */

import { App, AppProps } from ".."
import icon from "../../../assets/GIFS/network.gif";
import { Permission } from "../../../features/userSlice";
const LoveLinkApp: React.FC<AppProps> = () => {
  return (
    <div>
      2048 Angel
    </div>
  )
}

export default {
  icon: icon,
  title: "Love Link",
  name: 'LoveLink',
  component: LoveLinkApp,
  permissions: Permission.OP
} as App;