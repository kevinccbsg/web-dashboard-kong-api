import { combineReducers } from 'redux';
import intlLocale from './Intl/reducer';
import main from './Router/utils/reducer';

const reducer = combineReducers({
  intlLocale,
  main,
});

export default reducer;
