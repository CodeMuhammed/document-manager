
import fetch from 'isomorphic-fetch';

const signupHandler = (data) => {
  const action = {
    type: 'SIGNUP',
    status: data.status,
  };
  switch (data.status) {
    case 'success': {
      action.response = data.response;
      return action;
    }
    case 'error': {
      action.error = data.error;
      return action;
    }
    default:
      return action;
  }
};

export default userInfo => (
  (dispatch) => {
    dispatch(signupHandler({ status: 'start' }));
    return fetch('/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    .then((response) => {
      return response.json().then((data) => {
        if (response.ok) {
          dispatch(signupHandler(
            {
              status: 'success',
              response: data,
            }
          ));
        } else {
          dispatch(signupHandler(
            {
              status: 'error',
              error: data,
            }
          ));
        }
      });
    })
    .catch((error) => {
      dispatch(signupHandler(
        {
          status: 'error',
          error,
        }
      ));
    });
  });
