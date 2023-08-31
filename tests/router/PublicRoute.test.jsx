import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';

describe('PublicRoute tests', () => {
  test('should show the children if the user is not authenticated', () => {
    const contextValue = {
      isLoggedIn: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public Route')).toBeTruthy();
  });

  test('should navigate to /dc if the user is authenticated', () => {
    const contextValue = {
      isLoggedIn: true,
      user: {
        id: 'ABC123',
        name: 'John Doe',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/dc']}>
          <Routes>
            <Route path="dc" element={<h1>DC</h1>} />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('DC')).toBeTruthy();
  });
});
