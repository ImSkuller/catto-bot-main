const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`⚠️ This is a private command so no info available`),
    async execute(interaction, app) {

        const config = require('../../data/settings/config.json');

        if (interaction.user.id === config.owner_info.user_id) {
            try {
                const message = await interaction.deferReply({
                    fetchReply: true
                });

                const apiLatency = interaction.client.ws.ping;
                const clientPing = message.createdTimestamp - interaction.createdTimestamp;
                const newMessage = `API Latency: ${apiLatency}ms\nClient Ping: ${clientPing}ms`;

                await interaction.editReply({
                    content: newMessage
                });

            } catch (error) {
                console.error("⚠️ [Error] Error fetching ping:", error);
                await interaction.followUp({ content: "An error occurred while fetching the ping, Check the console for more info." });
            }
        } else {
            interaction.reply({
                content: `You do not have permission to use this command.`,
                ephemeral: true
            });
            console.log(`🔒[Auth] Command: "Ping", Ran by: ${interaction.user.username}`);
        };
    }
};
