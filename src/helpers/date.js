/**
 * Get date in YYYY-MM-DD HH:MM:SS format
 *
 * @returns {String}
 */
const getDate = () => {
    let timestamp = new Date();
    const offset = timestamp.getTimezoneOffset();

    timestamp = new Date(timestamp.getTime() - (offset * 60 * 1000));

    const date = timestamp.toISOString().split('T')[0];
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

    return `${date} ${time}`;
};

module.exports = getDate;
