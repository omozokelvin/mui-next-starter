import { ReduxError, ReduxLoading } from '@/app/_common/redux/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Role } from './../../_types/Authentication';

type InitialState = {
  loading: ReduxLoading<InitialState>;
  errors: ReduxError<InitialState>;
  miniNav: boolean;
  densePadding: boolean;
  lastRoute: string;
  roles: Role[];
};

const initialState: InitialState = {
  errors: {},
  loading: {},
  miniNav: false,
  densePadding: false,
  lastRoute: '',
  roles: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<keyof InitialState>) {
      state.loading[action.payload] = true;
    },
    endLoading(state, action: PayloadAction<keyof InitialState>) {
      state.loading[action.payload] = false;
    },
    setError(
      state,
      action: PayloadAction<{ key: keyof InitialState; error: unknown }>
    ) {
      state.loading[action.payload.key] = false;
      state.errors[action.payload.key] = action.payload.error;
    },
    toggleMiniNav(state) {
      state.miniNav = !state.miniNav;
    },
    toggleDensePadding(state) {
      state.densePadding = !state.densePadding;
    },
    setLastRoute(state, action: PayloadAction<InitialState['lastRoute']>) {
      state.lastRoute = action.payload;
    },
    setRoles(state, action: PayloadAction<InitialState['roles']>) {
      state.roles = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
