const
    fs = require('fs'),
    crypto = require('crypto');

/**
 *
 * @return {boolean}
 */
function hasBeenModified() {
    const file = fs.readFileSync('Resume.md')
    const savedHash = fs.readFileSync('other/Resume.md.sha1sum');
    const currentHash = Buffer.from(
        crypto.createHash('sha1')
            .update(file)
            .digest('binary')
    );

    return Buffer.compare(savedHash, currentHash) === 1;
}

module.exports = {
    hasBeenModified
};