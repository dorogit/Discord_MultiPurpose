//importing and declaring stuff
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Player } = require('discord-player');
const { Routes } = require('discord-api-types/v10');
const { token, prefix, guildId, clientId } = require('./config.json');
const { REST } = require('@discordjs/rest');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
});

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
});

module.exports = client;

//  command handler

//slash commands 
const slashCommands = [];
client.slashCommands = new Collection();

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
const slash_commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('S.js'));
for(const file of slash_commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.slashCommands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON())
}
console.log(slashCommands)

//message commands
client.messageCommands = new Collection();
const message_commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('M.js'));
for (const file of message_commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.messageCommands.set(command.Name, command);
}

//event handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// messageCommand handler

client.on('messageCreate', (message) => {
  const args = message.content.slice(prefix.length).split(' ');
  const command = args[0];
  if (client.messageCommands.get(command)) {
    let Command = client.messageCommands.get(command);
    Command.execute(message);
  }
});

client.on('ready', () => {
  const guild_ids = client.guilds.cache.map(guild => guild.id);


  const rest = new REST({version: '9'}).setToken(token);
  for (const guildId of guild_ids)
  {
      rest.put(Routes.applicationGuildCommands(clientId, guildId), 
          {body: slashCommands})
      .then(() => console.log('Successfully updated commands for guild ' + guildId))
      .catch(console.error);
  }
  console.log('bot is online!');
  client.user.setStatus('idle');
});
client.login(token);


