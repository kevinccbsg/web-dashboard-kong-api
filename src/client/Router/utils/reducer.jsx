import { SAVE_ROLES } from './actions';

const initialState = {
  visibility: [],
  user: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SAVE_ROLES: {
      return { ...state, visibility: action.payload.roles, user: action.payload.user };
    }
    default:
      return { ...state };
  }
};

export default reducer;
