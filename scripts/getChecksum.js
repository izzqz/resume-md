const
    fs = require('fs'),
    crypto = require('crypto');

const stream = fs.createReadStream('Resume.md');
const hash = crypto.createHash('sha1');

stream.on('error', err => {
    throw err
});

stream.on('data', chunk => {
    hash.update(chunk)
});

stream.on('end', () => {
    fs.writeFileSync('other/Resume.md.sha1sum', hash.digest('binary'));
});