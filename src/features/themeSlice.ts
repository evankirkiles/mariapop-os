/*
 * themeSlice.ts
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space, 
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export interface Theme {
  "background-color": string;
  "background-2-color": string;
  "button-color": string;
  "foreground-color": string;
  "foreground-2-color": string;
  "highlight-color": string;
}

export type ThemeState = {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: {
    "background-color": "rgb(229, 169, 223)",
    "background-2-color": "#d383d6",
    "button-color": "#e4437e",
    "foreground-color": "black",
    "foreground-2-color": "#202020",
    "highlight-color": "red",
  }
}

/* -------------------------------------------------------------------------- */
/*                               SLICE CREATION                               */
/* -------------------------------------------------------------------------- */

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // sets the theme
    setTheme: (state: ThemeState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    }
  }
})

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState): Theme => state.theme.theme;
export default themeSlice.reducer;