import { combineReducers } from 'redux';

import builder from './builder';
import ui from './ui';


export default combineReducers({
  builder,
  ui,
});
