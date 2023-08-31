import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router';

describe('AppRouter tests', () => {
  test('should show the login if the user is not authenticated', () => {
    const contextValue = {
      isLoggedIn: false,
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('should show MarvelPage if the user is authenticated', () => {
    const contextValue = {
      isLoggedIn: true,
      user: {
        id: '1',
        name: 'John',
      }
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Marvel Comics').length).toBeGreaterThanOrEqual(1);
  });
});
