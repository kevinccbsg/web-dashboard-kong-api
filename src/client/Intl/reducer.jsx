import { SET_LOCALE } from './actions';

const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en';

const initialState = {
  locale,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_LOCALE: {
      return { ...state, locale: action.payload };
    }
    default:
      return { ...state };
  }
};

export default reducer;
