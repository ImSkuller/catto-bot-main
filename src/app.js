const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const keepAlive = require('../keep_alive');

const app = new Client({
    intents: [GatewayIntentBits.Guilds]
});
app.commands = new Collection();
app.buttons = new Collection();
app.selectMenus = new Collection();
app.modals = new Collection();
app.commandsArry = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
for (const file of functionFiles) require(`./functions/${folder}/${file}`)(app);
}

app.handleEvents();
app.handleCommands();
app.handleComponents();

app.login(process.env.TOKEN)
