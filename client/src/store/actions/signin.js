import fetch from 'isomorphic-fetch';

const signinHandler = (data) => {
  const action = {
    type: 'SIGNIN',
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

export default (username, password) => (
  (dispatch) => {
    dispatch(signinHandler({ status: 'start' }));

    const payload = {
      username,
      password,
    };

    return fetch('/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      return response.json().then((data) => {
        if (response.ok) {
          dispatch(signinHandler(
            {
              status: 'success',
              response: data,
            }
          ));
        } else {
          dispatch(signinHandler(
            {
              status: 'error',
              error: data,
            }
          ));
        }
      });
    })
    .catch((error) => {
      dispatch(signinHandler(
        {
          status: 'error',
          error,
        }
      ));
    });
  });
