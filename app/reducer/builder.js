import * as BuilderActions from 'actions/builder';


const initialState = {
  mode: 'build',
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
    default: {
      return state;
    }
  }
}
