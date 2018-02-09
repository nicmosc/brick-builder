import { combineReducers } from 'redux';

import builder from './builder';
import ui from './ui';
import scene from './scene';


export default combineReducers({
  builder,
  ui,
  scene,
});
