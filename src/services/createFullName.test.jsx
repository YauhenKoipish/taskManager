import { createFullName } from './createFullName';

test('Test User should be returnded', () => {
  const name = 'Test';
  const lastname = 'User';

  const actual = createFullName(name, lastname);

  const expected = 'Test User';
  expect(actual).toBe(expected);
});
