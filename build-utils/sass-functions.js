const crypto = require('crypto');

const dartSass = require('sass');

const salt = crypto.randomBytes(4).toString('hex');

module.exports.sassFunctions = {
    'v($b, $name)': ([b, name]) => {
        const hash = crypto.hash('sha1', Buffer.from(b.toString() + salt)).substring(0, 4);
        return new dartSass.SassString(`--_--${hash}-${name}`);
    },
};
