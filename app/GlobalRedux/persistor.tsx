import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';
import currencyReducer from './slices/currencySlice';
import productsReducer from './slices/productsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
