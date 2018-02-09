export const ADD_BRICK = 'ADD_BRICK';

export function addBrick(brick) {
  return {
    type: ADD_BRICK,
    payload: {
      brick,
    },
  };
}


export const REMOVE_BRICK = 'REMOVE_BRICK';

export function removeBrick(id) {
  return {
    type: REMOVE_BRICK,
    payload: {
      id,
    },
  };
}


export const UPDATE_BRICK = 'UPDATE_BRICK';

export function updateBrick(brick) {
  return {
    type: UPDATE_BRICK,
    payload: {
      brick,
    },
  };
}


export const RESET_SCENE = 'RESET_SCENE';

export function resetScene() {
  return {
    type: RESET_SCENE,
  };
}


export const SET_SCENE = 'SET_SCENE';

export function setScene(bricks) {
  return {
    type: SET_SCENE,
    payload: {
      bricks,
    },
  };
}
