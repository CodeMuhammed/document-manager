import defaultState from '../defaultState';

export default (state = defaultState.roles, action) => {
  switch (action.type) {
    case 'GET_ROLES': {
      if (action.status === 'start') {
        return Object
        .assign(
          {},
          state,
          {
            status: 'processing',
          });
      } else if (action.status === 'success') {
        return Object
        .assign(
          {},
          state,
          {
            status: action.status,
            msg: 'Roles loaded successfully',
            payload: action.success,
          });
      }
      return Object
        .assign(
          {},
          state,
        {
          status: action.status,
          msg: 'Roles not loaded',
          payload: action.error,
        });
    }
    default:
      return state;
  }
};
