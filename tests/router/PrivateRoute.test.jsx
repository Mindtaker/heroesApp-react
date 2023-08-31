import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { PrivateRoute } from '../../src/router/PrivateRoute';
import { AuthContext } from '../../src/auth';

describe('PrivateRoute tests', () => {
  test('should show the children if the user is authenticated', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      isLoggedIn: true,
      user: {
        id: 'ABC123',
        name: 'John Doe',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Private Route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=batman'
    );
  });

  test('should navigate to /login if the user is not authenticated', () => {
    const contextValue = {
      isLoggedIn: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/dc']}>
          <Routes>
            <Route path="login" element={<h1>login</h1>} />
            <Route
              path="dc"
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('login')).toBeTruthy();
  });
});
