const release = require('./actions/release');
const remove = require('./actions/remove');

const actions = {
    release,
    remove,
};

const runAction = ({meliAction, config}) => {
    actions[meliAction](config);
};

module.exports = {actions, runAction};
