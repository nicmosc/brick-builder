export const SET_MODE = 'SET_MODE';

export function setMode(mode) {
  return {
    type: SET_MODE,
    payload: {
      mode,
    },
  };
}


export const SET_COLOR = 'SET_COLOR';

export function setColor(color) {
  return {
    type: SET_COLOR,
    payload: {
      color,
    },
  };
}


export const TOGGLE_GRID = 'TOGGLE_GRID';

export function toggleGrid() {
  return {
    type: TOGGLE_GRID,
  };
}


export const SET_BRICK = 'SET_BRICK';

export function setBrick(brick) {
  return {
    type: SET_BRICK,
    payload: {
      brick,
    },
  };
}
