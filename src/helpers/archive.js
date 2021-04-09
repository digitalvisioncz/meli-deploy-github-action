const {promises: fs} = require('fs');
const tar = require('tar');

/**
 * Archive files from build folder
 *
 * @param {Object} settings
 * @param {String} settings.buildFolder
 * @param {String} settings.archivePath
 * @returns {Promise}
 */
const archiveBuild = async ({buildFolder, archivePath}) => {
    const files = await fs.readdir(buildFolder);

    const fileList = files.map(file => (file.startsWith('@') ? `./${file}` : file));

    return tar.create(
        {
            gzip: true,
            file: archivePath,
            cwd: buildFolder,
        },
        fileList
    );
};

module.exports = archiveBuild;
