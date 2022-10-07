import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { CompaniesRTK } from 'services/rtk/companies.rtk';
import { UsersAdminRTK } from 'services/rtk/usersadmin.rtk';
import authAdminSlice from './reducers/authadmin.store';
import authCompanySlice from './reducers/authcompany.store';
import authClientSlice from './reducers/authclient.store';
import usersIntegratorSlice from './reducers/integrator/users.store';
import clientsIntegratorSlice from './reducers/integrator/clients.store';
import usersClientSlice from './reducers/client/users.store';
import ProfileClientSlice from './reducers/client/profile.store';
import ProfileAdminSlice from './reducers/admin/profile.store';
import ProfileIntegratorSlice from './reducers/integrator/profile.store';

const rootReducer = combineReducers({
  AuthAdmin: authAdminSlice,
  AuthCompany: authCompanySlice,
  AuthClient: authClientSlice,

  UsersIntegrator: usersIntegratorSlice,
  ClientsIntegrator: clientsIntegratorSlice,

  UsersClient: usersClientSlice,
  ProfileClient: ProfileClientSlice,

  ProfileAdmin: ProfileAdminSlice,

  ProfileIntegrator: ProfileIntegratorSlice,

  [CompaniesRTK.reducerPath]: CompaniesRTK.reducer,
  [UsersAdminRTK.reducerPath]: UsersAdminRTK.reducer
});

const persistConfig = {
  key: 'ROOT',
  version: 1,
  storage,
  whitelist: ['AuthAdmin', 'AuthCompany', 'AuthClient']
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }).concat(CompaniesRTK.middleware)
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
