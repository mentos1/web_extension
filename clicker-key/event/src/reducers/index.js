import {combineReducers} from 'redux';

import count from './count';
import token from './token';
import user from './user';

export default combineReducers({
  count, token, user
});
