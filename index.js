
const Discord = require("discord.js");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.js");
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
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ sebi hung
|  /|\\
|  / \\
|
\`\`\`
`];

const statuses = ['Defining the Undefined', 'Prefix is !!', 'the trombone', 'Uno']

client.on("ready", () => {
  console.log('logged in')
  
  client.user.setStatus("Online");
  setInterval(() => {
    client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)]);
  }, 20000); // every 15 seconds
})
function generateMessage(phrase, guesses) {
	var s = "";
	for(var i = 0; i < phrase.length; i++) {
		if(phrase[i] == ' ')
			s += " ";
		else {
			var c = phrase[i];
			if(guesses.indexOf(c) == -1)
				c = "\\_";
			s += "__" + c + "__ ";
		}
	}
	return s;
}

function nextLetter(message, index, word) {
    message.react(letters[index]).then(r => {
		index++;
		if(index < letters.length) {
			if(index == 13) {
				message.channel.send(generateMessage(word, [])).then(m => {
					games.push({
						stage: 0,
						msg0: message,
						msg1: m,
						phrase: word,
						guesses: []
					});
					nextLetter(m, index);
				});
			} else {
				nextLetter(message, index, word);
			}
		}
	});
}

client.on('messageReactionAdd', (reaction, user) => {
	var msg = reaction.message;
	if(!user.bot) {
		for(var i = 0; i < games.length; i++) {
			var game = games[i];
			if((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
				var letter = unicode[letters.indexOf(reaction.emoji.name)];
				
				reaction.fetchUsers().then(usrs => {
					var reactors = usrs.array();
					var remove_next = function(index) {
						if(index < reactors.length)
							reaction.remove(reactors[index]).then(() => remove_next(index + 1));
					};
					
					remove_next(0);
				});
				
				if(game.guesses.indexOf(letter) == -1) {
					game.guesses.push(letter);
					if(game.phrase.indexOf(letter) == -1) {
						game.stage ++;
						game.msg0.edit(stages[game.stage]);
					} else {
						var sik = true;
						for(var j = 0; j < game.phrase.length; j++) {
							var c = game.phrase[j];
							if(c != ' ' && game.guesses.indexOf(c) == -1) {
								sik = false;
							}
						}
						
						if(sik) {
							game.msg0.edit(stages[game.stage].replace("o", "o ~ sebi only died emotionaly"));
						}
						
						game.msg1.edit(generateMessage(game.phrase, game.guesses));
					}
				}
			}
			games[i] = game;
		}
	}
  });
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
 
});
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
   if(message.author.id === config.ownerID) if(command === "changelogs") message.channel.send({embed: {
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
  if(command === "patreon") {message.channel.send("Support ARB @ https://www.patreon.com/arandombot ! ")}
  if(command === "hangsebi") {
      if(args.length < 2) {
          message.reply(usage);
      } else {
        var channel = client.channels.find('id', args[0]);
        var word = args.slice(1).join(' ').replace(/[^a-z\s:]/g, '');
        console.log(word)
        if(channel != null) {
            channel.send(stages[0]).then(m => {
                nextLetter(m, 0, word);
            });
        } else {
            message.reply("No channel with the id `" + args[0] + "` exist! \n" + usage);
        }
    }
}
  if(command === "status") {message.channel.send("View Status at https://exana.io/s/2o50si5u8eu5q76y/public")}
  if(command === "support") {message.channel.send("Invite is https://discord.gg/UA9NkFc ")}
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  if(command === "help") {
    message.channel.send({embed: {
        color: 0,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "OwO, What is this?",
        description: "Hi there! This is ARB+, designed specifically for undefined() I may not have many commands at the moment, as I am in heavy development, but, uh, here they are anyway!",
        fields: [{
            name: "Say",
            value: "Make me repeat something! (Just nothing too mean plwease uwu)"
          },
          {
            name: "Help",
            value: "Huh, wonder what this command does?"
          },
          {
            name: "Ping",
            value: "See how fast I can respond."
          },
          {
            name: "Support",
            value: "Sends an invite link to the offical ARB Server!"
          },
                  {
            name: "Patreon",
            value: "Sends a link to our Patreon page!"
          },
                  {
            name: "Status",
            value: "Sends a link to our status page!"
          },
                 {
                   name:"Hangsebi",
                   value: "Hang our good old friend sebi"
                 }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Thank you for supporting the development of ARB!"
        }
      }
    });
  }
})
client.login(config.token)
