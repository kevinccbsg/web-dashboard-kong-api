import _ from 'lodash';
import store from './../../store';

const RoleAware = (WrappedComponent, roles) => {
  const { main } = store.getState();
  const { visibility } = main;
  const rolesMattched = _.intersection(roles, visibility);
  if (rolesMattched.length === 0) {
    return null;
  }
  return WrappedComponent;
};

export default RoleAware;
