import * as BuilderActions from 'actions/builder';

import { colors } from 'utils/constants';


const initialState = {
  mode: 'build',
  color: colors[0],
};


export default function builder(state=initialState, action) {
  switch (action.type) {
    case BuilderActions.SET_MODE: {
      const { mode } = action.payload;
      return {
        ...state,
        mode,
      };
    }
    case BuilderActions.SET_COLOR: {
      const { color } = action.payload;
      return {
        ...state,
        color,
      };
    }
    default: {
      return state;
    }
  }
}
