const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./data/config.json');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('DutchCraftBot is online!');
    client.user.setActivity("DutchCraft.aternos.me")
    .catch(console.error);
  });

client.on("guildMemberAdd", (member) => {
    const channel = client.channels.get("800650399861964810")
    channel.send(`Welkom ${member}!`)
});

client.on('message', message => {
	if(message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('er was een error terwijl ik die command uit probeerde te voeren!');
	}
});

client.login(token);