const { EmbedBuilder }  = require('discord.js');
const config = require('../../data/settings/config.json');
const path = require('path');
const configPath = path.resolve(__dirname, '../../data/settings/config.json');
const fs = require('fs');

module.exports = {
    data: {
        name: `ping-toggle`
    },
    async execute(interaction, app){
        if (interaction.user.id === config.owner_info.user_id) {
            try {
                const commandName = 'ping';

                const confige = require(configPath);
                delete require.cache[require.resolve(configPath)];
                if (!confige.enabledCommands) confige.enabledCommands = {};
                confige.enabledCommands[commandName] = !confige.enabledCommands[commandName];
                fs.writeFileSync(configPath, JSON.stringify(confige, null, 4));

                var commandValue = confige.enabledCommands[commandName] ? 'enabled' : 'disabled';
                var commandState;
                var Value

                if (commandValue === 'enabled') {
                    commandState = '** ✅ Enabled**';
                } else {
                    commandState = '** ❌ Disabled**';
                }

                if (commandValue === 'enabled') {
                    Value = '** On**';
                } else {
                    Value = '** Off**';
                }

                const toggleEmbed = new EmbedBuilder()
                    .setAuthor({
                        url: config.links.discord_invite,
                        iconURL: interaction.user.displayAvatarURL(),
                        name: interaction.user.username
                    })
                    .setFooter({
                        text: `Bot By ${config.owner_info.username}`,
                        iconURL: config.links.pfp
                    })
                    .setThumbnail(app.user.displayAvatarURL())
                    .setTitle(`${commandName} Toggled`)
                    .setDescription(`**${commandName}** <- The command got toggled`)
                    .addFields([
                        {
                            name: ``,
                            value: ``,
                            inline: false
                        },
                        {
                            name: commandState,
                            value: `The **${commandName}** was togged ${Value}`,
                            inline: false
                        }
                    ])

                await interaction.deferReply()
                await interaction.editReply({
                    embeds: [toggleEmbed]
                });
            } catch (error) {
                await interaction.reply({
                    content: `An error occoured while reloading the bot files. Check console for more information.`
                });
                console.log(`⚠️[Error] An error occoured while running "debug.js" ${error}`);
            }
        } else {
            interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            console.log(`🔒[Auth] Command: "Toggle", Ran by: ${interaction.user.username}`);
        };
    }
}
