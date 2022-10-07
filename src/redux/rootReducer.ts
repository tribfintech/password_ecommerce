import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import productReducer from './slices/product';
import companyReducer from './slices/company';
import importerReducer from './slices/importer';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  product: persistReducer(productPersistConfig, productReducer),
  importer: importerReducer
});

export { rootPersistConfig, rootReducer };
