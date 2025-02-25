const { InteractionType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const configPath = path.resolve(__dirname, '../../data/settings/config.json');

const config = require('../../data/settings/config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, app) {

        const disabledEmbed = new EmbedBuilder()
            .setTitle(`⚠️ Command Disabled`)
            .setDescription(`This command is currently disabled, Please contact any of the bot admin or the bot owner if you believe this is an error.`)
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
            .setFields({name: `Join Our Discord`, value: `[Click Here To Join!](${config.links.discord_invite})`, inline: true})

        try {
            // Load the latest config
            delete require.cache[require.resolve(configPath)];
            const config = require(configPath);

            if (interaction.isChatInputCommand()) {
                const { commands } = app;
                const { commandName } = interaction;
                const command = commands.get(commandName);
                if (!command) return;

                // Check if command is disabled
                if (config.enabledCommands && config.enabledCommands[commandName] === false) {
                    return interaction.reply({ embeds: [disabledEmbed], ephemeral: true });
                }

                try {
                    await command.execute(interaction, app);
                } catch (error) {
                    console.error(`⚠️ [Error] Command execution failed:`, error);
                    await interaction.reply({
                        content: `⚠️ [Error] Something went wrong while executing this command.`,
                        ephemeral: true,
                    });
                }
            }
            else if (interaction.isButton()) {
                const { buttons } = app;
                const { customId } = interaction;
                const button = buttons.get(customId);
                if (!button) {
                    console.warn(`⚠️ [Warning] Button interaction "${customId}" not found.`);
                    return;
                }

                try {
                    await button.execute(interaction, app);
                } catch (error) {
                    console.error(`⚠️ [Error] Button execution failed:`, error);
                }
            }
            else if (interaction.isStringSelectMenu()) {
                const { selectMenus } = app;
                const { customId } = interaction;
                const menu = selectMenus.get(customId);
                if (!menu) {
                    console.warn(`⚠️ [Warning] Select menu "${customId}" not found.`);
                    return;
                }

                try {
                    await menu.execute(interaction, app);
                } catch (error) {
                    console.error(`⚠️ [Error] Select menu execution failed:`, error);
                }
            }
            else if (interaction.type === InteractionType.ModalSubmit) {
                const { modals } = app;
                const { customId } = interaction;
                const modal = modals.get(customId);
                if (!modal) {
                    console.warn(`⚠️ [Warning] Modal interaction "${customId}" not found.`);
                    return;
                }

                try {
                    await modal.execute(interaction, app);
                } catch (error) {
                    console.error(`⚠️ [Error] Modal execution failed:`, error);
                }
            }
        } catch (globalError) {
            console.error('⚠️ [Critical Error] Unexpected error in interactionCreate:', globalError);
        }
    },
};
