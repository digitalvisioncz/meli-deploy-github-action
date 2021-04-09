const axios = require('axios');
const core = require('@actions/core');
const {apiConfig} = require('../configs');

const meliUrl = core.getInput('meliUrl');
const meliApiToken = core.getInput('meliApiToken');
const meliSiteToken = core.getInput('meliSiteToken');

const api = axios.create({
    baseURL: meliUrl + apiConfig.urlPrefix,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    headers: {
        [apiConfig.tokenHeader]: meliApiToken,
    },
});

/**
 * Call GET API method
 *
 * @param {String} url
 * @returns {Object} API response data
 */
const methodGet = async url => {
    const {data} = await api.get(url);

    return data;
};

/**
 * Call POST API method
 *
 * @param {String} url
 * @param {Object} body
 * @param {Object} headers
 * @returns {Object} API response data
 */
const methodPost = async (url, body, headers = {}) => {
    const {data} = await api.post(url, body, {
        headers: {
            [apiConfig.siteTokenHeader]: meliSiteToken,
            ...headers,
        },
    });

    return data;
};

/**
 * Call DELETE API method
 *
 * @param {String} url
 * @returns {Object} API response data
 */
const methodDelete = async url => {
    const {data} = await api.delete(url);

    return data;
};

module.exports = {
    api,
    delete: methodDelete,
    post: methodPost,
    get: methodGet,
};
