import { PropTypes } from 'prop-types';
import { useContext } from 'react';

import { AuthContext } from '../auth';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? children : <Navigate to="/dc" />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
