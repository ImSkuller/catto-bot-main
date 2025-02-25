const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { accessSync } = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit-manhwa')
        .setDescription(`📁 This command is used to add manhwas to the database.`),
    async execute(interaction, app) {

        const config = require('../../data/settings/config.json');
        const modal = new ModalBuilder()
            .setCustomId(`manhwa-submit`)
            .setTitle(`Enter the Manhwa Info.`);

        const textInput = new TextInputBuilder()
            .setCustomId(`manhwaName`)
            .setLabel(`Whats the name of the manhwa`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const textInput2 = new TextInputBuilder()
            .setCustomId(`manhwaDescription`)
            .setLabel(`Enter a beried description about the manhwa`)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const link = new TextInputBuilder()
            .setCustomId(`readLink`)
            .setLabel(`The link to read the manhwa. (must)`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const rating = new TextInputBuilder()
            .setCustomId(`rating`)
            .setLabel(`Please rate the manhwa (Out of 10)`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const genre = new TextInputBuilder()
            .setCustomId(`manhwaGenre`)
            .setLabel(`Whats the genre of the manhwa you entered?`)
            .setRequired(false)
            .setStyle(TextInputStyle.Short)


        modal.addComponents(new ActionRowBuilder().addComponents(textInput));
        modal.addComponents(new ActionRowBuilder().addComponents(textInput2));
        modal.addComponents(new ActionRowBuilder().addComponents(genre));
        modal.addComponents(new ActionRowBuilder().addComponents(rating));
        modal.addComponents(new ActionRowBuilder().addComponents(link));


        await interaction.showModal(modal);
    }
};
