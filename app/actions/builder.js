export const SET_MODE = 'SET_MODE';

export function setMode(mode) {
  return {
    type: SET_MODE,
    payload: {
      mode,
    },
  };
}
