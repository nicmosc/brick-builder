import * as BuilderActions from 'actions/builder';

import { colors, bricks } from 'utils/constants';


const initialState = {
  mode: 'build',
  grid: true,
  color: colors[0],
  brick: bricks[0],
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
    case BuilderActions.SET_BRICK: {
      const { brick } = action.payload;
      return {
        ...state,
        brick,
      };
    }
    default: {
      return state;
    }
  }
}
