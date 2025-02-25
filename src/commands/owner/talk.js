const { SlashCommandBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('⚠️ This is a private command so no info available')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Error loading info.')
                .setRequired(true)
        ),
    async execute(interaction, app) {

        if (interaction.user.id === config.owner_info.user_id) {
            await interaction.reply({
                content: `✅ Success!`,
                ephemeral: true
            });
            await interaction.channel.send({
                content: interaction.options.getString('input')
            });

        } else {
            interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            console.log(`🔒[Auth] Command: "Toggle", Ran by: ${interaction.user.username}`);
        }
    }
};
