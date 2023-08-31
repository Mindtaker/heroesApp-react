import { authReducer, types } from '../../../src/auth';

describe('authReducer tests', () => {
  const initialState = { isLoggedIn: false };

  test('should return the initial state', () => {
    const newState = authReducer(initialState, {});

    expect(newState).toBe(initialState);
  });

  test('should call the login action and set the user', () => {
    const action = {
      type: types.login,
      payload: {
        id: 'TEST123',
        name: 'Jane',
      },
    };

    const newState = authReducer(initialState, action);

    expect(newState).toEqual({
      isLoggedIn: true,
      user: action.payload,
    });
  });

  test('should call the logout action and clear the user', () => {
    const action = {
      type: types.logout,
    };

    const newState = authReducer(initialState, action);

    expect(newState).toEqual({
      isLoggedIn: false,
      user: null,
    });
  });
});
