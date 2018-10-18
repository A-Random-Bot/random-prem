const Discord = require('discord.js')
const client = new Discord.Client();
const config = require("../sys/config.js")
module.exports = {
    name: 'changelogs',
    description: 'Brings up Changelogs',
    execute(message, args) {
      if (message.author.id != (config.ownerid))
      {}
      else {
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Changelog V1.0.3.1 9/9/2018",
    description: "Game Time",
    fields: [
      {
        name: "Version 1.0",
        value: "Added Changelogs!"
      },
      {
       name: "Version 1.0.0.1",
       value: "Set undefined-only status"
      },
             {
       name: "Version 1.0.2",
       value: "Sebi can now be hung"
      },
              {
       name: "Version 1.0.3",
       value: "Added Changing playing status!"
      },
           {
       name: "Version 1.0.3.1",
       value: "Bugfixes for changing playing statuses"
      },  
    ],
    timestamp: new Date(),
    }
  })
    }
}}
