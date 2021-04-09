module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageDirectory: 'test/__coverage',
    setupFiles: ['<rootDir>/test/__config/test-setup.js'],
};
