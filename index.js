const fs = require('fs')
const Discord = require("discord.js");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./sys/config.js");
// config.token contains the bot's token
// config.prefix contains the message prefix.
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " ✔️");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PUBLIC_URL}.glitch.me/`);
}, 280000);
const serverBlackList = ''
var usage = "`!! hangsebi <channelid> <your phrase>`\n`Example: !! hangsebi grandest nan is gay`";
var letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
var unicode = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var games = [];

var stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
