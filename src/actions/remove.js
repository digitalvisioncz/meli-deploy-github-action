const core = require('@actions/core');
const api = require('../helpers/api');

const remove = async ({meliSiteId, branchName}) => {
    try {
        const branches = await api.get(`/sites/${meliSiteId}/branches`);

        if (!Array.isArray(branches)) {
            core.warning('No branches found for this site.');

            return;
        }

        const {_id: branchId} = branches.find(branch => branch.name === branchName);

        if (!branchId) {
            core.warning('Branch not found! Nothing to delete.');

            return;
        }

        const {items: releases} = await api.get(`/sites/${meliSiteId}/releases`);

        if (!Array.isArray(releases)) {
            core.warning('No releases found for this site.');

            return;
        }

        const releasesToDelete = releases.filter(({branches: releaseBranches}) => releaseBranches.includes(branchId));

        core.info(`Deleting releases in branch ${branchName}`);

        releasesToDelete.map(async ({_id: releaseId}) => {
            await api.delete(`/sites/${meliSiteId}/release/${releaseId}`);
        });

        core.info(`Deleting branch ${branchName}`);

        await api.delete(`/sites/${meliSiteId}/branches/${branchId}`);
    } catch (err) {
        core.setFailed(`Action failed with error:\n ${err}`);
    }
};

module.exports = remove;
