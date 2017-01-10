import defaultState from '../defaultState';
import auth from './auth';

const user = (state = defaultState.user, action) => {
  if (action.type === 'SUR') {
    return action.surname;
  }
  return state;
};

const documents = (state = defaultState.documents, action) => {
  if (action.type === 'SUR_NAM') {
    return action.surname;
  }
  return state;
};

const roles = (state = defaultState.roles, action) => {
  if (action.type === 'SUR_NAME') {
    return action.surname;
  }
  return state;
};

export default {
  auth,
  user,
  documents,
  roles,
};
