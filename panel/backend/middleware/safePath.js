const path = require('path');

const BASE_DIR = process.env.FILE_ROOT || process.cwd();

function resolveSafe(userPath = '.') {
    const resolvedPath = path.resolve(BASE_DIR, userPath);

    if (!resolvedPath.startsWith(BASE_DIR)) {
        throw new Error('Access denied');
    }

    return resolvedPath;
}

module.exports = resolveSafe;