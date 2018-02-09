import * as UIActions from 'actions/ui';


const initialState = {
  utilsOpen: false,
};


export default function ui(state=initialState, action) {
  switch (action.type) {
    case UIActions.TOGGLE_UTILS: {
      return {
        ...state,
        utilsOpen: ! state.utilsOpen,
      };
    }
    default: {
      return state;
    }
  }
}
