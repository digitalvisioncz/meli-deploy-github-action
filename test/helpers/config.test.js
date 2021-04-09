const getConfig = require('../../src/helpers/config');

let config = {
    meliUrl: 'localhost',
    meliSiteId: '123abcd',
    meliAction: 'something',
    meliSiteRelease: 'v1',
    branchName: 'test',
};

test('Test config with default branch name', () => {
    expect(getConfig()).toEqual(config);
});

test('Test config with custom branch name', () => {
    const branchName = 'custom-test';

    process.env.INPUT_BRANCHNAME = branchName;
    config = {...config, ...{branchName}};

    expect(getConfig()).toEqual(config);
});
