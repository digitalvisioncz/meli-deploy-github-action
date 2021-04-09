const core = require('@actions/core');
const {actionTypes} = require('./configs');
const {runAction} = require('./actions');
const getConfig = require('./helpers/config');

const config = getConfig();
const {meliAction} = config;

if (!actionTypes.includes(meliAction)) {
    core.setFailed(`Unknown Meli action: ${meliAction}`);

    process.exit();
}

core.info(`\u001b[1m\u001b[33;1mStarting Meli action: ${meliAction}`);

runAction({meliAction, config});
