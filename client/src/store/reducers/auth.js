import defaultState from '../defaultState';

export default (state = defaultState.auth, action) => {
  switch (action.type) {
    case 'SIGNIN': {
      if (action.status === 'start') {
        return Object
        .assign(
          {},
          state,
          {
            signin: {
              status: action.status,
              msg: 'processing login',
            },
          });
      } else if (action.status === 'success') {
        return Object
        .assign(
          {},
          state,
          {
            signin: {
              status: action.status,
              msg: 'login successful',
              payload: action.response,
            },
          });
      }

      return Object
      .assign(
        {},
        state,
        {
          signin: {
            status: action.status,
            msg: 'Error while loggin in',
            payload: action.error,
          },
        });
    }
    case 'SIGNUP': {
      if (action.status === 'start') {
        return Object
        .assign(
          {},
          state,
          {
            signup: {
              status: action.status,
              msg: 'processing signup',
            },
          });
      } else if (action.status === 'success') {
        return Object
        .assign(
          {},
          state,
          {
            signup: {
              status: action.status,
              msg: 'signup successful',
              payload: action.response,
            },
          });
      }
      return Object
      .assign(
        {},
        state,
        {
          signup: {
            status: action.status,
            msg: 'Error while signing up',
            payload: action.error,
          },
        });
    }
    default:
      return state;
  }
};
