import { validateParams } from '../../src/utils/ValidateParams';

describe('validateParams utility', () => {
  it('handles valid params', () => {
    expect(() => {
      validateParams('valid name', 10);
    }).not.toThrow();
  });
  it('throws when limit is greater than 100', () => {
    expect(() => {
      validateParams('valid name', 101);
    }).toThrow();
  });
  it('throws when author name is greater than 100 characters', () => {
    const longString = 'Hello'.repeat(21);
    expect(() => {
      validateParams(longString, 101);
    }).toThrow();
  });
});
