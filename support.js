const Discord = require('discord.js')
const client = new Discord.Client();
const config = require('../sys/config.js')
module.exports = {
    name: 'support',
    description: 'Get Bot Support',
    execute(message, args) {
         message.channel.send(`Invite is https://discord.gg/UA9NkFc;
                              Support Email is arandombot.support@zendesk.com`)
    },
};
