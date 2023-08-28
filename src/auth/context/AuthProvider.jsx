import { useReducer } from 'react';
import { PropTypes } from 'prop-types';

import { AuthContext, authReducer } from './';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    isLoggedIn: !!user,
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {
    const user = {
      id: 'ABC',
      name,
    };

    const action = {
      type: types.login,
      payload: user,
    };

    localStorage.setItem('user', JSON.stringify(action.payload));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');

    const action = {
      type: types.logout,
    };

    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
