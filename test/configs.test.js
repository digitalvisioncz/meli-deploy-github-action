const {actionTypes} = require('../src/configs');

test('Test if action types are present', () => {
    expect(actionTypes).toContain('release');
    expect(actionTypes).toContain('remove');
});
