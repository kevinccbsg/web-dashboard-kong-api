
const SET_LOCALE = 'SET_LOCALE';
const setLocale = locale => (
  {
    type: SET_LOCALE,
    payload: locale,
  }
);

export {
  SET_LOCALE,
  setLocale,
};
