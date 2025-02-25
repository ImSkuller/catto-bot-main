const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit-manga')
        .setDescription(`📁 This command is used to add manga to the database.`),
    async execute(interaction, app) {

        const config = require('../../data/settings/config.json');
        const modal = new ModalBuilder()
            .setCustomId(`manga-submit`)
            .setTitle(`Enter the Manga Info.`);

        const textInput = new TextInputBuilder()
            .setCustomId(`mangaName`)
            .setLabel(`Whats the name of the manga`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const textInput2 = new TextInputBuilder()
            .setCustomId(`mangaDescription`)
            .setLabel(`Enter a beried description about the manga`)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const link = new TextInputBuilder()
            .setCustomId(`readLink`)
            .setLabel(`The link to read the manga. (link)`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const rating = new TextInputBuilder()
            .setCustomId(`rating`)
            .setLabel(`Please rate the manga (Out of 10)`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const genre = new TextInputBuilder()
            .setCustomId(`mangaGenre`)
            .setLabel(`Whats the genre of the manga you entered?`)
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
