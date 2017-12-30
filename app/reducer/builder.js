import * as BuilderActions from 'actions/builder';

import { colors } from 'utils/constants';


const initialState = {
  mode: 'build',
  grid: true,
  color: colors[0],
  brick: { x: 3, z: 3 },
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
    case BuilderActions.TOGGLE_GRID: {
      const { grid } = state;
      return {
        ...state,
        grid: !grid,
      };
    }
    default: {
      return state;
    }
  }
}
