import { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../auth';

const saveLastPath = (lastPath) => {
  localStorage.setItem('lastPath', lastPath);
};

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;

  useEffect(() => {
    isLoggedIn && saveLastPath(lastPath);
  }, [isLoggedIn, lastPath]);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
