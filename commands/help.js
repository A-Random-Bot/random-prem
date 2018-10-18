const { prefix } = require('../sys/config.js');
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    execute(message, args) {
        const data = [];
const { commands } = message.client;

if (!args.length) {
    // ...
}

// ...
    },
};
