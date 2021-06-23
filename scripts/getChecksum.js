const fs = require('fs');
const crypto = require('crypto');

fs.readFile('Resume.md', (err, data) => {
    const checksum = generateChecksum(data);

    fs.writeFile('other/Resume.md.md5', checksum, err => {
        if (err) throw err
    });
});

function generateChecksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}