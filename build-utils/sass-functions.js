const crypto = require('crypto');

const dartSass = require('sass');

module.exports.sassFunctions = {
    'v($b, $name)': ([b, name]) => {
        const hash = crypto.hash('sha1', Buffer.from(b.toString())).substring(0, 4);
        return new dartSass.SassString(`--_--${hash}-${name}`);
    },
};
