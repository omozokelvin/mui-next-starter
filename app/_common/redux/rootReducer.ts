import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import dropDownSlice from './slices/dropDownSlice';
import settingsSlice from './slices/settingsSlice';
import { storage } from './storage';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  dropDownSlice,
  settingsSlice: persistReducer(settingsPersistConfig, settingsSlice),
});

export { rootPersistConfig, rootReducer };
