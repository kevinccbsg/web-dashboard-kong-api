
const SAVE_ROLES = 'SAVE_ROLES';
const saveRoles = (roles, user) => (
  {
    type: SAVE_ROLES,
    payload: {
      roles,
      user,
    },
  }
);

export {
  SAVE_ROLES,
  saveRoles,
};
