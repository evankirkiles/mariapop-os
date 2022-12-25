/*
 * Explorer.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space, 
 */

import { App, AppProps } from ".."
import { Permission } from "../../../util/permissions";
import icon from "../../../assets/GIFS/home.gif";

const Explorer: React.FC<AppProps> = () => {
  return (
    <div>
      HI
    </div>
  )
}

export default {
  icon: icon,
  title: "Home Space",
  name: 'spaceplace',
  component: Explorer,
  permissions: Permission.BASIC
} as App;