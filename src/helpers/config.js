const core = require('@actions/core');
const github = require('@actions/github');
const {getReleaseName} = require('./misc');

/**
 * Get config from inputs and commit context
 *
 * @returns {Object}
 */
const getConfig = () => {
    const {ref, sha} = github.context;
    const meliUrl = core.getInput('meliUrl');
    const meliSiteId = core.getInput('meliSiteId');
    const meliAction = core.getInput('action');
    const branchName = core.getInput('branchName') || /[^/]*$/.exec(ref)[0];
    const meliSiteRelease = core.getInput('meliSiteRelease') || getReleaseName({branchName, commitSha: sha});

    return {
        meliUrl,
        meliSiteId,
        meliAction,
        meliSiteRelease,
        branchName,
    };
};

module.exports = getConfig;
