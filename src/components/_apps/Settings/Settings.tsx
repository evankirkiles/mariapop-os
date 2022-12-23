/*
 * 2048Angel.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space, 
 */

import { App, AppProps } from ".."  
import icon from "../../../assets/GIFS/acc.gif";
import { Permission } from "../../../features/userSlice";
const SettingsApp: React.FC<AppProps> = () => {
  return (
    <div>
      Settings
    </div>
  )
}

export default {
  icon: icon,
  title: "Config",
  name: 'config',
  component: SettingsApp,
  permissions: Permission.BASIC
} as App;