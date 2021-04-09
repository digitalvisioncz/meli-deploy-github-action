const {tmpdir} = require('os');
const {join} = require('path');
const {createReadStream} = require('fs');
const {v4: uuid} = require('uuid');
const FormData = require('form-data');
const core = require('@actions/core');
const api = require('../helpers/api');
const archiveBuild = require('../helpers/archive');

const release = async ({
    branchName,
    meliSiteId,
    meliSiteRelease,
}) => {
    const buildFolder = core.getInput('buildFolder');
    const archivePath = join(tmpdir(), `site-${branchName}-${uuid()}.tar.gz`);
    const form = new FormData();

    core.info('Packing build folder to .tar.gz archive');

    try {
        await archiveBuild({buildFolder, archivePath});
    } catch (err) {
        core.setFailed(`Action failed with error when archive build folder ${err}`);
    }

    form.append('file', createReadStream(archivePath));
    form.append('release', meliSiteRelease);
    form.append('branches', branchName);

    core.info('Uploading release to Meli');

    try {
        const {urls} = await api.post(`/sites/${meliSiteId}/releases`, form, form.getHeaders());
        const [deployUrl] = urls;

        core.info(`\u001b[32;1mDeployed at ${deployUrl} 🎉`);
        core.setOutput('meliDeployUrl', deployUrl);
    } catch (err) {
        core.setFailed(`Action failed with error\n ${err}`);
    }
};

module.exports = release;
