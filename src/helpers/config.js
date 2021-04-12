const core = require('@actions/core');
const github = require('@actions/github');
const getDate = require('./date');

/**
 * Get release name from current date, branchName and commit SHA
 *
 * @param {Object} settings
 * @param {String} settings.branchName
 * @param {String} settings.commitSha
 *
 * @returns {String}
 */
const getReleaseName = ({branchName, commitSha}) => `${getDate()} | ${branchName} | ${commitSha}`;

/**
 * Ger branch name
 *
 * @returns {String}
 */
const getBranchName = () => {
    const {ref, payload} = github.context;
    const issueNumber = (payload.issue || payload.pull_request) && (payload.issue || payload.pull_request).number;
    let branchName = core.getInput('branchName') || /[^/]*$/.exec((payload && payload.ref) || ref)[0];

    if (issueNumber) {
        branchName = `pr-${issueNumber}`;
    }

    return branchName;
};

/**
 * Get config from inputs and commit context
 *
 * @returns {Object}
 */
const getConfig = () => {
    const {sha} = github.context;
    const meliUrl = core.getInput('meliUrl');
    const meliSiteId = core.getInput('meliSiteId');
    const meliAction = core.getInput('action');
    const branchName = getBranchName();
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
