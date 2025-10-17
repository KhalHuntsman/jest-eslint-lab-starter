// Import the functions we want to test from index.js
const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

// Group of tests for the capitalizeWords function
describe('capitalizeWords', () => {
  // Test normal sentences with multiple words
  test('capitalizes each word in a normal sentence', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World'); // Check that both words are capitalized
    expect(capitalizeWords('this is a test')).toBe('This Is A Test'); // Another normal sentence
  });

  // Test edge cases for unusual inputs
  test('handles edge cases', () => {
    expect(capitalizeWords('')).toBe(''); // Empty string should return empty
    expect(capitalizeWords('hello-world')).toBe('Hello-World'); // Words with special characters
    expect(capitalizeWords('javascript')).toBe('Javascript'); // Single-word input
  });
});

// Group of tests for the filterActiveUsers function
describe('filterActiveUsers', () => {
  // Test a mix of active and inactive users
  test('filters an array with mixed active/inactive users', () => {
    const users = [
      { username: 'alice', isActive: true },
      { username: 'bob', isActive: false },
      { username: 'charlie', isActive: true }
    ];
    expect(filterActiveUsers(users)).toEqual([
      { username: 'alice', isActive: true },
      { username: 'charlie', isActive: true }
    ]); // Only active users remain
  });

  // Test when all users are inactive
  test('returns empty array if all users are inactive', () => {
    const users = [
      { username: 'bob', isActive: false },
      { username: 'eve', isActive: false }
    ];
    expect(filterActiveUsers(users)).toEqual([]); // Should return empty array
  });

  // Test empty input array
  test('returns empty array if input is empty', () => {
    expect(filterActiveUsers([])).toEqual([]); // Should return empty array
  });
});

// Group of tests for the logAction function
describe('logAction', () => {
  // Test valid inputs with username and action
  test('generates correct log string for valid inputs', () => {
    const username = 'alice';
    const action = 'login';
    const log = logAction(action, username);
    expect(log).toMatch(new RegExp(`User ${username} performed ${action} at .*`)); 
    // Regex used because timestamp changes each time
  });

  // Test edge cases: missing or empty inputs
  test('handles missing or empty inputs', () => {
    const log1 = logAction('login', '');
    expect(log1).toMatch(/User  performed login at .*/); // Empty username

    const log2 = logAction('', 'bob');
    expect(log2).toMatch(/User bob performed  at .*/); // Empty action

    const log3 = logAction('', '');
    expect(log3).toMatch(/User  performed  at .*/); // Both empty
  });
});
