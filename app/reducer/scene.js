import * as SceneActions from 'actions/scene';


const initialState = {
  bricks: [],
};


export default function scene(state=initialState, action) {
  switch (action.type) {
    case SceneActions.ADD_BRICK: {
      const { brick } = action.payload;
      return {
        ...state,
        bricks: [ ...state.bricks, brick ],
      };
    }
    case SceneActions.REMOVE_BRICK: {
      const { id } = action.payload;
      return {
        ...state,
        bricks: state.bricks.filter((b) => b.customId !== id),
      };
    }
    case SceneActions.UPDATE_BRICK: {
      const { brick } = action.payload;
      const filteredBricks = state.bricks.filter((b) => b.customId !== brick.customId);
      return {
        ...state,
        bricks: [ ...filteredBricks, brick ],
      };
    }
    case SceneActions.RESET_SCENE: {
      return initialState;
    }
    case SceneActions.SET_SCENE: {
      const { bricks } = action.payload;
      return {
        bricks,
      };
    }
    default: {
      return state;
    }
  }
}
