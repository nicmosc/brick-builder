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
