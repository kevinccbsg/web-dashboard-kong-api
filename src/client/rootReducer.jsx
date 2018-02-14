import { combineReducers } from 'redux';
import intlLocale from './Intl/reducer';

const reducer = combineReducers({
  intlLocale,
});

export default reducer;
