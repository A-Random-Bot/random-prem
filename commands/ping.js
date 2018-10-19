const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('../sys/config.js')
module.exports = {
    name: 'ping',
    description: 'Ping!',
   async execute(message, args) {
         const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    },
};
