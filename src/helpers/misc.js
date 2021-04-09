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

module.exports = {getReleaseName};
