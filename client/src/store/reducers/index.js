import defaultState from '../defaultState';
import auth from './auth';
import roles from './roles';

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

export default {
  auth,
  user,
  documents,
  roles,
};
