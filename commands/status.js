const Discord = require('discord.js')
const client = new Discord.Client();
const config = require('../sys/config.js')
module.exports = {
    name: 'status',
    description: 'View All Bot Statuses',
    execute(message, args) {
         message.channel.send("View Status at https://exana.io/s/2o50si5u8eu5q76y/public")
    },
};
