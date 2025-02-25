const { SlashCommandBuilder } = require('discord.js');
const config = require('../../data/settings/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription(`⚙️ Invite me to your server!`),
    async execute(interaction, app) {
        interaction.reply({
            content: `[Click here to invite me to your server](https://discord.com/oauth2/authorize?client_id=1340970118691160156&permissions=8&integration_type=0&scope=bot).`,
            ephemeral: true
        })
    }
};
