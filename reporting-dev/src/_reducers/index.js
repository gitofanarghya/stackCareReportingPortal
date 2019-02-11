import { combineReducers } from 'redux';

import { user } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  user,
  alert
});

export default rootReducer;