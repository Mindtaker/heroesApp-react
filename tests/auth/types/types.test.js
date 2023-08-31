import { types } from '../../../src/auth';

describe('"types" tests', () => {
  test('should return the types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});
