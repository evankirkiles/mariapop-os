/*
 * App.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import React from "react";
import Layout from "./components/Layout/Layout";
import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import Window from "./components/Window/Window";
import s from "./styles/App.module.scss";
import { APPS, DESKTOP_APPS } from "./components/_apps";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { closeApp, openApp, selectApps, setAppPosition } from "./features/appSlice";
import mpop from "./assets/ICONS/mpop.png";

function App() {
  const dispatch = useAppDispatch();
  const openApps = useAppSelector(selectApps);
  return (
    <>
      <Layout>
        <div className={s.desktop}>
          {/* <div className={s.license_box}>
            License activated
            <br />
            User: Maria Wilson Nunez
          </div> */}
          <div className={s.copyleft}>
            <img src={mpop} alt="mpop" className={s.mpop} />
            MariapopOS v4.3
            <br />
            Christmas 2022
            <br />
            By Evan for Maria
          </div>
          <div className={s.icon_container}>
            {DESKTOP_APPS.map((app) => (
              <DesktopIcon key={app.name} app={app} />
            ))}
          </div>
          {openApps.map(({ app, position }, i) => {
            const appInst = APPS.find(({ name }) => name === app)!;
            return (
              <Window
                key={app}
                zIndex={i}
                title={appInst.title}
                resizable={!appInst.notResizable}
                defaultPos={position}
                onTransform={(pos) => {
                  dispatch(setAppPosition({ app, position: pos}));
                }}
                onClose={() => dispatch(closeApp(app))}
                onClick={
                  i !== openApps.length - 1
                    ? () => dispatch(openApp(app))
                    : undefined
                }
              >
                {React.createElement(appInst.component)}
              </Window>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export default App;
