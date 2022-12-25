/*
 * App.tsx
 * author: evan kirkiles
 * created on Wed Dec 21 2022
 * 2022 the nobot space,
 */
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import DesktopIcon from "../components/DesktopIcon/DesktopIcon";
import Window from "../components/Window/Window";
import s from "../styles/Desktop.module.scss";
import { useUser } from "@supabase/auth-helpers-react";
import { APPS, DESKTOP_APPS } from "../components/_apps";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { closeApp, openApp, selectApps, setAppPosition } from "../features/appSlice";

export default function Desktop() {
  const dispatch = useAppDispatch();
  const openApps = useAppSelector(selectApps);

  // if no user, keep login state open
  const user = useUser();
  useEffect(() => {
    if (!user) {
      dispatch(openApp("login"));
    } else {
      dispatch(closeApp("login"));
    }
  }, [user, dispatch]);

  return (
    <Layout>
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
            closable={!appInst.notClosable}
            popupURL={appInst.popuppable ? `/${appInst.name}` : undefined}
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
    </Layout>
  );
}
