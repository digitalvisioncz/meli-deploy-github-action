const {actions} = require('../src/actions');

test('Test if action handlers are present', () => {
    const types = Object.keys(actions);

    expect(types).toContain('release');
    expect(types).toContain('remove');
});

test('Test if action handlers are functions', () => {
    const types = Object.keys(actions);

    types.map(type => expect(actions[type]).toBeInstanceOf(Function));
});
