/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space, 
 */

import GridBackground from '../GridBackground/GridBackground';
import MenuBar from '../MenuBar/MenuBar';
import s from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={s.container}>
      <MenuBar />
      <div className={s.contents}>
        <GridBackground />
        {children}
      </div>
    </div>
  )
}