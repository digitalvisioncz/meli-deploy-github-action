const {api} = require('../../src/helpers/api');

test('Test if API token is set for requests', () => {
    expect(api.defaults.headers['X-Token']).toBe(process.env.INPUT_MELIAPITOKEN);
});

test('Test if baseURL is set', () => {
    expect(api.defaults.baseURL).toBe(`${process.env.INPUT_MELIURL}/api/v1`);
});
