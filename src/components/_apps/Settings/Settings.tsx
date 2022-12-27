/*
 * 2048Angel.tsx
 * author: evan kirkiles
 * created on Thu Dec 22 2022
 * 2022 the nobot space,
 */

import { App, AppProps } from "..";
import { SketchPicker } from "react-color";
import icon from "../../../assets/GIFS/acc.gif";
import { Permission } from "../../../util/permissions";
import s from "./Settings.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Theme, selectTheme, setTheme } from "../../../features/themeSlice";

const SettingsApp: React.FC<AppProps> = () => {
  // save a reference to the general theme
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const [currTheme, setCurrTheme] = useState<Theme>({ ...theme });

  // any time the theme changes, update the entire document
  useEffect(() => {
    // Iterate through each value in theme object
    Object.entries(currTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [currTheme]);

  // manage current color + selected key
  const [currSetting, setCurrSetting] = useState<string>(Object.keys(theme)[0]);
  const [currColor, setCurrColor] = useState("#ffffff");
  const handleChange = (color: any) => {
    setCurrColor(color.hex);
  };

  const handleChangeComplete = () => {
    setCurrTheme({
      ...currTheme,
      [currSetting]: currColor,
    });
  };

  return (
    <div className={s.meta_container}>
      <div className={s.container}>
        <div className={s.config_column}>
          {Object.entries(currTheme).map(([key, value]) => (
            <div
              key={key}
              className={[
                s.config_color,
                currSetting === key ? "selected" : "",
              ].join(" ")}
              style={{ backgroundColor: value }}
              onClick={() => {
                setCurrSetting(key);
                setCurrColor(currTheme[key as keyof Theme]);
              }}
            >
              <div className={s.config_color_title}>{key}</div>
            </div>
          ))}
        </div>
        <div className={s.pick_column}>
          <SketchPicker
            color={currColor}
            onChange={handleChange}
            disableAlpha={true}
            className={s.sketch_picker}
            onChangeComplete={handleChangeComplete}
          />
          <div className={s.save_row}>
            <div className={s.save_button} onClick={() => {
              setCurrTheme({...theme});
            }}>
              RESET ALL
            </div>
            <div className={s.save_button} onClick={() => {
              dispatch(setTheme({ ... currTheme}));
            }}>
              SAVE ALL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  icon: icon,
  title: "Config",
  name: "config",
  notResizable: true,
  component: SettingsApp,
  permissions: Permission.BASIC,
} as App;
