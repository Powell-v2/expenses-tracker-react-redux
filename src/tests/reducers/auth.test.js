import authReducer from '../../reducers/auth';

test('should set uid on login', () => {
  const action = {
    type: 'LOGIN',
    uid: 333,
  };
  const state = authReducer(undefined, action);

  expect(state.uid).toEqual(action.uid);
});

test('should wipe uid on logout', () => {
  const state = authReducer({ uid: 'shalalala' }, { type: 'LOGOUT' });

  expect(state).toEqual({});
});
