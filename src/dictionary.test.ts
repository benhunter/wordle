import isWordInDictionary from './dictionary';

test('Word in dictionary returns true', () => {
  expect(isWordInDictionary('AWARE')).toBeTruthy();
  expect(isWordInDictionary('QQQQQ')).toBeFalsy();
});
