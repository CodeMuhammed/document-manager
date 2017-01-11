import fetch from 'isomorphic-fetch';

const handler = (data) => {
  const action = {
    type: 'SIGNIN',
    status: data.status,
  };
  switch (data.status) {
    case 'success': {
      action.success = data.response;
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
    dispatch(handler({ status: 'start' }));

    return fetch('/users/login', {
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
          return dispatch(handler(
            {
              status: 'success',
              response: data,
            }
          ));
        }
        return dispatch(handler(
          {
            status: 'error',
            error: data,
          }
        ));
      });
    })
    .catch((error) => {
      return dispatch(handler(
        {
          status: 'error',
          error,
        }
      ));
    });
  });
