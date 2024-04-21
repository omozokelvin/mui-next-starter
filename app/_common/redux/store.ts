import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

console.log('env in store', process.env.NODE_ENV);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { dispatch, persistor, store, useDispatch, useSelector };
