const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

module.exports = (app) => {
    const configPath = path.resolve(__dirname, '../../data/settings/config.json');

    // Ensure commands storage
    if (!app.commands) app.commands = new Map();
    if (!app.commandsArray) app.commandsArray = [];

    // Function to reload the config.json dynamically
    const reloadConfig = () => {
        try {
            if (!fs.existsSync(configPath)) {
                console.warn(`⚠️ Config file missing: ${configPath}. Creating a new one.`);
                fs.writeFileSync(configPath, JSON.stringify({ enabledCommands: {} }, null, 4));
            }

            const rawData = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error('⚠️ Failed to reload config:', error);
            return { enabledCommands: {} }; // Return default structure
        }
    };

    // Function to enable/disable commands
    app.toggleCommand = (commandName, status) => {
        try {
            const config = reloadConfig();
            if (!config.enabledCommands) config.enabledCommands = {};

            config.enabledCommands[commandName] = status;
            fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
            console.log(`⚙️ [System] Command "${commandName}" is now ${status ? 'enabled' : 'disabled'}.`);
            return true;
        } catch (error) {
            console.error(`⚠️ [System] Failed to update command state:`, error);
            return false;
        }
    };

    // Load and register commands
    app.handleCommands = async () => {
        try {
            app.commands.clear();
            app.commandsArray = [];

            const commandFolders = fs.readdirSync(path.resolve(__dirname, '../../commands'));
            for (const folder of commandFolders) {
                const commandFiles = fs
                    .readdirSync(path.resolve(__dirname, `../../commands/${folder}`))
                    .filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
                    const command = require(path.resolve(__dirname, `../../commands/${folder}/${file}`));
                    app.commands.set(command.data.name, command);
                    app.commandsArray.push(command.data.toJSON());
                    console.log(`📁 [Loader] Command "${command.data.name}" is now functional.`);
                }
            }

            const clientId = process.env.CLIENT_ID;
            const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

            console.log('⚙️ [System] Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(clientId), { body: app.commandsArray });
            console.log('✅ [System] Successfully refreshed application (/) commands.');
        } catch (error) {
            console.error(`⚠️ [System] An error occurred while refreshing commands`, error);
        }
    };

    // Slash command to reload config.json
    app.commands.set('reloadconfig', {
        data: {
            name: 'reloadconfig',
            description: 'Reloads the bot configuration file.',
        },
        async execute(interaction) {
            try {
                const updatedConfig = reloadConfig();
                await interaction.reply({ content: '✅ Config reloaded successfully!', ephemeral: true });
                console.log('⚙️ [System] Config reloaded:', updatedConfig);
            } catch (error) {
                console.error('⚠️ [System] Failed to reload config:', error);
                await interaction.reply({ content: '⚠️ Failed to reload config.', ephemeral: true });
            }
        },
    });

    // Slash command to enable/disable commands
    app.commands.set('togglecommand', {
        data: {
            name: 'togglecommand',
            description: 'Enable or disable a command.',
            options: [
                {
                    name: 'command',
                    type: 3, // STRING
                    description: 'Command name to toggle',
                    required: true,
                },
                {
                    name: 'status',
                    type: 5, // BOOLEAN
                    description: 'Enable (true) or Disable (false)',
                    required: true,
                },
            ],
        },
        async execute(interaction) {
            const commandName = interaction.options.getString('command');
            const status = interaction.options.getBoolean('status');

            if (!app.commands.has(commandName)) {
                return interaction.reply({ content: '⚠️ Command not found.', ephemeral: true });
            }

            const success = app.toggleCommand(commandName, status);
            if (success) {
                await interaction.reply({ content: `✅ Command "${commandName}" is now ${status ? 'enabled' : 'disabled'}.`, ephemeral: true });
            } else {
                await interaction.reply({ content: '⚠️ Failed to update command state.', ephemeral: true });
            }
        },
    });
};
