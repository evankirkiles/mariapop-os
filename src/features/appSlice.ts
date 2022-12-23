/*
 * appSlice.ts
 * author: evan kirkiles
 * created on Mon Jul 04 2022
 * 2022 the nobot space,
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export type AppState = {
  openApps: string[];
};

const initialState: AppState = {
  openApps: [],
};

/* -------------------------------------------------------------------------- */
/*                               SLICE CREATION                               */
/* -------------------------------------------------------------------------- */

export const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    // opens an app
    openApp: (state: AppState, action: PayloadAction<string>) => {
      const indexOf = state.openApps.indexOf(action.payload);
      if (indexOf === -1) {
        state.openApps.push(action.payload);
      } else if (indexOf !== state.openApps.length - 1) {
        state.openApps.push(state.openApps.splice(indexOf, 1)[0]);
      }
    },
    // closes an app
    closeApp: (state: AppState, action: PayloadAction<string>) => {
      const indexOf = state.openApps.indexOf(action.payload);
      if (indexOf !== -1) {
        state.openApps.splice(indexOf, 1);
      }
    },
    // makes an app active, bringing it to the front of the render stack
    selectApp: (state: AppState, action: PayloadAction<string>) => {
      const indexOf = state.openApps.indexOf(action.payload);
      if (indexOf !== -1) {
        state.openApps.push(state.openApps.splice(indexOf, 1)[0]);
      }
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */

export const { openApp, closeApp, selectApp } = appSlice.actions;
export const selectApps = (state: RootState): string[] => state.apps.openApps;
export default appSlice.reducer;
