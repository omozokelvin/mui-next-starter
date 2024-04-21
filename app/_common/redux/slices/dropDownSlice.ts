import { ReduxError, ReduxLoading } from '@/app/_common/redux/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CountryEnum } from '../../_types/DropDown';

type InitialState = {
  loading: ReduxLoading<InitialState>;
  errors: ReduxError<InitialState>;
  states: Partial<Record<CountryEnum, string[]>>;
  getStates: (country: CountryEnum) => void; // not tested, just trying this out
};

const initialState: InitialState = {
  errors: {},
  loading: {},
  states: {},
  getStates(country: CountryEnum) {
    return this.states[country];
  },
};

export const dropDownSlice = createSlice({
  name: 'dropdowns',
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
    setStates(
      state,
      action: PayloadAction<{ country: CountryEnum; states: string[] }>
    ) {
      state.states[action.payload.country] = action.payload.states;
    },
  },
});

export default dropDownSlice.reducer;
