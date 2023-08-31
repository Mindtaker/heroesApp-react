import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Navbar tests', () => {
  const contextValue = {
    isLoggedIn: true,
    user: {
      id: '123',
      name: 'Pepe',
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('should show the name when user is logged in', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pepe')).toBeTruthy();
  });

  test('should call logout when logout button is clicked', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(contextValue.logout).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
