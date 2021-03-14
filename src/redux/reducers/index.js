import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import authReducer from './auth';
import chatReducer from './chat';
import contactReducer from './contact';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  chat: chatReducer,
  contact: contactReducer,
});

export default reducer;
