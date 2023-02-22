import getSolutionWord from './getSolutionWord';

test('The solution is based on today\'s date', () => {
  expect(getSolutionWord()).toBe('ALERT');

  // TODO mock date
  // expect(getSolutionWord()).toBe('THING');
});

export default {};
