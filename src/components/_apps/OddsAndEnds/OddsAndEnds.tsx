/*
 * LoveLink.tsx
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space, 
 */


import { App, AppProps } from ".."  
import icon from "../../../assets/GIFS/eeprom.gif";
import { Permission } from "../../../features/userSlice";
const OddsAndEndsApp: React.FC<AppProps> = () => {
  return (
    <div>
      Odds &amp; Ends
    </div>
  )
}

export default {
  icon: icon,
  title: "Odds & Ends",
  name: 'OddsAndEnds',
  component: OddsAndEndsApp,
  permissions: Permission.OP
} as App;